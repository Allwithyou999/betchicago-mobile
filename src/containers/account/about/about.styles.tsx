import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'
import { IsIPhoneX } from '../../../services'

export const ROOT: ViewStyle = {
  backgroundColor: '#F2F2F2',
}

export const statusBar: ViewStyle = {
  height: IsIPhoneX() ? 44 : 24,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  paddingBottom: 104,
}

export const topBanner: ViewStyle = {
  position: 'relative',
  paddingHorizontal: 26,
  paddingVertical: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

export const subject: TextStyle = {
  fontSize: 32,
  color: '#111111',
}

export const bold: TextStyle = {
  fontWeight: 'bold',
}

export const desc: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
  color: '#111111',
  textAlign: 'center',
  marginTop: 20,
}

export const rowItem: ViewStyle = {
  height: 44,
  backgroundColor: Colors.white,
  paddingHorizontal: 16,
  display: 'flex',
  justifyContent: 'center',
  borderBottomColor: '#C8C7CC',
  borderBottomWidth: 0.5,
}

export const rowText: TextStyle = {
  fontSize: 17,
  color: Colors.black,
  fontWeight: '400',
}

export const arrowRight: ViewStyle = {
  position: 'absolute',
  right: 5,
  top: 13,
  width: 20,
  height: 20,
}

export const feedback: ViewStyle = {
  marginTop: 35,
}

export const label: TextStyle = {
  fontSize: 13,
  textTransform: 'uppercase',
  color: '#8E8E93',
  paddingLeft: 16,
  marginBottom: 7,
}

export const versionInfo: TextStyle = {
  fontSize: 13,
  color: '#8E8E93',
  paddingLeft: 16,
  marginTop: 18,
}
