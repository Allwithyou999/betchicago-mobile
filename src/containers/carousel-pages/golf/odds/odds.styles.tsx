import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  padding: 20,
  minHeight: '100%',
}

export const oddsTitle: TextStyle = {
  ...Fonts.style.h1,
  width: '100%',
  fontFamily: 'Roboto-Bold',
  marginBottom: 5,
}

export const tableTitle: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: 'bold',
  color: Colors.green,
  marginTop: 28,
  marginBottom: 10,
  width: '100%',
}

export const selectBox: TextStyle = {
  width: '100%',
  marginBottom: 25,
}
