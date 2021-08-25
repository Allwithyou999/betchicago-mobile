import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '@theme'

export const ROOT: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: Colors.blue,
}

export const leftArrow: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  marginLeft: 7,
  marginRight: 7,
}

export const calendar: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
}

export const rightArrow: ViewStyle = {
  ...leftArrow,
}
