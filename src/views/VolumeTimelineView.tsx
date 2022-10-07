import { useNavigation } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import {
  blackBackground,
  clearSearch,
  EmailSentByDay,
  getDarkMode,
  getEmailAsync,
  getEmailSentByDay,
  getEmailSentByDayLoading,
  setSent,
  store,
} from '../common'
import VolumeTimelineChart from '../components/VolumeTimelineChart'

export default function VolumeTimelineView() {
  const dispatch = useDispatch()
  const emailSentLoading = useSelector(getEmailSentByDayLoading)
  const emailSent = useSelector(getEmailSentByDay)
  const darkMode = useSelector(getDarkMode)
  const navigation = useNavigation()

  function handleClick(date: string) {
    dispatch(clearSearch())
    dispatch(setSent(date))
    getEmailAsync(store)
    navigation.navigate('Search' as never)
  }

  let data: Array<EmailSentByDay> = []
  if (emailSent) {
    data = emailSent.map((stat: any) => ({
      sent: stat.sent,
      total: stat.total,
    }))
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={emailSentLoading}
        textContent={'Loading...'}
        color={darkMode ? 'white' : 'black'}
      />
      <View style={styles.chart}>
        {emailSent && (
          <VolumeTimelineChart
            title="Email Volume per Day"
            data={data}
            handleClick={handleClick}
          />
        )}
      </View>
      {process.env.NODE_ENV === 'test' && (
        <Button onPress={() => handleClick('2001-01-01')} testID="test-click" />
      )}
    </SafeAreaView>
  )
}
