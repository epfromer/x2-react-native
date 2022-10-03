import { gql, request } from 'graphql-request'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon, ThemeContext } from 'react-native-elements'
import Highlighter from 'react-native-highlight-words'
import Spinner from 'react-native-loading-spinner-overlay'
import GestureRecognizer from 'react-native-swipe-gestures'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  blackBackground,
  Email,
  getAllText,
  getBody,
  getDarkMode,
  getEmail,
  getEmailById,
  getEmailIndex,
  getFrom,
  getNextEmailId,
  getPreviousEmailId,
  getSubject,
  getTo,
  REACT_APP_X2_SERVER,
  store,
} from '../common'
import { textColor } from '../utils/appThemes'

export default function EmailDetailView() {
  const navigation = useNavigation()
  const route = useRoute()
  let { id } = route.params as any
  console.log(id)
  if (process.env.NODE_ENV === 'test')
    id = 'f3281cc4-90a9-4dcb-86bd-d705fc847985'
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<Email | null>(null)
  const cachedEmail = getEmailById(store, id!)
  const allText = useSelector(getAllText)
  const to = useSelector(getTo)
  const from = useSelector(getFrom)
  const subject = useSelector(getSubject)
  const body = useSelector(getBody)
  const cachedEmails = useSelector(getEmail)
  const totalCachedEmails = cachedEmails ? cachedEmails.length : 0
  const emailIndex = getEmailIndex(store, id!)
  const previousEmailId = getPreviousEmailId(store, id!)
  const nextEmailId = getNextEmailId(store, id!)
  const { theme }: any = useContext(ThemeContext)
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    emailHeader: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonText: {
      color: textColor(theme),
    },
    button: {
      margin: 10,
    },
    center: {
      flex: 1,
      alignItems: 'center',
    },
    spaceBetween: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    text: {
      color: darkMode ? 'white' : 'black',
    },
    title: {
      fontSize: 20,
      paddingLeft: 10,
      color: darkMode ? 'white' : 'black',
    },
    fields: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'normal',
      color: darkMode ? 'white' : 'black',
    },
    fieldBold: {
      fontSize: 15,
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    body: {
      fontSize: 15,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      color: darkMode ? 'white' : 'black',
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const highlightedTerms: Array<string> = []
  if (allText) highlightedTerms.push(allText as string)
  if (to) highlightedTerms.push(to as string)
  if (from) highlightedTerms.push(from as string)
  if (subject) highlightedTerms.push(subject as string)
  if (body) highlightedTerms.push(body as string)

  useEffect(() => {
    let isSubscribed = true
    if (cachedEmail) {
      setEmail(cachedEmail)
    } else {
      setLoading(true)
      const query = gql`
        query getEmail($id: ID) {
          getEmail(id: $id) {
            emails {
              id
              sent
              sentShort
              from
              fromCustodian
              to
              toCustodians
              cc
              bcc
              subject
              body
            }
            total
          }
        }
      `
      request(`${REACT_APP_X2_SERVER}/graphql/`, query, { id })
        .then((data) => {
          // prevents update if component destroyed before request/fetch completes
          if (isSubscribed) {
            setEmail(data.getEmail.emails[0])
            setLoading(false)
          }
        })
        .catch((e) => console.error(e))
    }
    return () => {
      // prevents update if component destroyed before request/fetch completes
      isSubscribed = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedEmail])

  function highlight(str?: string) {
    let s = str
    if (!s) return ''
    return (
      <Highlighter
        highlightStyle={{ backgroundColor: 'yellow' } as any}
        searchWords={highlightedTerms}
        textToHighlight={str}
      />
    )
  }

  const onPrevious = () =>
    previousEmailId &&
    navigation.navigate(
      'Email Detail' as never,
      { id: previousEmailId } as never
    )

  const onNext = () =>
    nextEmailId &&
    navigation.navigate('Email Detail' as never, { id: nextEmailId } as never)

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        color={darkMode ? 'white' : 'black'}
        textContent={'Loading...'}
      />
      {email && (
        <View>
          {/* header */}
          <View style={styles.emailHeader}>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              disabled={!previousEmailId}
              testID="previous-email"
              icon={
                <Icon
                  name="arrow-back"
                  color={textColor(theme)}
                  tvParallaxProperties={undefined}
                />
              }
              onPress={onPrevious}
            />
            <Text style={styles.text}>
              {totalCachedEmails ? `${emailIndex} of ${totalCachedEmails}` : ''}
            </Text>
            <Button
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              disabled={!nextEmailId}
              testID="next-email"
              icon={
                <Icon
                  name="arrow-forward"
                  color={textColor(theme)}
                  tvParallaxProperties={undefined}
                />
              }
              onPress={onNext}
            />
          </View>
          <ScrollView>
            <GestureRecognizer onSwipeLeft={onNext} onSwipeRight={onPrevious}>
              {/* subject */}
              <Text style={styles.title}>{highlight(email?.subject)}</Text>
              {/* sent */}
              <Text style={styles.fieldBold}>
                Sent:{' '}
                <Text style={styles.fields}>
                  {email?.sent
                    ? new Date(+email.sent).toUTCString()
                    : 'unknown'}
                </Text>
              </Text>
              {/* from */}
              if (!email?.fromCustodian || email?.fromCustodian === '')
              {
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email?.from)}</Text>
                </Text>
              }
              else
              {
                <Text style={styles.fieldBold}>
                  From:{' '}
                  <Text style={styles.fields}>{highlight(email.from)}</Text>
                  (custodian:{' '}
                  <Text style={styles.fields}>{email.fromCustodian}</Text>)
                </Text>
              }
              {/* to */}
              if (!email?.toCustodians || !email?.toCustodians.length)
              {
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email?.to)}</Text>
                </Text>
              }
              else
              {
                <Text style={styles.fieldBold}>
                  To: <Text style={styles.fields}>{highlight(email.to)}</Text>
                  (custodian:{' '}
                  <Text style={styles.fields}>{email.toCustodians}</Text>)
                </Text>
              }
              {/* cc */}
              <Text style={styles.fieldBold}>
                CC: <Text style={styles.fields}>{highlight(email?.cc)}</Text>
              </Text>
              {/* BCC */}
              <Text style={styles.fieldBold}>
                BCC: <Text style={styles.fields}>{highlight(email?.bcc)}</Text>
              </Text>
              {/* body */}
              <Text style={styles.body}>{highlight(email?.body)}</Text>
            </GestureRecognizer>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}
