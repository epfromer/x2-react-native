import React from 'react'
import { ECharts } from 'react-native-echarts-wrapper'
import { useSelector } from 'react-redux'
import {
  blackBackground,
  EmailXferedDatum,
  getDarkMode,
  getPieEChartsConfig,
} from '../../common'

// https://www.npmjs.com/package/react-native-echarts-wrapper
// https://echarts.apache.org/examples/en/index.html#chart-type-pie

interface Props {
  title: string
  search: string
  data: Array<EmailXferedDatum>
  handleClick: (search: string, name: string) => void
}
export default function PieECharts({
  title,
  search,
  data,
  handleClick,
}: Props) {
  const darkMode = useSelector(getDarkMode)

  return (
    <ECharts
      onData={(name: string) => handleClick(search, name)}
      additionalCode={`chart.on('click', p => sendData(p.data.name));`}
      backgroundColor={darkMode ? blackBackground : 'white'}
      option={getPieEChartsConfig(darkMode ? 'white' : 'black', title, data)}
    />
  )
}
