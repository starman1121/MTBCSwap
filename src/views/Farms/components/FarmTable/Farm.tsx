import React from 'react'
import styled from 'styled-components'
import { useFarmFromPid, useFarmUser } from 'state/farms/hooks'
import { useTranslation } from 'contexts/Localization'
import { Text } from '@pancakeswap/uikit'
import { Token } from '@pancakeswap/sdk'
import { getBalanceNumber } from 'utils/formatBalance'
import { TokenPairImage, TokenImage } from 'components/TokenImage'

export interface FarmProps {
  label: string
  pid: number
  token: Token
  quoteToken: Token
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 64px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 64px;
  }
`

const Farm: React.FunctionComponent<FarmProps> = ({ token, quoteToken, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const farm = useFarmFromPid(pid)
  const { t } = useTranslation()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  const handleRenderFarming = (): JSX.Element => {
    if (rawStakedBalance) {
      return (
        <Text color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Farming')}
        </Text>
      )
    }

    return null
  }

  return (
    <Container>
      <TokenWrapper>
        {
          !farm.isTokenOnly? (<TokenPairImage variant="inverted" primaryToken={token} secondaryToken={quoteToken} width={192} height={192} />) 
            :(           
              <TokenImage token={token} height={96} width={96} mr="16px"/>
            )
        }
      </TokenWrapper>
      <div>
        {handleRenderFarming()}
        <Text fontSize='24px'>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
