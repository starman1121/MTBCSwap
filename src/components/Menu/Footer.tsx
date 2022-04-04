import React from 'react'
import styled, { useTheme } from 'styled-components'
import { ButtonMenu, ButtonMenuItem, LinkExternal, Flex, Svg, Image, Button, Text, TelegramIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { StyledSocialButton,StyledMenusButton } from 'views/PancakeSquad/components/ArtistSection/styles'

import artistConfigBuilder from 'views/PancakeSquad/components/ArtistSection/config'

const Wrapper = styled.div`
  box-sizing: content-box;
  border-width: 3px;
  border-top-style: solid;
  border-image: linear-gradient(to right bottom, #260B3C, #a053df);
  border-image-slice: 1;

  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: -108px;
  background-color:#0c1217;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: space-between;
    flex-direction: row;
  }
`

// const BubbleWrapper = styled(Flex)`
//   svg {
//     fill: ${({ theme }) => theme.colors.textSubtle};
//     transition: background-color 0.2s, opacity 0.2s;
//   }
//   &:hover {
//     svg {
//       opacity: 0.65;
//     }
//   }
//   &:active {
//     svg {
//       opacity: 0.85;
//     }
//   }
// `

const Footer = () => {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const { Socials } = artistConfigBuilder({ t, isDark })
  return (
    <Wrapper>
        <Image src="/images/logo-dark.png" alt="Get some help" width={160} height={108} />
        <Flex>
        <a href='/swap'>
            <StyledMenusButton>
              Docs
            </StyledMenusButton>
          </a>
          <a href='/swap'>
            <StyledMenusButton>
              Analytics
            </StyledMenusButton>
          </a>
          <a href='/swap'>
            <StyledMenusButton>
              Polygon Bridge
            </StyledMenusButton>
          </a>
      </Flex>
        
        <Flex
            flexDirection={['column', null, null, 'row']}
            justifyContent={['center', null, null, 'flex-start']}
            alignItems="center"
            mx={['10%', null, null, '0']}
          >
           
            {Socials.map((button) => (
              <StyledSocialButton
                  mb={['16px', null, null, '0']}
                  mr={['0', null, null, '16px']}
                  external={button.external}
                  href={button.to}
                >
                {button.icon}
                
              </StyledSocialButton>
            ))}
          </Flex>
          {/* <SocialLinks /> */}
      {/* <Flex
        flexGrow={1}
        alignItems="center"
        width={['100%', '100%', '100%', 'auto']}
        justifyContent={['center', 'center', 'center', 'flex-end']}
      >
        <BubbleWrapper>
          <Button
            id="clickExchangeHelp"
            as="a"
            external
            href="https://docs.pancakeswap.finance/products/pancakeswap-exchange"
            variant="subtle"
          >
            {t('Need help ?')}
          </Button>
          <Svg viewBox="0 0 16 16">
            <path d="M0 16V0C0 0 3 1 6 1C9 1 16 -2 16 3.5C16 10.5 7.5 16 0 16Z" />
          </Svg>
        </BubbleWrapper>
      </Flex> */}
    </Wrapper>
  )
}

export default Footer
