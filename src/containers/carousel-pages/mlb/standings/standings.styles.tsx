import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
}

export const standingsContents: ViewStyle = {
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

export const tableHolder: ViewStyle = {
  marginBottom: 20,
}

export const leagueName: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: 'bold',
  color: Colors.blue,
  marginTop: 28,
  marginBottom: 10,
}

export const teamInfo: ViewStyle = {
  flexDirection: 'row',
  padding: 5,
  alignItems: 'center',
}

export const teamIcon: ImageStyle = {
  width: 24,
  height: 24,
}

export const teamName: TextStyle = {
  marginLeft: 15,
  color: Colors.blue,
  fontSize: 15,
  lineHeight: 18,
}
