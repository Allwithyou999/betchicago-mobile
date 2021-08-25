import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
}

export const scheduleContents: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 15,
  width: '100%',
}

export const title: TextStyle = {
  ...Fonts.style.h1,
  fontFamily: 'Roboto-Bold',
}

export const status: TextStyle = {
  ...Fonts.style.h6,
}

export const scheduleDate: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: 'bold',
  color: Colors.blue,
  marginTop: 28,
  marginBottom: 10,
}

// MLB Schedule
export const cellContainer: ViewStyle = {
  flexDirection: 'row',
}

export const atText: TextStyle = {
  marginHorizontal: 5,
  alignSelf: 'center',
}

export const teamInfo: ViewStyle = {
  flexDirection: 'row',
  padding: 5,
  alignItems: 'center',
}

export const teamIcon: ImageStyle = {
  width: 24,
  height: 24,
}

export const teamName: TextStyle = {
  marginLeft: 5,
  // color: Colors.blue,
  ...Fonts.style.h6,
}

export const blue: TextStyle = {
  color: Colors.blue,
}
