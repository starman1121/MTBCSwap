import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import farmsConfig from 'config/constants/farms'
import isArchivedPid from 'utils/farmHelpers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from './fetchFarms'
import fetchFarmsPrices from './fetchFarmsPrices'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { SerializedFarmsState, SerializedFarm } from '../types'

const noAccountFarmConfig = farmsConfig.map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))

const initialState: SerializedFarmsState = {
  data: noAccountFarmConfig,
  loadArchivedFarmsData: false,
  userDataLoaded: false,
}

export const nonArchivedFarms = farmsConfig.filter(({ pid }) => !isArchivedPid(pid))

// Async thunks
export const fetchFarmsPublicDataAsync = createAsyncThunk<SerializedFarm[], number[]>(
  'farms/fetchFarmsPublicDataAsync',
  async (pids) => {
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))

    // Add price helper farms
    const farmsWithPriceHelpers = farmsToFetch.concat(priceHelperLpsConfig)
    const farms = await fetchFarms(farmsWithPriceHelpers)
    // Filter out price helper LP config farms
    const farmsWithPrices = await fetchFarmsPrices(farms)
    console.log('debug->farms', farmsWithPrices)
    const farmsWithoutHelperLps = farmsWithPrices.filter((farm: SerializedFarm) => {
      return farm.pid || farm.pid === 0
    })

    return farmsWithoutHelperLps
  },
)

interface FarmUserDataResponse {
  pid: number
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
}

export const fetchFarmUserDataAsync = createAsyncThunk<FarmUserDataResponse[], { account: string; pids: number[] }>(
  'farms/fetchFarmUserDataAsync',
  async ({ account, pids }) => {
    console.log('debug allow step1')
    const farmsToFetch = farmsConfig.filter((farmConfig) => pids.includes(farmConfig.pid))
    const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
    console.log('debug allow step2', userFarmAllowances)
    const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
    console.log('debug allow step3')
    const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
    console.log('debug allow step4')
    const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)
    console.log('debug allow step5')
    return userFarmAllowances.map((farmAllowance, index) => {
      return {
        pid: farmsToFetch[index].pid,
        allowance: userFarmAllowances[index],
        tokenBalance: userFarmTokenBalances[index],
        stakedBalance: userStakedBalances[index],
        earnings: userFarmEarnings[index],
      }
    })
  },
)

export const farmsSlice = createSlice({
  name: 'Farms',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedFarmsData = action.payload
      state.loadArchivedFarmsData = loadArchivedFarmsData
    },
  },
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchFarmsPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((farm) => {
        const liveFarmData = action.payload.find((farmData) => farmData.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    })

    // Update farms with user data
    builder.addCase(fetchFarmUserDataAsync.fulfilled, (state, action) => {
      action.payload.forEach((userDataEl) => {
        const { pid } = userDataEl
        const index = state.data.findIndex((farm) => farm.pid === pid)
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
      state.userDataLoaded = true
    })
  },
})

// Actions
export const { setLoadArchivedFarmsData } = farmsSlice.actions

export default farmsSlice.reducer
