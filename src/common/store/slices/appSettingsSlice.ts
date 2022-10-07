import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAction, createSlice, Store } from '@reduxjs/toolkit'
import { gql, GraphQLClient } from 'graphql-request'
import { RootState } from '..'
import { REACT_APP_X2_SERVER } from '../../constants'
import { setCustodians, setCustodiansLoading } from './custodiansSlice'
import {
  setEmailSentByDay,
  setEmailSentByDayLoading,
} from './emailSentByDaySlice'

export interface AppSettingsState {
  darkMode: boolean
  orientation: string
}
const initialState: AppSettingsState = {
  darkMode: false,
  orientation: 'portrait',
}

// Actions
export const setDarkMode = createAction<boolean>('appSettings/setDarkMode')

// Reducer
export const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setDarkMode, (state, action) => {
      state.darkMode = action.payload
    })
  },
})
export default appSettingsSlice.reducer

// selectors & getters
export const getDarkMode = (state: RootState): boolean =>
  state.appSettings.darkMode

export async function loadAppSettingsAsync(store: Store): Promise<void> {
  try {
    let darkMode = false
    const value = await AsyncStorage.getItem('darkMode')
    if (value === 'true') darkMode = true
    store.dispatch(setDarkMode(darkMode))
  } catch (e) {
    console.error('loadAppSettingsAsync', e)
  }
}

export async function setDarkModeAsync(
  store: Store,
  darkMode: boolean
): Promise<void> {
  await AsyncStorage.setItem('darkMode', String(darkMode))
  store.dispatch(setDarkMode(darkMode))
}

// const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms))

// graphQl query
export function getInitialDataAsync(store: Store): void {
  store.dispatch(setEmailSentByDayLoading(true))
  store.dispatch(setCustodiansLoading(true))
  const query = gql`
    {
      getEmailSentByDay {
        sent
        total
      }
      getCustodians {
        id
        name
        title
        color
        senderTotal
        receiverTotal
        toCustodians {
          custodianId
          total
        }
      }
    }
  `
  const endpoint = `${REACT_APP_X2_SERVER}/graphql/`
  const graphQLClient = new GraphQLClient(endpoint)
  console.log('getInitialDataAsync: graphQL request of ', endpoint)
  graphQLClient
    .request(query)
    .then(async (data) => {
      console.log('getInitialDataAsync: response ', data.getCustodians)
      // await sleep(5000)
      store.dispatch(setEmailSentByDay(data.getEmailSentByDay))
      store.dispatch(setCustodians(data.getCustodians))
      store.dispatch(setEmailSentByDayLoading(false))
      store.dispatch(setCustodiansLoading(false))
    })
    .catch((e) => {
      console.error('getInitialDataAsync', e)
    })
}
