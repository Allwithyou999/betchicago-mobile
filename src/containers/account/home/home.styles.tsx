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
  paddingBottom: 64,
}

export const photoView: ViewStyle = {
  position: 'relative',
  paddingTop: 48,
  paddingBottom: 35,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const photo: ViewStyle = {
  position: 'relative',
  width: 120,
  height: 120,
  borderRadius: 60,
  backgroundColor: Colors.active,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const photoAlt: TextStyle = {
  fontSize: 36,
  color: Colors.white,
}

export const userName: TextStyle = {
  position: 'relative',
  fontSize: 21,
  fontWeight: 'bold',
  marginTop: 16,
  color: '#111111',
}

export const userEmail: TextStyle = {
  position: 'relative',
  fontSize: 14,
  fontWeight: '100',
  fontStyle: 'italic',
  color: '#111111',
}

export const rowItem: ViewStyle = {
  position: 'relative',
  backgroundColor: Colors.white,
  paddingHorizontal: 16,
  width: '100%',
  height: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderBottomColor: '#C8C7CC',
  borderBottomWidth: 0.5,
}

export const itemSubject: TextStyle = {
  position: 'relative',
  fontSize: 17,
  color: '#000000',
}

export const itemDesc: TextStyle = {
  position: 'relative',
  fontSize: 15,
  color: '#8E8E93',
}

export const arrowRight: ViewStyle = {
  position: 'absolute',
  right: 5,
  top: 20,
  width: 20,
  height: 20,
}

export const divider: ViewStyle = {
  width: '100%',
  height: 20,
}

export const buttons: ViewStyle = {
  position: 'relative',
  marginVertical: 55,
  paddingHorizontal: 22,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const buttonText: TextStyle = {
  fontSize: 17,
  color: '#0064C7',
}
