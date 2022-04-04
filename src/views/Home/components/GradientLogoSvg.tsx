import React from 'react'
import { Svg, SvgProps } from '@pancakeswap/uikit'

const GradientLogo: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <image width="48" height="48" href='/logo.png'/>
    </Svg>
  )
}

export default GradientLogo
