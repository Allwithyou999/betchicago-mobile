import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: '100%',
}

export const teamBack: ViewStyle = {
  flexDirection: 'row',
}

export const awayBack: ViewStyle = {
  width: '50%',
  overflow: 'hidden',
}

export const awayBackImg: ImageStyle = {
  width: 375,
  height: 50,
}

export const homeBack: ViewStyle = {
  width: '50%',
  overflow: 'hidden',
}

export const homeBackImg: ImageStyle = {
  width: 375,
  height: 50,
  alignSelf: 'flex-end',
}

export const mark: TextStyle = {
  position: 'absolute',
  paddingHorizontal: 10,
  paddingVertical: 4,
  ...Fonts.style.h6,
  fontWeight: 'bold',
  backgroundColor: Colors.white,
  color: Colors.black,
  bottom: 0,
  left: '50%',
  transform: [{ translateX: -20 }],
}
