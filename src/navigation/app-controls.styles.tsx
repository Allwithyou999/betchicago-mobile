import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors } from '@theme'
import { IsIPhoneX } from '../services'

export const ROOT: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

export const leftContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 15,
}

export const rightContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 15,
}

export const tabContainer: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: Colors.white,
  height: IsIPhoneX() ? 80 : 60,
  paddingBottom: 10,
  paddingTop: 10,
  paddingHorizontal: 0,
  borderTopWidth: 1,
  borderTopColor: Colors.grey,
}

export const tabItem: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
}

export const tabText: TextStyle = {
  color: Colors.black,
  fontSize: 10,
  textAlign: 'center',
  width: 70,
  marginTop: 3,
}

export const active: TextStyle = {
  color: Colors.blue,
}

export const tabManage: ImageStyle = {
  resizeMode: 'stretch',
  width: 25,
  height: 22,
}
