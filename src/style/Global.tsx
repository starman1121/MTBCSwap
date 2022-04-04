import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Kanit', sans-serif;
}
body {
    // background-color: ${({ theme }) => theme.colors.background};
    // background: radial-gradient(circle farthest-side, #F0D9E7 , #ddbf63);
    background-color: rgb(13 4 21);
    img {
      height: auto;
      max-width: 100%;
    }
  }

  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .px-4 {
    padding-left: 1rem/* 16px */;
    padding-right: 1rem/* 16px */;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .w-full {
    width: 100%;
  }

  .flex {
    display: flex;
  }

  .bg-dark-700 {
    --tw-bg-opacity: 1;
    background-color: rgba(46,51,72,var(--tw-bg-opacity));
  }

  .bg-dark-800 {
    --tw-bg-opacity: 1;
    background-color: rgba(32,34,49,var(--tw-bg-opacity));
  }
  
  .hover\:bg-dark-700:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(46,51,72,var(--tw-bg-opacity));
  }
  .bg-dark-900 {
    --tw-bg-opacity: 1;
    background-color: rgba(22,21,34,var(--tw-bg-opacity));
  }

  .p-3px {
    padding: 3px;
  }
  
  .rounded {
    border-radius: 0.625rem;
  }

  .rounded-full {
    border-radius: 9999px;
  }
  .-mb-6 {
    margin-bottom: -2rem;
  }
  .-mt-6 {
    margin-top: -2rem;
  }
  .z-10 {
    z-index: 10;
  }
  .p-3 {
    padding: 0.75rem;
  }
  .swap-symbol{
    background-color: transparent;
    background-image: none;
    border: none;
  }

  .plus-symbol{
    border: none;
  }
  
  .p-3px {
    padding: 3px;
  }

  .absolute {
    position: absolute;
  }

  .top-1\/4 {
    top: 25%;
  }

  .bottom-1\/4 {
    bottom: 25%;
  }


  .-right-10 {
    right: -2.5rem/* -40px */;
  }

  .-left-10 {
    left: -2.5rem/* -40px */;
  }

  .bg-blue {
    --tw-bg-opacity: 1;
    background-color: rgba(9, 147, 236, var(--tw-bg-opacity));
  }

  .bg-pink {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 56, 195, var(--tw-bg-opacity));
  }

  .bottom-4 {
    bottom: 1rem/* 16px */;
  }

  .top-4 {
    top: 1rem/* 16px */;
  }

  .w-3\/5 {
    width: 60%;
  }  

  .z-0 {
    z-index: 0;
  }

  .filter {
  filter: var(--tw-filter);
  }

  .blur-150px {
  --tw-blur: blur(150px);
  filter: var(--tw-filter);
  }

  .shadow-swap {
    --tw-shadow: 0px 50px 250px -47px rgba(39, 176, 230, 0.29);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

`

export default GlobalStyle

