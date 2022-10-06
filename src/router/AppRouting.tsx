import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import BarView from '../views/BarView'
// import EmailDetailView from '../views/EmailDetailView'
import HomeView from '../views/HomeView'
// import NetworkGraphView from '../views/NetworkGraphView'
import PieView from '../views/PieView'
// import SearchHistoryView from '../views/SearchHistoryView'
// import SearchView from '../views/SearchView'
// import TreeMapView from '../views/TreeMapView'
// import VolumeTimelineView from '../views/VolumeTimelineView'

const Stack = createNativeStackNavigator()

export default function AppRouting() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Pie" component={PieView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

{
  /*
<Stack.Screen name="Bar" component={BarView} />
<Stack.Screen name="Volume Timeline" component={VolumeTimelineView} />
<Stack.Screen name="Network Graph" component={NetworkGraphView} />
<Stack.Screen name="Tree Map" component={TreeMapView} />
<Stack.Screen name="Search" component={SearchView} />
<Stack.Screen name="Search History" component={SearchHistoryView} />
<Stack.Screen name="Email Detail" component={EmailDetailView} /> */
}
