import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
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
  width: '100%',
}

export const cell: ViewStyle = {
  justifyContent: 'center',
}

export const cellText: TextStyle = {
  ...Fonts.style.h6,
}

export const dateText: TextStyle = {
  fontSize: 11,
  lineHeight: 14,
  marginTop: 10,
  marginBottom: 10,
}

export const gameCard: ViewStyle = {
  marginBottom: 30,
}
