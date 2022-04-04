import React from 'react'
import { Card, CardBody, Heading } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { useTranslation } from 'contexts/Localization'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const TwitterCard = () => {
  const {t} = useTranslation()
  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Announcements')}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'miami_Token_'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
