import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'
import { IsIPhoneX } from '../../../services'

export const ROOT: ViewStyle = {
  backgroundColor: '#F2F2F2',
  minHeight: '100%',
}

export const statusBar: ViewStyle = {
  height: IsIPhoneX() ? 44 : 24,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  paddingHorizontal: 25,
  paddingTop: 25,
  paddingBottom: 144,
}

export const pageSubject: TextStyle = {
  fontSize: 17,
  fontWeight: 'bold',
  color: '#111111',
}

export const pageDesc: TextStyle = {
  fontSize: 13,
  lineHeight: 18,
  color: '#111111',
  paddingTop: 25,
}

export const boldText: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#111111',
  paddingTop: 25,
}

export const boldSmallText: TextStyle = {
  fontSize: 13,
  fontWeight: 'bold',
  color: '#111111',
  paddingTop: 25,
  fontStyle: 'italic',
}
