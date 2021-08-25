import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  padding: 20,
}

export const scheduleTourName: TextStyle = {
  ...Fonts.style.h1,
  width: '100%',
  fontFamily: 'Roboto-Bold',
}

export const scheduleSeasonYear: TextStyle = {
  ...Fonts.style.h6,
  width: '100%',
}

export const tableTitle: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: 'bold',
  color: Colors.green,
  marginTop: 28,
  marginBottom: 10,
  width: '100%',
}
