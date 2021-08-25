import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: '100%',
  marginBottom: 40,
}

export const scoreTable: ViewStyle = {
  marginBottom: 10,
}

export const scoreTableHeader: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  marginBottom: 4,
}

export const scoreTableHeaderFirstCell: ViewStyle = {
  width: (100 / 14) * 4 + '%',
  paddingRight: 15,
  alignItems: 'flex-end',
}

export const scoreTableHeaderCell: ViewStyle = {
  width: 100 / 14 + '%',
  alignItems: 'center',
}

export const scoreTableHeaderCellText: TextStyle = {
  fontSize: 10,
  color: Colors.tableHeaderCellColor,
}

export const scoreTableRow: ViewStyle = {
  flexDirection: 'row',
  borderLeftWidth: 4,
  width: '100%',
  height: 30,
}

export const teamTitle: ViewStyle = {
  width: (100 / 14) * 4 + '%',
  paddingLeft: 10,
  paddingRight: 13,
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderRightColor: Colors.scoreTableBorder,
  borderTopColor: Colors.scoreTableBorder,
}

export const teamName: TextStyle = {
  fontSize: 15,
  lineHeight: 30,
}

export const teamML: TextStyle = {
  fontSize: 11,
  lineHeight: 30,
  color: Colors.blue,
}

export const tableCell: ViewStyle = {
  width: 100 / 14 + '%',
  alignItems: 'center',
  borderRightWidth: 1,
  borderTopWidth: 1,
  borderRightColor: Colors.scoreTableBorder,
  borderTopColor: Colors.scoreTableBorder,
}

export const bottom: ViewStyle = {
  borderBottomColor: Colors.scoreTableBorder,
  borderBottomWidth: 1,
}

export const tableActiveCell: ViewStyle = {
  backgroundColor: Colors.tableRowOddColor,
}

export const scoreTableCellText: TextStyle = {
  fontSize: 13,
  lineHeight: 30,
}

export const TextLine: ViewStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
}

export const textInner: ViewStyle = {
  flexDirection: 'row',
}

export const textLabel: ViewStyle = {
  marginRight: 5,
}

export const textValue: ViewStyle = {
  marginRight: 10,
}

export const normalText: TextStyle = {
  ...Fonts.style.h8,
}

export const boldText: TextStyle = {
  ...normalText,
  fontWeight: '600',
}

export const highlightText: TextStyle = {
  ...normalText,
  color: Colors.blue,
}

export const scoreLink: ViewStyle = {
  marginTop: 20,
  flexDirection: 'row',
  justifyContent: 'center',
}

export const scoreLinkText: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: '700',
  textTransform: 'uppercase',
  color: Colors.blue,
}

export const squareBox: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: 14,
  flexWrap: 'wrap',
  transform: [{ rotate: '45deg' }],
  marginTop: 4,
  marginLeft: 6,
}

export const square: ViewStyle = {
  width: 6,
  height: 6,
  marginRight: 1,
  marginBottom: 1,
}

export const dots: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 10,
  marginRight: 10,
  marginTop: 5,
}

export const dot: ViewStyle = {
  borderRadius: 3,
  marginRight: 2,
}
