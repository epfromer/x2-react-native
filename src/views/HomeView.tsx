import { ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../common'
import HomeCard from '../components/HomeCard'
import { blackBackground } from '../utils/appThemes'

export default function HomeView() {
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? blackBackground : 'white',
    },
  })

  return (
    <ScrollView style={styles.container}>
      <HomeCard
        image={require('./img/pie.png')}
        title="Pie"
        description="Enron custodian email volume."
      />
      <HomeCard
        image={require('./img/barchart.png')}
        title="Bar"
        description="Enron custodian email volume."
      />
      <HomeCard
        image={require('./img/volumetimeline.png')}
        title="Volume Timeline"
        description="Enron email per day."
      />
    </ScrollView>
  )
}
