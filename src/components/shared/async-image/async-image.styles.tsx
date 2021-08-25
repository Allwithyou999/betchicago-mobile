import { ViewStyle } from 'react-native'
import { Colors } from '@theme'

export const ROOT: ViewStyle = {
  position: 'relative',
}

export const overlayView: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.lightGrey,
}
