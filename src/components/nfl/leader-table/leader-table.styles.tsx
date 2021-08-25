import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts } from '@theme'
import { DoCalc } from '../../../services'

export const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const tableContainer: ViewStyle = {
  marginBottom: 20,
}

export const tabelHeaderRow: ViewStyle = {
  flexDirection: 'row',
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
  marginBottom: 4,
}

export const headerCellTitle: ViewStyle = {
  width: '80%',
}

export const headerCellYTD: ViewStyle = {
  width: '20%',
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

export const alignRight: TextStyle = {
  textAlign: 'right',
}

export const mainTable: ViewStyle = {
  flexDirection: 'row',
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
}

export const avatarImg: ImageStyle = {
  marginTop: 5,
  width: 100,
  height: 100,
}

export const tableContent: ViewStyle = {
  width: DoCalc(100, '-', 140),
  marginLeft: 10,
}

export const tableRow: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  paddingVertical: 6,
  paddingLeft: 5,
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
}

export const noBorder: ViewStyle = {
  borderBottomWidth: 0,
}

export const cellFirst: ViewStyle = {
  width: '20%',
  justifyContent: 'flex-start',
}

export const cellSecond: ViewStyle = {
  width: '60%',
  justifyContent: 'flex-start',
}

export const cellThird: ViewStyle = {
  width: '20%',
  justifyContent: 'flex-end',
}

export const cellFirstText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Light',
}

export const cellSecondText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Light',
  color: Colors.blue,
}

export const cellThirdText: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Light',
  textAlign: 'right',
}

export const boldText: TextStyle = {
  fontFamily: 'Roboto-Medium',
}

export const completeList: ViewStyle = {
  marginTop: 20,
}

export const completeListText: TextStyle = {
  fontSize: 13,
  color: Colors.blue,
  alignSelf: 'center',
  textTransform: 'uppercase',
}
