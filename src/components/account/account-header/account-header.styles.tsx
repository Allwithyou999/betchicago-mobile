import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const ROOT: ViewStyle = {
  position: 'relative',
  width: '100%',
  height: 44,
  backgroundColor: Colors.white,
  borderBottomColor: '#DEDEDE',
  borderBottomWidth: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
}

export const leftButton: ViewStyle = {
  position: 'relative',
  left: 0,
  top: 0,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}

export const rightButton: ViewStyle = {
  position: 'relative',
  backgroundColor: Colors.active,
  paddingHorizontal: 17,
  paddingVertical: 6,
  borderRadius: 5,
}

export const buttonText: TextStyle = {
  color: Colors.white,
  fontSize: 13,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}
