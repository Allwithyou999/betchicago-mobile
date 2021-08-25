import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts, Metrics } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingVertical: 20,
}

export const nflIcon: ImageStyle = {
  width: 40,
  height: 40,
  alignSelf: 'center',
}

export const nflName: TextStyle = {
  ...Fonts.style.h6,
  marginBottom: 20,
  alignSelf: 'center',
}

export const afcContainer: ViewStyle = {
  marginBottom: 5,
  paddingHorizontal: 20,
}

export const nfcContainer: ViewStyle = {
  marginBottom: 30,
  paddingHorizontal: 20,
}

export const crossTable: ViewStyle = {
  marginBottom: 30,
}
