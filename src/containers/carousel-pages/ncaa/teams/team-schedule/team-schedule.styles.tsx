import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 40,
}

export const section: ViewStyle = {
  width: '100%',
  marginTop: 22,
  marginBottom: 5,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Medium',
}

export const lineTable: ViewStyle = {
  marginTop: 15,
}

export const boldText: TextStyle = {
  fontWeight: 'bold',
}

export const introduction: TextStyle = {
  fontSize: 10,
  lineHeight: 18,
  fontWeight: '100',
}
