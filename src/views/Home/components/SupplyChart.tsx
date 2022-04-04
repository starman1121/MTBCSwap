import React from 'react'
import { Card, CardBody, Image, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { useTranslation } from 'contexts/Localization'
import DonutChart from 'react-donut-chart'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const StyleChart = styled(DonutChart)`
    display: block;
    margin: auto;
`

const SupplyChart = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  const mock = [
        {
            label: 'Circulating supply',
            value: 65
        },
        {
            label: 'Burned supply',
            value: 35
        }
    ];

  const colors = ['#2697FF', '#FF4242']

  return (
    <StyledCakeStats>
      <CardBody>
        <Text fontSize="22px" mb="24px">
          {t('Infinity Status')}
        </Text>
        <StyleChart
            startAngle = {270}
            height = {350}
            width = {350}
            clickToggle = {false}
            colors = { colors }
            legend = {false}
            data= { mock }
            strokeColor = "#fff"
            onMouseEnter = {
                (item) => {
                    console.log(`mousing over: ${item.label}`);
                    return item;
                }
            }
            onClick = {
                (item, toggled) => {
                    if (toggled) {
                        console.log(`selecting: ${item.label}`);
                    } else {
                        console.log(`unselecting: ${item.label}`);
                    }
                    return item;
                }
            }
        />
      </CardBody>
    </StyledCakeStats>
  )
}

export default SupplyChart