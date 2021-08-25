import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../../../themes'
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
  marginLeft: 10,
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

export const oddsLabel: TextStyle = {
  color: '#707070',
}

/* Scroll content */
export const mainContent: ViewStyle = {
  position: 'relative',
  width: Metrics.screenWidth,
  backgroundColor: Colors.pageBackground,
  flex: 1,
}

export const scrollContents: ViewStyle = {
  paddingBottom: 40,
}

export const fullOddsButton: ViewStyle = {
  width: '100%',
  height: 65,
  backgroundColor: Colors.white,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey,
}

export const fullOddsText: TextStyle = {
  fontSize: 15,
  fontWeight: 'bold',
  color: Colors.blue,
}

export const downArrow: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 14,
}

export const contentBlock: ViewStyle = {
  position: 'relative',
  width: '100%',
  marginTop: 12,
  backgroundColor: Colors.white,
  padding: 20,
  paddingBottom: 30,
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderTopColor: Colors.grey,
  borderBottomColor: Colors.grey,
}

export const blockTitle: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  color: Colors.black,
  marginTop: 15,
  marginBottom: 30,
}

export const blockDesc: TextStyle = {
  fontSize: 13,
  fontWeight: '300',
  marginTop: 5,
  marginBottom: 30,
}

export const teamInfo: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
  marginBottom: 20,
}

export const teamIcon: ImageStyle = {
  width: 40,
  height: 40,
}

export const teamFullName: TextStyle = {
  fontSize: 19,
  color: '#111111',
  marginLeft: 9,
}

export const oddsLink: TextStyle = {
  fontSize: 13,
  color: Colors.blue,
  textDecorationLine: 'underline',
}

export const tableText: TextStyle = {
  fontSize: 13,
  lineHeight: 15,
  fontFamily: 'Roboto-light',
}

export const blackText: TextStyle = {
  color: '#111111',
  fontSize: 13,
  textAlign: 'center',
}

export const blueText: TextStyle = {
  color: Colors.blue,
  fontSize: 13,
  lineHeight: 15,
}

export const bold: TextStyle = {
  fontWeight: 'bold',
}

export const teamsInfoView: ViewStyle = {
  position: 'relative',
  width: '100%',
  backgroundColor: Colors.white,
  padding: 20,
  paddingBottom: 20,
  borderBottomWidth: 1,
  borderBottomColor: Colors.grey,
}

export const teamsDetail: ViewStyle = {
  marginTop: 30,
}

export const teamTable: ViewStyle = {
  marginTop: 30,
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
