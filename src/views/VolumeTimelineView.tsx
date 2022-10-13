import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native'
import {
  clearSearch,
  getDarkMode,
  getEmailAsync,
  getEmailSentByDay,
  getEmailSentByDayLoading,
  setSent,
  store,
} from '../common'
import { blackBackground, primaryColor } from '../utils/appThemes'

export default function VolumeTimelineView() {
  const dispatch = useDispatch()
  const emailSentLoading = useSelector(getEmailSentByDayLoading)
  const emailSent = useSelector(getEmailSentByDay)
  const darkMode = useSelector(getDarkMode)
  const navigation = useNavigation()
  const [isPortrait, setIsPortrait] = useState(true)

  // lock orientation for this view
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  }, [])

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync(store)
    navigation.navigate('Search' as never)
  }

  interface Datum {
    x: string | Date
    y: number
  }
  const vData: Array<Datum> = []
  if (emailSent) {
    emailSent.forEach((datum) =>
      vData.push({
        x: typeof datum.sent === 'string' ? new Date(datum.sent) : datum.sent,
        y: datum.total,
      })
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    chart: {},
  })

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setIsPortrait(width < height)
      }}
    >
      <Spinner
        visible={emailSentLoading}
        textContent={'Loading...'}
        color={darkMode ? 'white' : 'black'}
      />
      <View style={styles.chart}>
        {emailSent && isPortrait && (
          <VictoryChart scale="time" height={700}>
            <VictoryAxis
              style={{
                tickLabels: {
                  fill: darkMode ? 'white' : 'black',
                  fontSize: 15,
                },
              }}
            />
            <VictoryLine
              animate
              data={vData}
              style={{ data: { stroke: primaryColor } }}
            />
          </VictoryChart>
        )}
        {emailSent && !isPortrait && (
          <VictoryChart scale="time" width={800}>
            <VictoryAxis
              style={{
                tickLabels: {
                  fill: darkMode ? 'white' : 'black',
                  fontSize: 15,
                },
              }}
            />
            <VictoryLine
              animate
              data={vData}
              style={{ data: { stroke: primaryColor } }}
            />
          </VictoryChart>
        )}
      </View>
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('2001-01-01')} testID="test-click" />
      )}
    </View>
  )
}
