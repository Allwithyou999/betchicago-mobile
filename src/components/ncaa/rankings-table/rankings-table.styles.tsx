import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'
import { DoCalc } from '../../../services'

export const ROOT: ViewStyle = {}

export const tableRow: ViewStyle = {
  marginBottom: 24,
}

export const lineWrapper: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const orderNumber: TextStyle = {
  fontSize: 14,
  color: '#111111',
}

export const teamIcon: ImageStyle = {
  position: 'relative',
  width: 29,
  height: 29,
  marginLeft: 15,
}

export const teamName: TextStyle = {
  fontSize: 17,
  color: '#111111',
  fontWeight: '600',
  marginLeft: 5,
}

export const wlText: TextStyle = {
  fontSize: 14,
  color: '#959595',
  marginLeft: 10,
}

export const nextLable: TextStyle = {
  fontSize: 13,
  color: '#111111',
  fontWeight: 'bold',
  marginLeft: 26,
}

export const nextTeam: TextStyle = {
  fontSize: 13,
  color: '#0064C7',
}

export const time: TextStyle = {
  fontSize: 13,
  color: '#111111',
  marginLeft: 26,
}
