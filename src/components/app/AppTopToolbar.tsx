import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Header, Icon, ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { getDarkMode, setDarkModeAsync, store } from '../../common'
import { textColor } from '../../utils/appThemes'

export default function AppTopToolbar() {
  const darkMode = useSelector(getDarkMode)
  const { theme }: any = useContext(ThemeContext)

  const styles = StyleSheet.create({
    header: {
      color: textColor(theme),
      fontSize: 20,
    },
    button: {
      backgroundColor: theme.Header.containerStyle.backgroundColor,
    },
  })

  // console.log(location.pathname)

  return (
    <Header
      placement="center"
      leftComponent={
        <Button
          onPress={() => history.back()}
          buttonStyle={styles.button}
          icon={
            <Icon
              name="navigate-before"
              size={25}
              color={textColor(theme)}
              tvParallaxProperties={undefined}
            />
          }
        />
      }
      centerComponent={{
        // TODO
        text: 'foo', //routeNames[location.pathname],
        style: styles.header,
      }}
      rightComponent={
        <Button
          onPress={() => setDarkModeAsync(store, darkMode ? false : true)}
          buttonStyle={styles.button}
          icon={
            <Icon
              name={darkMode ? 'brightness-high' : 'brightness-4'}
              size={25}
              color={textColor(theme)}
              tvParallaxProperties={undefined}
            />
          }
          testID="dark-mode-button"
        />
      }
    />
  )
}
