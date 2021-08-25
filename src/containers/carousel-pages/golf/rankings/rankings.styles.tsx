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

export const rankingName: TextStyle = {
  ...Fonts.style.h1,
  width: '100%',
  fontFamily: 'Roboto-Bold',
}

export const rankingUpdate: TextStyle = {
  ...Fonts.style.h6,
  width: '100%',
  marginBottom: 28,
}
