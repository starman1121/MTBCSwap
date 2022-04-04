import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot, Button, ButtonMenuItem, ButtonMenu } from '@pancakeswap/uikit'
import { Link, useLocation } from 'react-router-dom'
import { useExpertModeManager } from 'state/user/hooks'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useLoadingState } from 'state/nftMarket/hooks'
import { useTranslation } from 'contexts/Localization'
import Transactions from './Transactions'
import QuestionHelper from '../QuestionHelper'

interface Props {
  title: string
  subtitle: string
  helper?: string
  backTo?: string
  noConfig?: boolean
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`
const StyledLayout = styled.div`
  justif-content: justify;
  background:${({ theme }) => theme.colors.background};
  border-radius: 10px;
  padding: 5px;
`
const StyledButton = styled(Button)`
  width: 50%;
  variant: primary;
  background: linear-gradient(180deg , rgb(165, 127, 57), rgb(238, 206, 111));
  `
const StyledButtonMenu = styled(ButtonMenu)`
  color: #ffffff;
`
//   <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
//   {t('Swap')}
// </ButtonMenuItem>
// <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
//   {t('Liquidity')}
// </ButtonMenuItem>

  // background: linear-gradient(90deg, rgb(166, 130, 56), rgb(221, 191, 99));
  const getActiveIndex = (pathname: string): number => {
    if (
      pathname.includes('/pool') ||
      pathname.includes('/create') ||
      pathname.includes('/add') ||
      pathname.includes('/remove') ||
      pathname.includes('/find') ||
      pathname.includes('/liquidity')
    ) {
      return 1
    }
    return 0
  }


const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager()
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <AppHeaderContainer>
      <StyledLayout>
        <StyledButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
          <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link} style={{marginRight: '8px'}}>
            {t('Swap')}
          </ButtonMenuItem>
          <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
            {t('Liquidity')}
          </ButtonMenuItem>
        </StyledButtonMenu>
        {/* <a href='/swap'>
          <StyledButton > Swap </StyledButton>
        </a>
        <a href='/liquidity'>
          <StyledButton> Liquidity </StyledButton>
        </a> */}
      </StyledLayout>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
        </Flex>
      )}
    </AppHeaderContainer>
  )
}

export default AppHeader
