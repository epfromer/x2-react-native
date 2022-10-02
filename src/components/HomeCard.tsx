import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-native'
import { blackBackground, getDarkMode } from '../common'

// https://docs.nativebase.io/Components.html#card-headfoot-headref

interface Props {
  image: any
  title: string
  description: string
  link: string
}
export default function HomeCard({ image, title, description, link }: Props) {
  const navigate = useNavigate()
  const { theme }: any = useContext(ThemeContext)
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
      borderBottomColor: theme.colors.divider,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  })

  return (
    <TouchableOpacity onPress={() => navigate(link)}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{description}</Text>
        <View style={styles.separator} />
      </View>
    </TouchableOpacity>
  )
}
