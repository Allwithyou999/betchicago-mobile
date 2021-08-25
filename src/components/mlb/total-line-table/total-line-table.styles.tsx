import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  width: '100%',
  marginBottom: 20,
}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}

export const tableHeaderRow: TextStyle = {
  marginBottom: 4,
}

export const headerCell: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  color: Colors.white,
  paddingVertical: 7,
  paddingHorizontal: 5,
  textTransform: 'uppercase',
}

export const cell: TextStyle = {
  fontSize: 13,
  lineHeight: 15,
  paddingVertical: 9,
  paddingLeft: 3,
  fontFamily: 'Roboto-light',
}

export const tableRowOdd: ViewStyle = {
  backgroundColor: Colors.tableRowOddColor,
}

export const totalRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  borderTopWidth: 1,
  borderTopColor: Colors.black,
}

export const footerCell: TextStyle = {
  fontSize: 13,
  lineHeight: 15,
  paddingVertical: 9,
  paddingLeft: 3,
  fontFamily: 'Roboto-Bold',
  color: Colors.black,
}
