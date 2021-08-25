import { ViewStyle } from 'react-native'

export const content: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 1,
  backgroundColor: 'rgb(241,90,36)',
}

export const topContent: ViewStyle = {
  ...content,
  top: 0,
}

export const bottomContent: ViewStyle = {
  ...content,
  bottom: 0,
}
