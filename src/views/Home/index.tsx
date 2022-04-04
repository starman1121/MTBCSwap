import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout , Image } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useWeb3React } from '@web3-react/core'
// import Cookies from 'universal-cookie';
// import { useQueryParam, StringParam } from 'use-query-params';
// import Hero from './components/Hero'
// import { isAddress } from '../../utils/web3'
// import rot13 from '../../utils/encode'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import EarnuptoFarm from './components/EarnuptoFarm'
import EarnuptoPool from './components/EarnuptoPool'


const Hero = styled.div`
  align-items: center;
  // background-image: url('/images/egg/3.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 36px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/left-pancake.svg'), url('/images/right-pancake.svg');
    background-position: left center, right center;
    height: 205px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`


const Home: React.FC = () => {

  const { account } = useWeb3React()
  // const cookies = new Cookies();
  // const [ref, setNum] = useQueryParam('ref', StringParam);

  // if(ref) {
  //   if(isAddress(rot13(ref))) {
  //     cookies.set("ref", ref)
  //   }
  // }
  
  const image = '/images/logo.png'
  return (
    <>
      
    <Page>
      <Hero>
        <Image src={image} alt='logo' width={280} height={75}  />
        <Heading mt="25px" color="text" size="md">The Best Yield Farm on BSC</Heading>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <TwitterCard/>
          <EarnuptoFarm/>
          <EarnuptoPool/>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
    </>
  )
}

export default Home
