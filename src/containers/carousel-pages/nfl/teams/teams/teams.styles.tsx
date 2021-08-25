import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../../themes'
import { IsIPhoneX } from '../../../../../services'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
}

export const statusBar: ViewStyle = {
  width: Metrics.screenWidth,
  height: IsIPhoneX() ? 44 : 24,
  backgroundColor: Colors.white,
}

/* Top header */
export const topHeader: ViewStyle = {
  left: 0,
  right: 0,
  width: Metrics.screenWidth,
  height: 44,
  paddingHorizontal: 16,
  flexDirection: 'row',
  zIndex: 1,
  backgroundColor: Colors.popupHeaderColor,
}

export const closeButton: ViewStyle = {
  position: 'absolute',
  left: 16,
  alignSelf: 'center',
}

export const favouriteButton: ViewStyle = {
  position: 'absolute',
  right: 55,
  alignSelf: 'center',
}

export const notificationButton: ViewStyle = {
  position: 'absolute',
  right: 16,
  alignSelf: 'center',
}

/* Top banner */
export const topBanner: ViewStyle = {
  width: Metrics.screenWidth,
  alignItems: 'center',
  backgroundColor: Colors.popupHeaderColor,
  zIndex: 9,
}

export const teamLogo: ImageStyle = {
  width: 50,
  height: 50,
  marginTop: -20,
}

export const teamName: TextStyle = {
  color: Colors.white,
  textTransform: 'uppercase',
  ...Fonts.style.h6,
  marginTop: 20,
}

export const teamScore: TextStyle = {
  color: Colors.white,
  textAlign: 'center',
  marginTop: 5,
}

/* Carousel Nav bar */
export const indicatorViewPager: ViewStyle = {
  flex: 1,
  flexDirection: 'column-reverse',
  backgroundColor: Colors.white,
  overflow: 'hidden',
}

export const mainIndicatorContainer: ViewStyle = {
  backgroundColor: Colors.popupHeaderColor,
  height: 48,
  paddingLeft: 10,
  paddingRight: 10,
}

export const mainIndicatorText: TextStyle = {
  fontSize: 14,
  color: Colors.selectBoxTextColor,
  fontFamily: 'Roboto-Bold',
}

export const mainIndicator: ViewStyle = {
  paddingLeft: 5,
  paddingRight: 5,
  marginLeft: 10,
  marginRight: 10,
}

export const mainIndicatorSelected: ViewStyle = {
  ...mainIndicator,
}

export const mainIndicatorSelectedText: TextStyle = {
  fontSize: 14,
  color: Colors.white,
  fontFamily: 'Roboto-Bold',
}

export const selectedBorderStyleForMain: ViewStyle = {
  borderBottomWidth: 4,
  borderBottomColor: Colors.active,
}

/* Error */
export const errorView: ViewStyle = {
  width: Metrics.screenWidth,
  alignItems: 'center',
  paddingTop: 50,
}

export const errorText: TextStyle = {
  fontSize: 20,
}

export const loadingContainer: ViewStyle = {
  position: 'relative',
  flex: 1,
}
