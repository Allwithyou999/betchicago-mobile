import { ViewStyle } from 'react-native'
import { Colors } from '@theme'

export const ROOT: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const overlay: ViewStyle = {
  zIndex: 999999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.overlayColor,
  width: '100%',
  height: '100%',
}
