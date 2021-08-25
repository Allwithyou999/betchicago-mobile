import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '@theme'

export const ROOT: ViewStyle = {
  width: 50,
  alignItems: 'center',
  opacity: 0.5,
}

export const active: ViewStyle = {
  opacity: 1,
}

export const month: TextStyle = {
  fontSize: 10,
  lineHeight: 13,
  textTransform: 'uppercase',
  fontFamily: 'Roboto-Medium',
  color: Colors.white,
}

export const day: TextStyle = {
  fontSize: 29,
  fontFamily: 'Roboto-Bold',
  color: Colors.white,
}

export const week: TextStyle = {
  ...month,
}
