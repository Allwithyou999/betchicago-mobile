import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const closeButton: ViewStyle = {
  width: 65,
  height: 28,
  marginLeft: 25,
}

export const navText: TextStyle = {
  flex: 1,
  fontSize: 17,
  color: 'white',
  textAlign: 'center',
}

export const btnRegister: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 65,
  height: 28,
  marginRight: 20,
  borderRadius: 8,
  backgroundColor: Colors.active,
}

export const btnText: TextStyle = {
  fontSize: 13,
  fontWeight: 'bold',
  color: Colors.white,
}

export const formArea: ViewStyle = {
  flex: 1,
  backgroundColor: Colors.white,
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

export const btnLogin: ViewStyle = {
  width: 220,
  height: 50,
  marginTop: 65,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F15A24',
}

export const txtLogin: TextStyle = {
  fontSize: 17,
  color: 'white',
}

export const btnForgot: ViewStyle = {
  marginTop: 30,
  alignSelf: 'center',
}

export const txtForgot: TextStyle = {
  fontSize: 15,
  color: 'white',
}

export const bottomArea: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: 40,
}

export const field: ViewStyle = {
  marginTop: 50,
}

export const label: TextStyle = {
  fontSize: 13,
  color: '#111111',
  fontWeight: 'bold',
}

export const textValue: TextStyle = {
  fontSize: 17,
  color: '#111111',
  marginTop: 4,
  paddingVertical: 5,
}
