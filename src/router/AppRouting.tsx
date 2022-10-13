/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, useTheme } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../common'
import BarView from '../views/BarView'
import HomeView from '../views/HomeView'
import PieView from '../views/PieView'
import SearchView from '../views/SearchView'
import VolumeTimelineView from '../views/VolumeTimelineView'

const Stack = createNativeStackNavigator()

export default function AppRouting() {
  const darkMode = useSelector(getDarkMode)
  const { theme } = useTheme()
  const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
      marginRight: 10,
    },
  })

  const DarkModeButton = () => (
    <View style={styles.container}>
      <Button
        color={theme.colors.primary}
        onPress={() => console.log('This is a button!')}
        icon={{
          name: darkMode ? 'brightness-high' : 'brightness-4',
          size: 25,
        }}
      />
    </View>
  )

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            headerRight: () => <DarkModeButton />,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Pie"
          component={PieView}
          options={{
            headerRight: () => <DarkModeButton />,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Bar"
          component={BarView}
          options={{
            headerRight: () => <DarkModeButton />,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Volume Timeline"
          component={VolumeTimelineView}
          options={{
            headerRight: () => <DarkModeButton />,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: 'black',
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchView}
          options={{
            headerRight: () => <DarkModeButton />,
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: 'black',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

{
  /*
<Stack.Screen name="Search" component={SearchView} />
<Stack.Screen name="Search History" component={SearchHistoryView} />
<Stack.Screen name="Email Detail" component={EmailDetailView} /> */
}
