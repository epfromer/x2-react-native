import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import {
  blackBackground,
  clearSearch,
  getCustodiansLoading,
  getDarkMode,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
  setFrom,
  setTo,
  store,
} from '../common'
import PieVictory from '../components/Victory/PieVictory'

export default function PieView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
  const custodiansLoading = useSelector(getCustodiansLoading)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
  const darkMode = useSelector(getDarkMode)
  const navigation = useNavigation()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    chart: {
      flex: 9,
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    navigation.navigate('Search' as never)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={custodiansLoading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      <View style={styles.chart}>
        {!custodiansLoading && (
          <PieVictory
            search={isSenders ? 'from' : 'to'}
            data={isSenders ? emailSenders : emailReceivers}
            handleClick={handleClick}
          />
        )}
      </View>
      <Picker
        selectedValue={isSenders ? 'Senders' : 'Receivers'}
        onValueChange={(value) => setIsSenders(value === 'Senders')}
      >
        <Picker.Item label="Senders" value="Senders" />
        <Picker.Item label="Receivers" value="Receivers" />
      </Picker>
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('to', 'from')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
