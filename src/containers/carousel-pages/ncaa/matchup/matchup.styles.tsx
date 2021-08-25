import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'
import { IsIPhoneX } from '../../../../services'

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
  backgroundColor: Colors.popupHeaderColor,
  alignItems: 'center',
  zIndex: 9,
  overflow: 'hidden',
}

export const bannerTeams: ViewStyle = {
  alignItems: 'center',
  width: Metrics.screenWidth,
  marginTop: 10,
}

export const bannerRow: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 20,
  paddingVertical: 5,
}

export const inlineRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  maxWidth: '85%',
}

export const teamLogo: ImageStyle = {
  width: 46,
  height: 46,
}

export const teamName: TextStyle = {
  color: Colors.white,
  fontSize: 20,
  fontWeight: '600',
  marginLeft: 8,
  marginRight: 8,
  flexWrap: 'wrap',
}

export const teamStatus: TextStyle = {
  color: '#707070',
  fontSize: 14,
  marginLeft: 16,
}

export const teamScore: TextStyle = {
  color: Colors.white,
  fontSize: 14,
  fontWeight: 'bold',
}

export const teamDate: TextStyle = {
  color: '#707070',
  fontSize: 14,
  fontWeight: '600',
  marginTop: 15,
}

/* Scroll content */
export const mainContent: ViewStyle = {
  position: 'relative',
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
  flex: 1,
}

export const scrollContents: ViewStyle = {
  paddingBottom: 40,
}

export const stackupTable: ViewStyle = {
  marginTop: 10,
  marginBottom: 30,
  paddingHorizontal: 20,
}

export const block: ViewStyle = {
  padding: 20,
}

export const blockHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 10,
}

export const headerLogo: ImageStyle = {
  width: 24,
  height: 24,
  marginRight: 15,
}

export const headerTitle: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
}

export const footer: ViewStyle = {
  width: '100%',
}

export const footerLabel: TextStyle = {
  fontSize: 10,
}

/* Carousel */
export const lineTable: ViewStyle = {
  marginBottom: 30,
}

export const tableSlider: ViewStyle = {
  overflow: 'hidden',
}

export const tableSliderItem: ViewStyle = {
  position: 'relative',
  marginBottom: 30,
}

export const dotStyle: ViewStyle = {
  backgroundColor: Colors.dotColor,
  width: 6,
  height: 6,
  borderRadius: 6,
}

export const selectedDotStyle: ViewStyle = {
  backgroundColor: Colors.activeDotColor,
  width: 7,
  height: 7,
  borderRadius: 7,
}

export const tableLoading: ViewStyle = {
  marginTop: -60,
}

export const scoreLeaders: ViewStyle = {
  marginTop: 10,
}

export const scoreLeaderN: TextStyle = {
  fontSize: 12,
  color: '#959595',
  marginBottom: 3,
}

export const blurText: TextStyle = {
  fontSize: 14,
  color: '#959595',
  fontWeight: 'normal',
}

/* Error */
export const errorView: ViewStyle = {
  width: Metrics.screenWidth,
  alignItems: 'center',
  paddingTop: 10,
}

export const errorText: TextStyle = {
  fontSize: 20,
}
