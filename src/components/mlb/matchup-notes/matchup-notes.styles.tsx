import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {}

export const injuriesLabel: ViewStyle = {
  marginRight: 'auto',
  borderBottomWidth: 1,
  borderBottomColor: Colors.blue,
  marginBottom: 10,
}

export const injuriesText: TextStyle = {
  lineHeight: 20,
  fontSize: 11,
  color: '#111111',
}

export const injuriesLabelText: TextStyle = {
  lineHeight: 14,
  fontSize: 11,
  color: '#111111',
  fontWeight: '500',
}

export const bold: TextStyle = {
  fontWeight: 'bold',
}
