import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import erc20 from 'config/abi/erc20.json'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'
import multicall from 'utils/multicall'
import { SerializedFarm, SerializedBigNumber } from '../types'

type PublicFarmData = {
  tokenAmountTotal: SerializedBigNumber
  lpTotalInQuoteToken: SerializedBigNumber
  lpTotalSupply: SerializedBigNumber
  tokenPriceVsQuote: SerializedBigNumber
  poolWeight: SerializedBigNumber
  multiplier: string
  MTBCRewardBlock: string
}

const fetchFarm = async (farm: SerializedFarm): Promise<PublicFarmData> => {

  const { pid, lpAddresses, token, quoteToken } = farm

  const lpAddress = getAddress(lpAddresses)
  
  const calls = [
    // Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteToken.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: !farm.isTokenOnly? lpAddress : token.address,
      name: 'balanceOf',
      params: [getMasterChefAddress()],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    // Token decimals
    {
      address: token.address,
      name: 'decimals',
    },
    // Quote token decimals
    {
      address: quoteToken.address,
      name: 'decimals',
    },
  ]

  const [tokenBalanceLP, quoteTokenBalanceLP, lpTokenBalanceMC, lpTotalSupply, tokenDecimals, quoteTokenDecimals] =
    await multicall(erc20, calls)
  let tokenAmountTotal;
  let lpTotalInQuoteToken;
  let tokenPriceVsQuote;
  if(farm.isTokenOnly) {  
    

    tokenAmountTotal = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(tokenDecimals));
    
    if(token.symbol === 'BUSD' && farm.quoteToken.symbol === 'BUSD') {
      tokenPriceVsQuote = new BigNumber(1);
      
    } else {
      tokenPriceVsQuote = new BigNumber(quoteTokenBalanceLP).div(new BigNumber(tokenBalanceLP));
      
    }

    lpTotalInQuoteToken = tokenAmountTotal.times(tokenPriceVsQuote);
    console.log('debug fetch farm--', tokenBalanceLP, quoteTokenBalanceLP, tokenPriceVsQuote.toNumber(), tokenAmountTotal.toNumber())

  } else {
    const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))
    // Raw amount of token in the LP, including those not staked
    tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals))
    const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLP).div(BIG_TEN.pow(quoteTokenDecimals))
  
    // Amount of quoteToken in the LP that are staked in the MC
    const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio)

    tokenPriceVsQuote = quoteTokenAmountTotal.div(tokenAmountTotal)
    // Total staked in LP, in quote token value
    lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2))
  }
 
  
  // Ratio in % of LP tokens that are staked in the MC, vs the total number in circulation
  // Only make masterchef calls if farm has pid
  const [info, totalAllocPoint, cMTBCPerBlock] =
  pid || pid === 0
      ? await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
            name: 'poolInfo',
            params: [pid],
          },
          {
            address: getMasterChefAddress(),
            name: 'totalAllocPoint',
          },
          {
            address: getMasterChefAddress(),
            name: 'MTBCPerBlock',
          },
        ])
        : [null, null]
        
   
  
  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO
  const MTBCPerBlock = cMTBCPerBlock? new BigNumber(cMTBCPerBlock).div(BIG_TEN.pow(9)) : BIG_ZERO
  console.log('debug->MTBC', cMTBCPerBlock);
  
  return {
    tokenAmountTotal: tokenAmountTotal.toJSON(),
    lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
    tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
    poolWeight: poolWeight.toJSON(),
    multiplier: `${allocPoint.div(100).toString()}X`,
    MTBCRewardBlock: MTBCPerBlock.toJSON()
  }
}

export default fetchFarm
