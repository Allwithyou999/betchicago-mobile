import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
}

export const loadMoreView: ViewStyle = {
  marginTop: 30,
  marginBottom: 70,
}
