import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'
import DoubleGlowShadow from 'components/DoubleGlowShadow'

export const BodyWrapper = styled(Card)`
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  z-index: 1;

  box-shadow: 0 1px 4px rgb(253 249 249), -23px 0 20px -23px rgb(239 235 235 / 80%), 23px 0 20px -23px rgb(247 245 245 / 80%), 0 0 40px rgb(0 0 0 / 10%) inset;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
