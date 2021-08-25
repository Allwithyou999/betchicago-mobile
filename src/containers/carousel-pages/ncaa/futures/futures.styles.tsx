import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../themes'

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

export const futuresTable: ViewStyle = {
  marginTop: 5,
  marginHorizontal: 10,
  paddingBottom: 10,
  borderBottomWidth: 2,
  borderBottomColor: Colors.dividerColor,
}

export const introduction: TextStyle = {
  fontSize: 12,
  color: '#959595',
  margin: 20,
}
