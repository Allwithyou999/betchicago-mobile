import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 40,
}

export const title: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginTop: 40,
  marginHorizontal: 'auto',
}

export const crossTable: ViewStyle = {
  marginTop: 30,
}
