import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 40,
}

export const indicatorViewPager: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  paddingBottom: 45,
}

export const section: ViewStyle = {
  width: '100%',
  marginTop: 25,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  ...Fonts.style.h6,
  fontFamily: 'Roboto-Medium',
}

export const lineTable: ViewStyle = {
  marginTop: 20,
}

export const introduction: TextStyle = {
  fontSize: 10,
  lineHeight: 18,
  fontWeight: '100',
}

export const dotStyle: ViewStyle = {
  width: 7,
  height: 7,
  backgroundColor: '#CDCDCD',
}

export const selectedDotStyle: ViewStyle = {
  backgroundColor: Colors.black,
}
