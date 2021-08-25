import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
}

export const leaderboardContents: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 15,
  width: '100%',
}

export const title: TextStyle = {
  ...Fonts.style.h1,
  fontFamily: 'Roboto-Bold',
}

export const status: TextStyle = {
  ...Fonts.style.h6,
}

export const scores: ViewStyle = {
  marginTop: 50,
}
