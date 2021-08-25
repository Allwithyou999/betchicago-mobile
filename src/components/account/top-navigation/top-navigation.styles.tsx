import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const ROOT: ViewStyle = {
  width: '100%',
  height: 44,
  backgroundColor: Colors.white,
  borderBottomColor: '#DEDEDE',
  borderBottomWidth: 1,
}

export const leftButton: ViewStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: 40,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}

export const title: TextStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingHorizontal: 50,
  paddingVertical: 12,
  fontSize: 17,
  color: '#111111',
  textAlign: 'center',
}
