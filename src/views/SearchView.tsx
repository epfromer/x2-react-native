import React from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import {
  blackBackground,
  defaultLimit,
  getAllText,
  getDarkMode,
  getEmail,
  getEmailAsync,
  getEmailListPage,
  getEmailLoading,
  getEmailTotal,
  getFrom,
  getSent,
  getSubject,
  getTo,
  maxFromLength,
  setEmailListPage,
  store,
} from '../common'

// const FILTER_DATE = '2000-10-04'

export default function SearchView() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const allText = useSelector(getAllText)
  const from = useSelector(getFrom)
  const to = useSelector(getTo)
  const subject = useSelector(getSubject)
  const sent = useSelector(getSent)
  // const [dlgOpen, setDlgOpen] = useState(false)
  const emailLoading = useSelector(getEmailLoading)
  const email = useSelector(getEmail)
  const emailTotal = useSelector(getEmailTotal)
  const emailListPage = useSelector(getEmailListPage)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    buttonText: {
      color: darkMode ? 'white' : 'black',
    },
    button: {
      width: 80,
    },
    itemContainer: {
      margin: 5,
    },
    spaceBetweenRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bold: {
      fontSize: 15,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    topField: {
      marginTop: 15,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
    loading: {
      margin: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  // TODO
  // function SearchDlg() {
  //   // https://www.npmjs.com/package/react-native-modal

  //   const [newAllText, setNewAllText] = useState(allText)
  //   const [newFrom, setNewFrom] = useState(from)
  //   const [newTo, setNewTo] = useState(to)
  //   const [newSubject, setNewSubject] = useState(subject)
  //   const [newSent, setNewSent] = useState(sent)
  //   const [datePickerOpen, setDatePickerOpen] = useState(false)

  //   const doQuery = () => {
  //     if (newAllText !== allText) dispatch(setAllText(newAllText))
  //     if (newFrom !== from) dispatch(setFrom(newFrom))
  //     if (newTo !== to) dispatch(setTo(newTo))
  //     if (newSubject !== subject) dispatch(setSubject(newSubject))
  //     if (newSent !== sent) dispatch(setSent(newSent))
  //     setDlgOpen(false)
  //     getEmailAsync(store)
  //   }

  //   const clearFields = () => {
  //     setNewAllText('')
  //     setNewFrom('')
  //     setNewTo('')
  //     setNewSubject('')
  //     setNewSent('')
  //   }

  //   const SentDatePicker = () => {
  //     // use https://github.com/mmazzarolo/react-native-modal-datetime-picker

  //     const initialDate = sent ? new Date(sent) : new Date(FILTER_DATE)

  //     // TODO - minDate: 1999-07-02, maxDate: 2002-01-30
  //     return (
  //       <DateTimePickerModal
  //         isVisible={datePickerOpen}
  //         isDarkModeEnabled={useSelector(getDarkMode)}
  //         date={initialDate}
  //         mode="date"
  //         onConfirm={(date: Date) => {
  //           setDatePickerOpen(false)
  //           setNewSent(getDateStr(date))
  //         }}
  //         onCancel={() => {
  //           setDatePickerOpen(false)
  //         }}
  //       />
  //     )
  //   }

  //   return (
  //     <Modal
  //       isVisible={dlgOpen}
  //       backdropOpacity={0.95}
  //       backdropColor={darkMode ? blackBackground : 'white'}
  //       supportedOrientations={['portrait', 'landscape']}
  //     >
  //       <SentDatePicker />
  //       <KeyboardAvoidingView
  //         style={styles.container}
  //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //       >
  //         <Input
  //           label="Filter (all text fields)"
  //           labelStyle={styles.topField}
  //           inputStyle={styles.text}
  //           value={newAllText}
  //           testID="set-all-text"
  //           onChangeText={(s) => setNewAllText(s)}
  //           rightIcon={
  //             <Icon
  //               testID="close-all-text"
  //               name="close"
  //               iconStyle={styles.text}
  //               onPress={() => setNewAllText('')}
  //             />
  //           }
  //         />
  //         <Input
  //           label="Filter Sent"
  //           labelStyle={styles.text}
  //           inputStyle={styles.text}
  //           value={newSent}
  //           testID="set-sent"
  //           onChangeText={(s) => setNewSent(s)}
  //           rightIcon={
  //             <Icon
  //               testID="close-sent"
  //               name="date-range"
  //               iconStyle={styles.text}
  //               onPress={() => setDatePickerOpen(true)}
  //             />
  //           }
  //         />
  //         <Input
  //           label="Filter From"
  //           labelStyle={styles.text}
  //           inputStyle={styles.text}
  //           value={newFrom}
  //           testID="set-from"
  //           onChangeText={(s) => setNewFrom(s)}
  //           rightIcon={
  //             <Icon
  //               testID="close-from"
  //               name="close"
  //               iconStyle={styles.text}
  //               onPress={() => setNewFrom('')}
  //             />
  //           }
  //         />
  //         <Input
  //           label="Filter To"
  //           labelStyle={styles.text}
  //           inputStyle={styles.text}
  //           value={newTo}
  //           testID="set-to"
  //           onChangeText={(s) => setNewTo(s)}
  //           rightIcon={
  //             <Icon
  //               testID="close-to"
  //               name="close"
  //               iconStyle={styles.text}
  //               onPress={() => setNewTo('')}
  //             />
  //           }
  //         />
  //         <Input
  //           label="Filter Subject"
  //           labelStyle={styles.text}
  //           inputStyle={styles.text}
  //           value={newSubject}
  //           testID="set-subject"
  //           onChangeText={(s) => setNewSubject(s)}
  //           rightIcon={
  //             <Icon
  //               testID="close-subject"
  //               name="close"
  //               iconStyle={styles.text}
  //               onPress={() => setNewSubject('')}
  //             />
  //           }
  //         />
  //         <View style={styles.spaceBetweenRow}>
  //           <Button
  //             testID="cancel-dialog"
  //             buttonStyle={styles.button}
  //             titleStyle={styles.buttonText}
  //             onPress={() => setDlgOpen(false)}
  //             title="Cancel"
  //           />
  //           <Button
  //             testID="clear-fields"
  //             buttonStyle={styles.button}
  //             titleStyle={styles.buttonText}
  //             onPress={() => clearFields()}
  //             title="Clear"
  //           />
  //           <Button
  //             testID="do-query"
  //             buttonStyle={styles.button}
  //             titleStyle={styles.buttonText}
  //             onPress={() => doQuery()}
  //             title="Search"
  //           />
  //         </View>
  //       </KeyboardAvoidingView>
  //     </Modal>
  //   )
  // }

  const maxString = (s: string, maxLen: number): string => {
    if (s.length > maxLen) {
      return s.substring(0, maxLen - 1) + '...'
    } else {
      return s
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Email Detail' as never, { id: item.id } as never)
      }
    >
      <View style={styles.itemContainer}>
        <View style={styles.spaceBetweenRow}>
          <View>
            <Text numberOfLines={1} style={styles.bold}>
              {maxString(item.from, maxFromLength)}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.text}>
              {item.sentShort}
            </Text>
          </View>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.text}>
            {item.subject}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const hasMore = () => (emailListPage + 1) * defaultLimit < emailTotal

  const handleLoadMore = () => {
    if (hasMore() && !emailLoading) {
      dispatch(setEmailListPage(emailListPage + 1))
      getEmailAsync(store, true)
    }
  }

  const filterList = () => {
    let s = ''
    if (allText) s += `allText=${allText} `
    if (from) s += `from=${from} `
    if (to) s += `to=${to} `
    if (subject) s += `subject=${subject} `
    if (sent) s += `sent=${sent} `
    if (s === '') s = 'none'
    return 'Filters: ' + s
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <SearchDlg /> */}
      <Button
        testID="open-dialog"
        titleStyle={styles.buttonText}
        // onPress={() => setDlgOpen(true)}
        title={filterList()}
      />
      <Spinner visible={emailLoading} color={darkMode ? 'white' : 'black'} />
      {email && email.length !== 0 && (
        <FlatList
          data={email}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={defaultLimit}
        />
      )}
      {email && email.length === 0 && !emailLoading && (
        <View style={styles.loading}>
          <Text style={styles.text}>Nothing found</Text>
        </View>
      )}
      <Button
        onPress={() => navigation.navigate('Search History' as never)}
        title="Search History"
      />
    </SafeAreaView>
  )
}
