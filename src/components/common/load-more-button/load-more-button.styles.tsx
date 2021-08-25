import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '@theme'

export const ROOT: ViewStyle = {
  display: 'flex',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderColor: Colors.linkDividerColor,
  borderWidth: 1,
  backgroundColor: Colors.lightGrey,
}

export const buttonName: TextStyle = {
  fontSize: 12,
}
