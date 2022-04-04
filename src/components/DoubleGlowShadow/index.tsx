import  React  from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'


const StyledWrapper = styled.div`
  margin: 0;
  background-color: rgb(13 4 21);
`
const StyledTop = styled.div`
  position: absolute;
  top: calc(20% - 20px);
  left: calc(63% - 20px);
  background-color: #fff;  
`
const StyledBottom = styled.div`
  position: absolute;
  top: calc(50%);
  left: calc(40%);
  background-color: #fff; 
`


const DoubleGlowShadow: React.FC<{ className?: string }> = ({ children, className }) => {
  const { isDesktop, isMobile } = useMatchBreakpoints()
  if (isMobile) {
    return <div className="shadow-swap">{children}</div>
  }

  return (
    <StyledWrapper>
      <StyledTop />
      <StyledBottom />
      <div>{children}</div>
    </StyledWrapper>
  )
}

export default DoubleGlowShadow