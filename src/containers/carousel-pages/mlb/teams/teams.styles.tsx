import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'
import { IsIPhoneX } from '../../../../services'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
  flex: 1,
}

export const scrollContents: ViewStyle = {
  minHeight: '100%',
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

/* top Banner */
export const topBanner: ViewStyle = {
  position: 'relative',
  height: 50,
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
}

export const bannerImg: ImageStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
}

export const title: TextStyle = {
  paddingRight: 50,
  fontSize: 18,
  textAlign: 'right',
  fontWeight: 'bold',
  color: 'white',
}

export const mainContent: ViewStyle = {
  position: 'relative',
  width: Metrics.screenWidth,
  flex: 1,
}

export const bold: TextStyle = {
  fontFamily: 'Roboto-Bold',
}
