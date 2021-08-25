import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const titleContainer: ViewStyle = {
  width: '100%',
  padding: 20,
  backgroundColor: Colors.green,
  display: 'flex',
  flexDirection: 'row',
}

export const leftSection: ViewStyle = {
  flex: 1,
}

export const title: TextStyle = {
  ...Fonts.style.h2,
  marginBottom: 8,
  color: Colors.white,
  fontFamily: 'Roboto-Bold',
}

export const location: TextStyle = {
  fontSize: 15,
  lineHeight: 18,
  opacity: 0.9,
  marginBottom: 3,
  color: Colors.white,
  fontFamily: 'Roboto-Regular',
}

export const rightSection: ViewStyle = {
  width: 30,
}
