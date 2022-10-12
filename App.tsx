import { ThemeProvider, useThemeMode } from '@rneui/themed'
import { Provider } from 'react-redux'
import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  setDarkModeAsync,
  store,
} from './src/common'
import AppRouting from './src/router/AppRouting'
import { getTheme } from './src/utils/appThemes'

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

// TODO
setDarkModeAsync(store, true)

function RoutedApp() {
  const { mode, setMode } = useThemeMode()
  console.log(mode)

  return <AppRouting />
}

function ThemedApp() {
  return (
    <ThemeProvider theme={getTheme()}>
      <RoutedApp />
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  )
}
