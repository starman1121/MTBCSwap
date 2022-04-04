import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'MTBCSwap',
  description:
    'The most popular AMM on BSC by user count! Earn MTBC through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by MTBCSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://MTBCSwap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('MTBCSwap')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('MTBCSwap')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('MTBCSwap')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('MTBCSwap')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('MTBCSwap')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('MTBCSwap')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('MTBCSwap')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('MTBCSwap')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('MTBCSwap')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('MTBCSwap')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('MTBCSwap')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('MTBCSwap')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('MTBCSwap')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('MTBCSwap')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('MTBCSwap')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('MTBCSwap')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('MTBCSwap')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('MTBCSwap')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('MTBCSwap Info & Analytics')}`,
        description: 'View statistics for MTBCSwap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('MTBCSwap Info & Analytics')}`,
        description: 'View statistics for MTBCSwap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('MTBCSwap Info & Analytics')}`,
        description: 'View statistics for MTBCSwap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('MTBCSwap')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('MTBCSwap')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('MTBCSwap')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('MTBCSwap')}`,
      }
    default:
      return null
  }
}
