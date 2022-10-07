import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BarView from '../views/BarView'
import HomeView from '../views/HomeView'
import PieView from '../views/PieView'
import VolumeTimelineView from '../views/VolumeTimelineView'

const Stack = createNativeStackNavigator()

export default function AppRouting() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Pie" component={PieView} />
        <Stack.Screen name="Bar" component={BarView} />
        <Stack.Screen name="Volume Timeline" component={VolumeTimelineView} />
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
