import React, { useCallback, useRef } from 'react'
import { Card, CardBody, Heading, Text, Skeleton, Link, ArrowForwardIcon } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { getFarmApr } from 'utils/apr'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'

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

const EarnuptoFarm = () => {
  const { t } = useTranslation()
  const { data: farms } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farms.filter((farm) => farm.multiplier !== '0X')
    calculateAPY(activeFarms)
    return (maxAPY.current).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      let apy = 0
      farmsToDisplay.map((farm) => {
        if(!farm.isTokenOnly){
          const totalLiquidity = farm.isTokenOnly ? new BigNumber(farm.lpTotalInQuoteToken).times(farm.token.busdPrice) : new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
          // const { cakeRewardsApr } = getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET], new BigNumber(farm.miaperblock))
          const { cakeRewardsApr } = getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity, farm.lpAddresses[ChainId.MAINNET])
          apy = cakeRewardsApr
        if (maxAPY.current < apy) maxAPY.current = apy
      }
      return apy
    })
  },
    [ cakePrice],
  )
  return (
    <StyledCakeStats>
      <Link href="/farms" style={{width: '100%', textDecoration:'none'}}>
       <CardBody style={{width: '100%'}}>
        <Heading scale="lg" mb="24px">
          {t('Earn Up to')}
        </Heading>
        <Row>
          <Text fontSize="36px" style={{color:'#4B45BE', fontWeight: 600}} >{getHighestAPY() ? (
            `${getHighestAPY()}%`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{t('APR in Farms')}</Text>
          <ArrowForwardIcon />
        </Row>
      </CardBody>
      </Link>
    </StyledCakeStats>
  )
}

export default EarnuptoFarm
