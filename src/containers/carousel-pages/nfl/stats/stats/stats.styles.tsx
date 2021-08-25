import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const statsNavBar: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  height: 54,
  backgroundColor: Colors.popupHeaderColor,
}

export const navBarButton: ViewStyle = {
  width: '50%',
}

export const navBarText: TextStyle = {
  width: '100%',
  paddingTop: 20,
  color: Colors.white,
  ...Fonts.style.h8,
  textTransform: 'uppercase',
  textAlign: 'center',
}

export const boldText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Bold',
}
