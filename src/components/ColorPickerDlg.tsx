import Slider from '@react-native-community/slider'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import { Button, ThemeContext } from 'react-native-elements'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { blackBackground, getDarkMode } from '../common'
import { textColor } from '../utils/appThemes'

interface Props {
  open: boolean
  defaultColor: string
  onClose: (c: string) => void
  onCancel: () => void
}
export default function ColorPickerDlg({
  open,
  defaultColor,
  onClose,
  onCancel,
}: Props) {
  const { theme }: any = useContext(ThemeContext)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonText: {
      color: textColor(theme),
    },
    button: {
      marginTop: 30,
      height: 50,
    },
  })
  const darkMode = useSelector(getDarkMode)

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.95}
      backdropColor={darkMode ? blackBackground : 'white'}
      supportedOrientations={['portrait', 'landscape']}
    >
      <ColorPicker
        onColorSelected={(color: string) => onClose(color)}
        defaultColor={defaultColor}
        style={styles.container}
        sliderComponent={Slider as any}
      />
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => onCancel()}
        title="Cancel"
      />
    </Modal>
  )
}
