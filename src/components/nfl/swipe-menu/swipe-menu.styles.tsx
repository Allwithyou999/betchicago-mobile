import { ViewStyle, TextStyle } from 'react-native'

export const ROOT: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: 55,
  backgroundColor: 'black',
  paddingVertical: 10,
}

export const scrollContent: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const menuItem: ViewStyle = {
  marginHorizontal: 17,
  alignSelf: 'center',
  justifyContent: 'center',
}

export const menuItemText: TextStyle = {
  paddingVertical: 10,
  fontSize: 12,
  textTransform: 'uppercase',
  fontFamily: 'Roboto-Regular',
  color: 'white',
  opacity: 0.7,
}

export const menuItemText1: TextStyle = {
  fontSize: 12,
  fontFamily: 'Roboto-Regular',
  textTransform: 'uppercase',
  color: 'white',
  opacity: 0.7,
  textAlign: 'center',
}

export const menuItemText2: TextStyle = {
  fontSize: 10,
  textTransform: 'uppercase',
  color: 'white',
  opacity: 0.7,
  textAlign: 'center',
  marginTop: 2,
}

export const active: TextStyle = {
  opacity: 1,
  fontSize: 13,
  fontFamily: 'Roboto-Bold',
}

export const active2: TextStyle = {
  opacity: 1,
}
