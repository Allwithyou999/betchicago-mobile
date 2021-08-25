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
  paddingBottom: 104,
}

export const pageSubject: TextStyle = {
  fontSize: 17,
  fontWeight: 'bold',
  color: '#111111',
  marginTop: 25,
  paddingLeft: 25,
}

export const form: ViewStyle = {
  marginBottom: 115,
  marginTop: 5,
}

export const field: ViewStyle = {
  borderBottomColor: '#CDCDCD',
  borderBottomWidth: 1,
  marginTop: 18,
  paddingHorizontal: 25,
}

export const label: TextStyle = {
  fontSize: 13,
  color: '#878787',
}

export const textValue: TextStyle = {
  fontSize: 17,
  color: '#111111',
  marginTop: 4,
  paddingVertical: 5,
}

export const noBorder: TextStyle = {
  borderBottomWidth: 0,
}

export const italicText: TextStyle = {
  fontStyle: 'italic',
}
