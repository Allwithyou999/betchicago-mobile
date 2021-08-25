import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const tabelHeaderRow: ViewStyle = {
  flexDirection: 'row',
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
  marginBottom: 4,
}

export const headerCellText: TextStyle = {
  textTransform: 'uppercase',
  fontFamily: 'Roboto-Bold',
  fontSize: 11,
  lineHeight: 14,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 5,
  paddingRight: 5,
}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 44,
  paddingLeft: 5,
}

export const tableRowOdd: ViewStyle = {
  backgroundColor: Colors.tableRowOddColor,
}

export const cell: ViewStyle = {
  justifyContent: 'center',
}

export const cellText: TextStyle = {
  ...Fonts.style.h6,
}

export const teamName: ViewStyle = {
  width: '100%',
}
