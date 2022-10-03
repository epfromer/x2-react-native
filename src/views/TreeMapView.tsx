import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch, useSelector } from 'react-redux'
import {
  blackBackground,
  clearSearch,
  getCustodians,
  getCustodiansLoading,
  getDarkMode,
  getEmailAsync,
  getEmailReceivers,
  getEmailSenders,
  setFrom,
  setTo,
  store,
} from '../common'
import ChartPicker from '../components/ChartPicker'
import TreeMapECharts from '../components/ECharts/TreeMapECharts'
import XmitTypePicker from '../components/XmitTypePicker'

export default function TreeMapView() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isSenders, setIsSenders] = useState(true)
  const [chartLib, setChartLib] = useState('ECharts')
  const custodiansLoading = useSelector(getCustodiansLoading)
  const custodians = useSelector(getCustodians)
  const emailSenders = useSelector(getEmailSenders)
  const emailReceivers = useSelector(getEmailReceivers)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    chart: {
      flex: 9,
    },
    selectRow: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: darkMode ? blackBackground : 'white',
      justifyContent: 'space-evenly',
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
        {custodians && (
          <>
            {chartLib === 'ECharts' && (
              <>
                {isSenders && (
                  <TreeMapECharts
                    title="Senders"
                    search="from"
                    data={emailSenders}
                    handleClick={handleClick}
                  />
                )}
                {!isSenders && (
                  <TreeMapECharts
                    title="Receivers"
                    search="to"
                    data={emailReceivers}
                    handleClick={handleClick}
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
      <View style={styles.selectRow}>
        <XmitTypePicker
          onChange={(value) => setIsSenders(value === 'Senders')}
        />
        <ChartPicker
          onChange={(value) => setChartLib(value)}
          chartNames={['ECharts']}
        />
      </View>
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => handleClick('from', 'foo')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
