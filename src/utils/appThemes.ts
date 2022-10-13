import { createTheme } from '@rneui/themed'

export const primaryColor = '#bb4d00'
export const blackBackground = '#222222'

export function getTheme() {
  return createTheme({
    lightColors: {
      primary: primaryColor,
      background: primaryColor,
    },
    darkColors: {
      primary: primaryColor,
      background: primaryColor,
    },
    components: {
      Header: { containerStyle: { backgroundColor: primaryColor } },
      Button: { containerStyle: { backgroundColor: primaryColor } },
    },
  })
}
