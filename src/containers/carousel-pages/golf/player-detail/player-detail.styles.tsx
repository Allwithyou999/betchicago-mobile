import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'
import { IsIPhoneX } from '../../../../services'

export const ROOT: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {}

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

export const mainContent: ViewStyle = {
  position: 'relative',
  flex: 1,
}

export const section: ViewStyle = {
  marginTop: 25,
  marginBottom: 30,
  paddingHorizontal: 20,
}

export const tableStyle: ViewStyle = {
  marginBottom: 10,
}

export const title: TextStyle = {
  paddingLeft: 20,
  paddingTop: 30,
  ...Fonts.style.h4,
  fontFamily: 'Roboto-light',
}

export const bold: TextStyle = {
  fontFamily: 'Roboto-Bold',
}

export const sectionTitle: TextStyle = {
  ...Fonts.style.h8,
  color: Colors.green,
  textTransform: 'uppercase',
  marginTop: 5,
  marginBottom: 10,
  fontFamily: 'Roboto-Bold',
}

export const subSectionTitle: TextStyle = {
  ...Fonts.style.h8,
  marginBottom: 10,
}
