/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, useTheme } from '@rneui/themed'
import { useSelector } from 'react-redux'
import { getDarkMode, setDarkModeAsync, store } from '../common'
import BarView from '../views/BarView'
import HomeView from '../views/HomeView'
import PieView from '../views/PieView'
import SearchView from '../views/SearchView'
import VolumeTimelineView from '../views/VolumeTimelineView'

const Stack = createNativeStackNavigator()

export default function AppRouting() {
  const darkMode = useSelector(getDarkMode)
  const { theme } = useTheme()

  const DarkModeButton = () => (
    <Button
      color={theme.colors.primary}
      onPress={() => setDarkModeAsync(store, !darkMode)}
      icon={{
        name: darkMode ? 'brightness-high' : 'brightness-4',
        size: 25,
      }}
    />
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
