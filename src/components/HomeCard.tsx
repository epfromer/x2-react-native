import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { blackBackground, getDarkMode } from '../common'

interface Props {
  image: any
  title: string
  description: string
}
export default function HomeCard({ image, title, description }: Props) {
  const navigation = useNavigation()
  const darkMode = useSelector(getDarkMode)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? blackBackground : 'white',
    },
    title: {
      fontSize: 20,
      marginLeft: 10,
      marginTop: 10,
      color: darkMode ? 'white' : 'black',
    },
    text: {
      marginLeft: 10,
      marginBottom: 10,
      color: darkMode ? 'white' : 'black',
    },
    image: {
      width: '90%',
      height: 150,
      margin: '5%',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: darkMode ? 'white' : 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  })

  return (
    <TouchableOpacity onPress={() => navigation.navigate(title as never)}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{description}</Text>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  )
}
