import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import {
  getEmailAsync,
  getInitialDataAsync,
  loadAppSettingsAsync,
  store,
} from './src/common'

getInitialDataAsync(store)
getEmailAsync(store)
loadAppSettingsAsync(store)

function RoutedApp() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <RoutedApp />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
