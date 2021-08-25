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
  paddingBottom: 144,
}

export const description: TextStyle = {
  position: 'relative',
  width: '100%',
  padding: 15,
  fontSize: 13,
  color: '#959595',
  lineHeight: 17,
}

export const section: ViewStyle = {}

export const label: TextStyle = {
  fontSize: 13,
  textTransform: 'uppercase',
  color: '#8E8E93',
  paddingLeft: 16,
  marginTop: 20,
  marginBottom: 10,
}

export const rowItem: ViewStyle = {
  height: 44,
  backgroundColor: Colors.white,
  paddingHorizontal: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottomColor: '#C8C7CC',
  borderBottomWidth: 0.5,
}

export const rowTextDate: TextStyle = {
  fontSize: 13,
  color: '#959595',
  marginRight: 15,
}

export const rowText: TextStyle = {
  fontSize: 17,
  color: Colors.black,
  fontWeight: '400',
}

export const starIcon: ViewStyle = {
  position: 'absolute',
  right: 55,
  top: 10,
  width: 25,
  height: 25,
}

export const bellIcon: ViewStyle = {
  position: 'absolute',
  right: 15,
  top: 10,
  width: 25,
  height: 25,
}
