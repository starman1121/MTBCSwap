import React from 'react'
import { Card, CardBody, Text, Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'
import { getCakeAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import { CAKE_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CakeStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()), 9)
  const totalMinted = totalSupply ? getBalanceNumber(totalSupply, 9) : 0
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply, 9) - burnedBalance : 0
  const NNPriceBusd = usePriceCakeBusd()
  const mcap = NNPriceBusd.isNaN() ? 0 : getBalanceNumber(NNPriceBusd.times(cakeSupply).times(1000000000), 9)
  const farms = useFarms()
  // const rewardPerBlock = farms && farms.data ? farms.data[0].miaperblock : 0

  const rewardPerBlock = CAKE_PER_BLOCK
  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('MTBC Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          <CardValue fontSize="14px" value={mcap} decimals={2} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={totalMinted} decimals={0} />}  
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Burned')}</Text>
          <CardValue fontSize="14px" value={burnedBalance} decimals={0} />    
        </Row>
        <Row>
          <Text fontSize="14px">{t('Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}       
        </Row>
        <Row>
          <Text fontSize="14px">{t('Rewards MTBC/block')}</Text>
          <Text fontSize="14px">{rewardPerBlock.toNumber()}</Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
