import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../themes'
import { IsIPhoneX } from '../../services'

export const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: Colors.white,
}

export const statusBar: ViewStyle = {
  height: IsIPhoneX() ? 44 : 24,
  backgroundColor: Colors.white,
}

export const warningText: TextStyle = {
  textAlign: 'center',
  fontSize: 29,
  lineHeight: 35,
  fontFamily: 'Roboto-Bold',
  marginBottom: 15,
  paddingVertical: 100,
  paddingHorizontal: 30,
}
