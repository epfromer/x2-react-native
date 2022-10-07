import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { VictoryPie } from 'victory-native'
import { EmailXferedDatum, getDarkMode } from '../../common'

// https://formidable.com/open-source/victory/docs/victory-pie

interface Props {
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieVictory({ search, data, handleClick }: Props) {
  const darkMode = useSelector(getDarkMode)

  interface Datum {
    x: string
    y: number
    color: string
  }
  const vData: Array<Datum> = []
  data.forEach((datum) =>
    vData.push({
      x: datum.name,
      y: datum.value,
      color: datum.color,
    })
  )

  return (
    <View style={styles.container}>
      <VictoryPie
        animate
        data={vData}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onPress: (props, slice) => handleClick(search, slice.datum.x),
            },
          },
        ]}
        style={{
          data: {
            fill: ({ datum }: any) => datum.color,
          },
          labels: {
            fill: darkMode ? 'white' : 'black',
            fontSize: 10,
          },
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
