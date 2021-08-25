import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  width: '100%',
  marginBottom: 5,
}

export const subject: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  fontWeight: '500',
  textTransform: 'uppercase',
  width: '100%',
  color: 'white',
  paddingVertical: 8,
  paddingHorizontal: 5,
}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  paddingHorizontal: 10,
}

export const tableHeaderRow: TextStyle = {
  backgroundColor: Colors.tableRowOddColor,
  marginBottom: 4,
}

export const headerCell: TextStyle = {
  fontSize: 9,
  lineHeight: 11,
  color: Colors.tableHeaderCellColor,
  paddingVertical: 5,
  textTransform: 'uppercase',
  fontWeight: '200',
  textAlign: 'center',
}

export const cell: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
  textAlign: 'center',
  paddingVertical: 8,
}
