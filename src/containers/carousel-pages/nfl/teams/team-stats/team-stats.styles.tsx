import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
}

export const scrollContents: ViewStyle = {
  position: 'relative',
  alignItems: 'center',
  paddingBottom: 40,
}

export const sectionHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const section: ViewStyle = {
  flex: 1,
  width: '100%',
  marginTop: 25,
  marginBottom: 35,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  ...Fonts.style.h6,
  fontFamily: 'Roboto-Medium',
}

export const switchButtonText: TextStyle = {
  color: Colors.blue,
}

export const lineTable: ViewStyle = {
  marginTop: 20,
}

export const statsTable: ViewStyle = {
  marginTop: 20,
}
