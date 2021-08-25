import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const tableHeaderRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: Colors.dividerColor,
  marginBottom: 8,
  paddingHorizontal: 5,
}

export const headerCellText: TextStyle = {
  fontSize: 11,
  textTransform: 'uppercase',
  fontWeight: '200',
  paddingVertical: 3,
  color: '#111111',
}

export const tableRow: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  paddingHorizontal: 5,
}

export const cell: ViewStyle = {
  justifyContent: 'center',
}

export const cellText: TextStyle = {
  fontSize: 14,
}
