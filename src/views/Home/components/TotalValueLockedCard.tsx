import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Heading } from '@pancakeswap/uikit'
import { useTotalValue } from 'state/farms/hooks'
// import { useGetStats } from 'hooks/api'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const TotalValueLockedCard = () => {
  const { t } = useTranslation()
  const tvl = useTotalValue()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="xl" mb="40px">
            {t('Total Value Locked (TVL)')}
        </Heading>
        <>
          <CardValue value={tvl.toNumber()} prefix="$" decimals={2}/>
          <Text color="textSubtle" mt="40px">{t('Across all Farms and Pools')}</Text>
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
