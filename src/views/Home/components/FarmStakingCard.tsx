import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Flex } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useFarmsWithBalance from 'views/Home/hooks/useFarmsWithBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useMasterchef } from 'hooks/useContract'
import { harvestFarm } from 'utils/calls'
import UnlockButton from 'components/UnlockButton'
import { usePriceCakeBusd } from 'state/farms/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/home/2a.png');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`
const StyledButton = styled(Button)`
  background: linear-gradient(180deg , rgb(165, 127, 57), rgb(238, 206, 111));
`
const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const {t} = useTranslation()
  const miaBalance = useTokenBalance(getCakeAddress())
  const miaUserBalance = miaBalance.balance ? getBalanceNumber(miaBalance.balance, 9) : 0
  const miaPrice = usePriceCakeBusd().toNumber()

  const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: `https://miamiswap.finance/images/token.png`,
        },
      },
    })
  
    return tokenAdded
  }

  const { toastSuccess, toastError } = useToast()
  const { farmsWithStakedBalance, earningsSum: farmEarningsSum } = useFarmsWithBalance()
  const numFarmsToCollect = farmsWithStakedBalance.filter((value) => value.pid !== 0).length
  const masterChefContract = useMasterchef()
  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    // eslint-disable-next-line no-restricted-syntax
    for (const farmWithBalance of farmsWithStakedBalance) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await harvestFarm(masterChefContract, farmWithBalance.pid)
        toastSuccess(
          `${t('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'MTBC' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    }
    setPendingTx(false)
  }, [farmsWithStakedBalance, masterChefContract, toastSuccess, toastError, t])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Farms & Staking')}
        </Heading>
        <Flex style={{verticalAlign: 'center'}}>
        <CardImage src="/logo.png" alt="cake logo" width={64} height={64} />
          <Button 
            variant="text"
            style={{height: 32, marginTop: 20, marginLeft: 16, backgroundColor: '#d9d7f2'}}
            onClick={() => registerToken('0x5417f8559ee78f0e77589109d605246c89dd01c9', 'MIA', 9)}>
            +
            <img src='/images/metamask.png' alt='MetaMask Logo' style={{width: 16, height: 16, marginLeft: 4}}/>
          </Button>
        </Flex>
        <Block>
          <Label>{t('MTBC to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={farmEarningsSum}/>
          <Label>~${(miaPrice * farmEarningsSum).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label>{t('MTBC in Wallet')}</Label>
          <CakeWalletBalance miaBalance={miaUserBalance} />
          <Label>~${(miaPrice * miaUserBalance).toFixed(2)}</Label>
        </Block>
        <Actions>
          {account ? (
          <Flex >
            
            <StyledButton
              mr="8px"
              id="harvest-all"
              disabled={numFarmsToCollect <= 0 || pendingTx}
              onClick={harvestAllFarms}
            >
              {pendingTx ? t('Collecting MTBC') : t(`Harvest all (${numFarmsToCollect})`)}
            </StyledButton>
            <a href='/swap'>
            <StyledButton>
              Buy MTBC Token
              </StyledButton>

            </a>
            </Flex>
          ) : (
            <UnlockButton />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
