import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import BarView from '../views/BarView'
import HomeView from '../views/HomeView'
import PieView from '../views/PieView'

const Stack = createNativeStackNavigator()

export const routeNames = {
  '/NetworkGraphView': 'Network Graph',
  '/TreeMapView': 'Tree Map',
  '/VolumeTimelineView': 'Volume Timeline',
  '/EmailDetailView': 'Email Detail',
  '/': 'Home',
}

export default function AppRouting() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Pie" component={PieView} />
        <Stack.Screen name="Bar" component={BarView} />
        {/* <Stack.Screen name="Search" component={SearchView} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

{
  /* <Routes>
<Route path="/SearchHistoryView" element={<SearchHistoryView />} />
<Route path="/SearchView" element={<SearchView />} />
<Route path="/BarView" element={<BarView />} />
<Route path="/NetworkGraphView" element={<NetworkGraphView />} />
<Route path="/TreeMapView" element={<TreeMapView />} />
<Route path="/VolumeTimelineView" element={<VolumeTimelineView />} />
<Route path="/EmailDetailView/:id" element={<EmailDetailView />} />
<Route path="/HomeView" element={<HomeView />} />
</Routes> */
}
