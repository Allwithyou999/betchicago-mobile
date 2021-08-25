import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  width: '100%',
  borderBottomWidth: 1,
  borderColor: '#CDCDCD',
}

export const tabelHeaderRow: ViewStyle = {
  flexDirection: 'row',
  borderColor: '#CDCDCD',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  paddingHorizontal: 2,
}

export const headerCellText: TextStyle = {
  fontSize: 11,
  paddingTop: 7,
  paddingBottom: 7,
  color: '#959595',
}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: 2,
}

export const cell: ViewStyle = {
  paddingVertical: 5,
  justifyContent: 'center',
}

export const cellText: TextStyle = {
  fontSize: 14,
}

export const leftBorder: ViewStyle = {
  borderLeftColor: '#CDCDCD',
  borderLeftWidth: 1,
}
