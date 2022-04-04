import React, { useState } from 'react'
import styled from 'styled-components'
import { ExpandableLabel, Flex, FlexProps, Image, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

const ImageWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`
const Footer = () => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Flex justifyContent={'space-between'}>
        <ImageWrapper>
            <Image src="" width={248} height={76}></Image>
        </ImageWrapper>
    </Flex>
  )
}

export default Footer
