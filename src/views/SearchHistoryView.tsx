import { gql, request } from 'graphql-request'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-native'
import {
  blackBackground,
  clearSearch,
  getDarkMode,
  getEmailAsync,
  REACT_APP_X2_SERVER,
  SearchHistoryEntry,
  setAllText,
  setBody,
  setFrom,
  setOrder,
  setSent,
  setSort,
  setSubject,
  setTo,
  store,
} from '../common'

export default function SearchHistoryView() {
  const navigate = useNavigate()
  const [log, setLog] = useState<SearchHistoryEntry[]>([])
  const [logLoading, setLogLoading] = useState(false)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },

    historyButton: {
      margin: 1,
      padding: 10,
    },
    itemContainer: {
      margin: 5,
    },
    spaceBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      color: darkMode ? 'white' : 'black',
      marginBottom: 10,
    },
  })

  const getSearchHistory = (): void => {
    setLogLoading(true)
    const query = gql`
      {
        getSearchHistory {
          id
          timestamp
          entry
        }
      }
    `
    request(`${REACT_APP_X2_SERVER}/graphql/`, query)
      .then((data) => {
        setLog(data.getSearchHistory)
        setLogLoading(false)
      })
      .catch((e) => console.error(e))
  }

  const onSearchHistory = (entry: string) => {
    const o = JSON.parse(entry)
    store.dispatch(clearSearch())
    if (o.hasOwnProperty('sort')) store.dispatch(setSort(o.sort))
    if (o.hasOwnProperty('order')) store.dispatch(setOrder(o.order))
    if (o.hasOwnProperty('sent')) store.dispatch(setSent(o.sent))
    if (o.hasOwnProperty('from')) store.dispatch(setFrom(o.from))
    if (o.hasOwnProperty('to')) store.dispatch(setTo(o.to))
    if (o.hasOwnProperty('subject')) store.dispatch(setSubject(o.subject))
    if (o.hasOwnProperty('allText')) store.dispatch(setAllText(o.allText))
    if (o.hasOwnProperty('body')) store.dispatch(setBody(o.body))
    getEmailAsync(store)
    navigate('/SearchView')
  }

  const onClearHistory = () => {
    const mutation = gql`
      mutation {
        clearSearchHistory
      }
    `
    request(`${REACT_APP_X2_SERVER}/graphql/`, mutation)
      .then(() => getSearchHistory())
      .catch((e) => console.error(e))
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => onSearchHistory(item.entry)}>
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <Text numberOfLines={4} style={styles.text}>
            {item.timestamp.substring(0, 10)} {item.entry}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  useEffect(() => {
    getSearchHistory()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={logLoading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      {log && log.length !== 0 && (
        <FlatList
          data={log}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button
        buttonStyle={styles.historyButton}
        onPress={onClearHistory}
        testID="clear-history"
        title="Clear History"
      />
      {process.env.NODE_ENV === 'test' && (
        <Button
          onPress={() => onSearchHistory('{"to":"ba"}')}
          testID="test-click"
        />
      )}
    </SafeAreaView>
  )
}
