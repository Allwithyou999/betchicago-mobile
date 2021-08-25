import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-around',
}

export const leftItem: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 20,
}

export const rightItem: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 20,
}

export const subject: TextStyle = {
  width: 73,
  paddingVertical: 3,
  fontSize: 9,
  lineHeight: 14,
  color: Colors.white,
  textTransform: 'uppercase',
  textAlign: 'center',
  marginBottom: 14,
}

export const name: TextStyle = {
  fontSize: 13,
  fontFamily: 'Roboto-Medium',
  textAlign: 'center',
}

export const score: TextStyle = {
  fontFamily: 'Roboto-light',
  textAlign: 'center',
}

export const status: TextStyle = {
  fontSize: 13,
  fontFamily: 'Roboto-light',
  textAlign: 'center',
}
