import { ViewStyle, ImageStyle } from 'react-native'
import { Colors } from '@theme'

export const ROOT: ViewStyle = {
  width: 48,
  height: 48,
  borderRadius: 24,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.selectBoxTextColor,
}

export const image: ImageStyle = {
  width: '100%',
  height: '100%',
}
