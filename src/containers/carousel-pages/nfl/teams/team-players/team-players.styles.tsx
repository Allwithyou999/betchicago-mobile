import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 40,
}

export const section: ViewStyle = {
  width: '100%',
  marginTop: 25,
  marginBottom: 35,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  ...Fonts.style.h6,
  fontFamily: 'Roboto-Medium',
}

export const lineTable: ViewStyle = {
  marginTop: 20,
}
