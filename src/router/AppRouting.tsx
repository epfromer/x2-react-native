import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../common'
import BarView from '../views/BarView'
import HomeView from '../views/HomeView'
import PieView from '../views/PieView'
import SearchView from '../views/SearchView'
import VolumeTimelineView from '../views/VolumeTimelineView'
import { StyleSheet, View } from 'react-native'

const Stack = createNativeStackNavigator()

const styles = StyleSheet.create({
  container: {
    color: '#f4511e',
    marginBottom: 0,
    marginRight: 0,
  },
})

interface DarkModeProps {
  darkMode: boolean
}
const DarkModeButton: FC<DarkModeProps> = (darkMode) => (
  <View style={styles.container}>
    <Button
      color="#f4511e"
      onPress={() => console.log('This is a button!')}
      icon={{
        name: darkMode ? 'brightness-high' : 'brightness-4',
        size: 25,
      }}
    />
  </View>
)

export default function AppRouting() {
  const darkMode = useSelector(getDarkMode)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <DarkModeButton darkMode={darkMode} />,
            headerStyle: {
              backgroundColor: '#f4511e',
            },
          }}
        />
        <Stack.Screen
          name="Pie"
          component={PieView}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <DarkModeButton darkMode={darkMode} />,
          }}
        />
        <Stack.Screen
          name="Bar"
          component={BarView}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <DarkModeButton darkMode={darkMode} />,
          }}
        />
        <Stack.Screen
          name="Volume Timeline"
          component={VolumeTimelineView}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <DarkModeButton darkMode={darkMode} />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchView}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => <DarkModeButton darkMode={darkMode} />,
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
