import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors } from '@theme'

export const ROOT: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 20,
}

export const articleImg: ImageStyle = {
  flex: 1,
  width: 100,
  height: 75,
}

export const articleRight: ViewStyle = {
  flex: 1,
  paddingLeft: 15,
}

export const articleTitle: TextStyle = {
  fontSize: 17,
  marginBottom: 10,
  fontFamily: 'Roboto-Bold',
}

export const articleTags: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  fontWeight: '400',
  marginBottom: 15,
}

export const seperateSymbol: TextStyle = {
  position: 'relative',
  fontWeight: 'bold',
  color: Colors.black,
}

export const capitalFont: TextStyle = {
  textTransform: 'capitalize',
}
