import React from 'react'
import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import DoubleGlowShadow from 'components/DoubleGlowShadow'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 0;
  min-height: calc(100vh - 64px);
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 64px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 64px;
    min-height: calc(100vh - 64px);
  }
`
const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <DoubleGlowShadow>
      <PageMeta />
      <StyledPage {...props}>
          {children}
          <Flex flexGrow={1} />
          {/* <Footer /> */}
      </StyledPage>
    </DoubleGlowShadow>
  )
}

export default Page
