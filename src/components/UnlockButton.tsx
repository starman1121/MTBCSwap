import React from 'react'
import { Button, useWalletModal } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  background: linear-gradient(180deg , rgb(165, 127, 57), rgb(238, 206, 111));
`


const UnlockButton = (props) => {
  const {t} = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <StyledButton onClick={onPresentConnectModal} {...props}>
      {t('Unlock Wallet')}
    </StyledButton>
  )
}

export default UnlockButton
