import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'flex-start',
  minHeight: '100%',
}

export const leaderboardContents: ViewStyle = {
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 15,
  paddingRight: 15,
  width: '100%',
}

export const title: TextStyle = {
  ...Fonts.style.h1,
  fontFamily: 'Roboto-Bold',
}

export const statusButtons: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
  marginBottom: 28,
}

export const status: TextStyle = {
  ...Fonts.style.h6,
}

export const linkDivider: TextStyle = {
  borderRightWidth: 1,
  borderRightColor: '#707070',
  marginLeft: 12,
  marginRight: 12,
}

export const active: TextStyle = {
  color: Colors.blue,
}

export const errorMsg: TextStyle = {
  marginTop: 20,
}
