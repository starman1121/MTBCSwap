import React from 'react'
import styled, { keyframes } from 'styled-components'
import { usePriceCakeBusd, useTotalValue } from 'state/farms/hooks'
import { Flex, Heading, Link, Button, Text, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import { SlideSvgDark, SlideSvgLight } from './SlideSvg'
import CompositeImage, { getSrcSet, CompositeImageProps } from './CompositeImage'

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }  
`

const fading = () => keyframes`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }  
`

const BgWrapper = styled.div`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`

const InnerWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: -3px;
`

const BunnyWrapper = styled.div`
  width: 100%;
  animation: ${flyingAnim} 3.5s ease-in-out infinite;
`

const StarsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${fading} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${fading} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${fading} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`

const imagePath = '/images/home/lunar-bunny/'
const imageSrc = 'bunny'

const starsImage: CompositeImageProps = {
  path: '/images/home/lunar-bunny/',
  attributes: [
    { src: 'star-l', alt: '3D Star' },
    { src: 'star-r', alt: '3D Star' },
    { src: 'star-top-r', alt: '3D Star' },
  ],
}

const Hero = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const totalValue = useTotalValue();

  return (
    <>
      <BgWrapper>
        <InnerWrapper>{theme.isDark ? <SlideSvgDark width="100%" /> : <SlideSvgLight width="100%" />}</InnerWrapper>
      </BgWrapper>
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex flex="1" flexDirection="column">
          <Heading scale="xl" color="primary" mb="24px">
            {t("NotchSwap auto rewards to boost yields")}
          </Heading>
          <Text mb="20px" fontSize="18px">
            {t('The NotchSwap protocol adds incentives to earning crypto safely and securely for Notch network participants by introducing revenue sharing through the classic AMM model. We provide a platform for trading, staking, and farming.')}
          </Text>
          <Text mb="20px" fontSize="20px">
            {t('Total Value Locked')}
          </Text>
          {totalValue ? (
            <Heading scale="lg" mb="20px" >{t('$%marketCap%', { marketCap: totalValue.toNumber().toLocaleString() })}</Heading>
            // <Balance decimals={0} lineHeight="1.1" fontSize="24px" bold value={totalValue.toNumber()} />
          ) : (
            <Skeleton height={24} width={126} my="4px" />
          )}
          <Flex>
            {!account && <ConnectWalletButton mr="8px" />}
            <Link mr="16px" href="https://notchswap.com/#/swap">
              <Button style={{color:account ? "black" : "#f5f800"}} variant={!account ? 'secondary' : 'primary'}>{t('Trade Now')}</Button>
            </Link>
          </Flex>
        </Flex>
        <Flex
          height={['192px', null, null, '100%']}
          width={['192px', null, null, '100%']}
          flex={[null, null, null, '1']}
          m={['auto', 'auto', 'auto', 'auto']}
          position="relative"
        >
          <BunnyWrapper>
            <img src={`${imagePath}${imageSrc}.png`} srcSet={getSrcSet(imagePath, imageSrc)} alt={t('Lunar bunny')} />
          </BunnyWrapper>
          <StarsWrapper>
            <CompositeImage {...starsImage} />
          </StarsWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
