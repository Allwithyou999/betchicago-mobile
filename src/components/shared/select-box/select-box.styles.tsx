import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '@theme'

export const boxContainer: ViewStyle = {
  display: 'flex',
  width: '100%',
  borderColor: Colors.dividerColor,
  borderWidth: 1,
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 14,
  paddingRight: 14,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const boxText: TextStyle = {
  fontSize: 14,
  lineHeight: 16,
  fontFamily: 'Arial',
  color: Colors.selectBoxTextColor,
}

export const downArrow: ViewStyle = {}
