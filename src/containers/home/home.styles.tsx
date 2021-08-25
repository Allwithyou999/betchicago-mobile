import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '../../themes'
import { IsIPhoneX } from '../../services'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.white,
  width: Metrics.screenWidth,
}

/* Main Carousel Nav bar */
export const indicatorViewPager: ViewStyle = {
  width: Metrics.screenWidth,
  flex: 1,
  flexDirection: 'column-reverse',
  backgroundColor: Colors.white,
  overflow: 'hidden',
}

export const statusBar: ViewStyle = {
  height: IsIPhoneX() ? 44 : 24,
  backgroundColor: Colors.white,
}

export const mainIndicatorContainer: ViewStyle = {
  height: 48,
  backgroundColor: Colors.white,
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey,
  paddingLeft: 10,
  paddingRight: 10,
}

export const mainIndicatorText: TextStyle = {
  fontSize: 14,
  color: Colors.black,
  fontFamily: 'Roboto-Regular',
}

export const mainIndicator: ViewStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  marginLeft: 5,
  marginRight: 10,
}

export const mainIndicatorSelected: ViewStyle = {
  ...mainIndicator,
}

export const mainIndicatorSelectedText: TextStyle = {
  fontSize: 14,
  color: Colors.active,
  fontFamily: 'Roboto-Regular',
}

export const selectedBorderStyleForMain: ViewStyle = {
  borderBottomWidth: 3,
  borderBottomColor: Colors.active,
}

/* Sub Carousel Nav bar */
export const subIndicatorContainer: ViewStyle = {
  height: 43,
  backgroundColor: Colors.lightGrey,
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey,
  paddingLeft: 10,
  paddingRight: 10,
}

export const subIndicatorText: TextStyle = {
  fontSize: 12,
  textTransform: 'uppercase',
  color: Colors.black,
  fontFamily: 'Roboto-Regular',
}

export const subIndicator: ViewStyle = {
  ...mainIndicator,
}

export const subIndicatorSelected: ViewStyle = {
  ...subIndicator,
}

export const subIndicatorSelectedText: TextStyle = {
  fontSize: 12,
  textTransform: 'uppercase',
  color: Colors.active,
  fontFamily: 'Roboto-Regular',
}

export const selectedBorderStyleForSub: ViewStyle = {
  height: 0,
  borderBottomWidth: 0,
}
