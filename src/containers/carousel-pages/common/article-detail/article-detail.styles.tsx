import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'
import { IsIPhoneX } from '../../../../services'

export const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.0)',
}

/* Top header */
export const topHeader: ViewStyle = {
  left: 0,
  right: 0,
  width: Metrics.screenWidth,
  height: IsIPhoneX() ? 88 : 68,
  zIndex: 1,
}

export const statusBar: ViewStyle = {
  width: Metrics.screenWidth,
  height: IsIPhoneX() ? 44 : 24,
}

export const closeButton: ViewStyle = {
  top: 6,
  left: 16,
  alignSelf: 'flex-start',
}

export const closeIcon: ViewStyle = {
  shadowColor: Colors.black,
  shadowOpacity: 0.7,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 2 },
}

export const topBanner: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  overflow: 'hidden',
}

export const articleImg: ImageStyle = {
  width: Metrics.screenWidth,
  height: 250,
}

export const articleContent: ViewStyle = {
  top: 182,
  marginBottom: 160,
  backgroundColor: 'rgba(255, 255, 255, 0.0)',
}

export const articleNameBack: ViewStyle = {
  position: 'relative',
  width: '100%',
  paddingVertical: 20,
  paddingHorizontal: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}

export const articleName: TextStyle = {
  position: 'relative',
  fontSize: 30,
  lineHeight: 40,
  fontFamily: 'Roboto-Bold',
  shadowColor: Colors.white,
  shadowOpacity: 0.9,
  shadowRadius: 10,
}

export const articleDate: TextStyle = {
  ...Fonts.style.h8,
  marginTop: 5,
}

export const mainContent: ViewStyle = {
  paddingHorizontal: 20,
  paddingBottom: 40,
}

export const authorInfo: ViewStyle = {
  marginTop: 10,
  marginBottom: 20,
  flexDirection: 'row',
}

export const authorText: ViewStyle = {
  justifyContent: 'center',
  marginLeft: 20,
}

export const textBold: TextStyle = {
  fontFamily: 'Roboto-Bold',
}
