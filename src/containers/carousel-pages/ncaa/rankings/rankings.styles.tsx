import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  paddingVertical: 20,
}

export const topHeader: ViewStyle = {
  paddingVertical: 5,
  paddingHorizontal: 25,
}

export const pagetitle: TextStyle = {
  fontWeight: 'bold',
  fontSize: 14,
  textTransform: 'uppercase',
}

export const lastUpdate: TextStyle = {
  color: Colors.selectBoxTextColor,
  fontSize: 12,
  marginTop: 5,
}

export const rankingsTable: ViewStyle = {
  marginTop: 0,
  marginHorizontal: 25,
  paddingBottom: 20,
}
