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
  marginTop: 15,
  marginBottom: 10,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Medium',
}

export const gameCard: ViewStyle = {
  marginTop: 5,
}
