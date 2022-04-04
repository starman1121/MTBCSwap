import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'MTBC',
    isTokenOnly: true,
    lpAddresses: {
      97: '',
      56: '0x4f6b30c94f19a0aa3c93079c8f40e76af597aa01',
    },
    token: serializedTokens.mtbc,
    quoteToken: serializedTokens.busd,
  },  
  {
    pid: 1,
    lpSymbol: 'MTBC-WBNB LP',
    lpAddresses: {
      97: '',
      56: '0x6f913063df2C859070A8b3828bE38941AF422481',
    },
    token: serializedTokens.mtbc,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
  },
  // {
  //   pid: 3,
  //   lpSymbol: 'TMTBC',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xed6CF6ABC6919ddef62c1BfA6b62D2A167243436',
  //   },
  //   token: serializedTokens.MTBC,
  //   quoteToken: serializedTokens.busd,
  //   isTokenOnly: true
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'WBNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
  //   },
  //   token: serializedTokens.wbnb,
  //   quoteToken: serializedTokens.busd,
  //   isTokenOnly: true
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'TMTBC-USDT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1EA829dc0Aba30EE8faA5bC792d7fBAC79C86F84',
  //   },
  //   token: serializedTokens.MTBC,
  //   quoteToken: serializedTokens.usdt,
  // },
  // {
  //   pid: 3,
  //   lpSymbol: 'TMTBC',
  //   isTokenOnly: true,
  //   lpAddresses: {
  //     97: '',
  //     56: '0x64AEE18EB66F41706849D8AC583845DAC64df2B7',
  //   },
  //   token: serializedTokens.MTBC,
  //   quoteToken: serializedTokens.usdt,
  // },
]

export default farms
