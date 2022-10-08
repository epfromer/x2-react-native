import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { VictoryPie, VictoryLabel } from 'victory-native'
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

export default function PieView() {
  const dispatch = useDispatch()
  const [isSenders, setIsSenders] = useState(true)
  const custodiansLoading = useSelector(getCustodiansLoading)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
  const darkMode = useSelector(getDarkMode)
  const navigation = useNavigation()

  // lock orientation for this view
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
  })

  function handleClick(search: string, value: string) {
    dispatch(clearSearch())
    const name = value.slice(0, value.search(/,/))
    dispatch(search === 'from' ? setFrom(name) : setTo(name))
    getEmailAsync(store)
    navigation.navigate('Search' as never)
  }

  interface Datum {
    x: string
    y: number
    color: string
  }
  const data = isSenders ? emailSenders : emailReceivers
  const vData: Array<Datum> = []
  data.forEach((datum) =>
    vData.push({
      x: datum.name,
      y: datum.value,
      color: datum.color,
    })
  )

  return (
    <View style={styles.container}>
      <Spinner
        visible={custodiansLoading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      {!custodiansLoading && (
        <VictoryPie
          animate
          data={vData}
          labelComponent={<VictoryLabel textAnchor="start" dx={-20} />}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: (props, slice) =>
                  handleClick(isSenders ? 'from' : 'to', slice.datum.x),
              },
            },
          ]}
          style={{
            data: {
              fill: ({ datum }: any) => datum.color,
            },
            labels: {
              fill: darkMode ? 'white' : 'black',
              fontSize: 15,
            },
          }}
        />
      )}
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
    </View>
  )
}
