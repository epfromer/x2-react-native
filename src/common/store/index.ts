import {
  Action,
  configureStore,
  ThunkAction,
  createSerializableStateInvariantMiddleware,
} from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import appSettingsReducer from './slices/appSettingsSlice'
import custodiansReducer from './slices/custodiansSlice'
import emailSentByDayReducer from './slices/emailSentByDaySlice'
import emailReducer from './slices/emailSlice'
import queryReducer from './slices/querySlice'
import wordCloudReducer from './slices/wordCloudSlice'

export * from './slices/appSettingsSlice'
export * from './slices/custodiansSlice'
export * from './slices/emailSentByDaySlice'
export * from './slices/emailSlice'
export * from './slices/querySlice'
export * from './slices/wordCloudSlice'

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// const middleware = [...getDefaultMiddleware(), logger]

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  warnAfter: 200,
})

export const store = configureStore({
  reducer: {
    appSettings: appSettingsReducer,
    custodians: custodiansReducer,
    email: emailReducer,
    emailSentByDay: emailSentByDayReducer,
    query: queryReducer,
    wordCloud: wordCloudReducer,
  },
  middleware: [serializableMiddleware],
})
