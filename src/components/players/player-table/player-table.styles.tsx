import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  width: '100%',
}

export const table: ViewStyle = {}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: 2,
}

export const tableRowOdd: ViewStyle = {
  backgroundColor: Colors.tableRowOddColor,
}

export const tableHeaderRow: ViewStyle = {
  backgroundColor: Colors.white,
  marginBottom: 4,
  borderTopColor: Colors.dividerColor,
  borderTopWidth: 1,
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
}

export const tableColorHeaderRow: ViewStyle = {
  backgroundColor: Colors.headerCellBg,
}

export const headerCell: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  color: Colors.tableHeaderCellColor,
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 5,
  paddingRight: 5,
  textTransform: 'uppercase',
  fontWeight: '200',
}

export const cell: TextStyle = {
  ...Fonts.style.h6,
  fontWeight: '100',
  paddingVertical: 10,
  paddingLeft: 2,
  paddingRight: 2,
  overflow: 'hidden',
}

export const smallCell: TextStyle = {
  ...Fonts.style.h8,
}

export const cellView: TextStyle = {
  ...cell,
}

export const cellActive: TextStyle = {
  color: Colors.blue,
  fontWeight: '800',
}

export const cellViewActive: TextStyle = {
  ...cellActive,
}

export const withIconCell: TextStyle = {
  paddingHorizontal: 5,
  paddingVertical: 2,
}

export const withIconCellView: TextStyle = {
  ...withIconCell,
}
