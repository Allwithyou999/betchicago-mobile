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

export const btnRegister: ViewStyle = {
  width: 220,
  height: 50,
  marginTop: 65,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.active,
}

export const txtRegister: TextStyle = {
  fontSize: 17,
  color: 'white',
}

export const btnLogin: ViewStyle = {
  marginTop: 30,
  alignSelf: 'center',
}

export const txtLogin: TextStyle = {
  fontSize: 17,
  color: 'white',
}

export const bottomArea: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: 40,
}

export const txtBottom: TextStyle = {
  fontSize: 14,
  color: '#878787',
}

export const btnBack: ViewStyle = {}

export const scrollContents: ViewStyle = {
  minHeight: '100%',
}

export const closeButton: ViewStyle = {
  marginLeft: 16,
  width: 20,
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
}

export const divider: ViewStyle = {
  borderTopColor: '#DEDEDE',
  borderTopWidth: 1,
  height: 11,
}
