import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: '#080814',
}

export const container: ViewStyle = {
  flex: 1,
  overflow: 'visible',
}

export const logoCircle: ImageStyle = {
  width: 120,
  height: 120,
  alignSelf: 'center',
  marginTop: 40,
  marginBottom: 20,
}

export const logoText: ImageStyle = {
  width: 180,
  height: 43,
  alignSelf: 'center',
  marginTop: 42,
  marginBottom: 24,
}

export const textDescription: TextStyle = {
  marginHorizontal: 65,
  fontSize: 14,
  color: 'white',
  lineHeight: 21,
  textAlign: 'center',
  letterSpacing: -0.6,
}

export const btnForgot: ViewStyle = {
  marginTop: 30,
  alignSelf: 'center',
}

export const txtForgot: TextStyle = {
  fontSize: 15,
  color: 'white',
}

export const scrollContents: ViewStyle = {
  flex: 1,
  minHeight: '100%',
}

export const closeButton: ViewStyle = {
  marginLeft: 16,
  width: 20,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
}

export const field: ViewStyle = {
  borderBottomColor: '#FFFFFF',
  borderBottomWidth: 1,
  marginTop: 18,
  marginHorizontal: 40,
}

export const label: TextStyle = {
  fontSize: 13,
  color: '#FFFFFF',
}

export const textValue: TextStyle = {
  fontSize: 17,
  color: '#FFFFFF',
  marginTop: 4,
  paddingVertical: 5,
}
