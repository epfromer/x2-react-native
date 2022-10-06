import { Provider } from 'react-redux'
import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from './src/common'
import AppRouting from './src/router/AppRouting'

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

function RoutedApp() {
  return <AppRouting />
}

export default function App() {
  return (
    <Provider store={store}>
      <RoutedApp />
    </Provider>
  )
}
