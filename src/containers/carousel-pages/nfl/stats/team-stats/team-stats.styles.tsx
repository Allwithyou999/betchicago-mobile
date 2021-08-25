import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 100,
}

export const statsSubject: TextStyle = {
  paddingTop: 10,
  paddingBottom: 25,
  alignSelf: 'flex-start',
  fontFamily: 'Roboto-Bold',
  fontSize: 14,
}

export const offensive: ViewStyle = {
  width: '100%',
  paddingHorizontal: 20,
  marginBottom: 5,
}

export const rankingBtn: TextStyle = {
  width: '100%',
  textTransform: 'uppercase',
  ...Fonts.style.h8,
  fontFamily: 'Roboto-Bold',
  color: Colors.blue,
  marginTop: 20,
  marginBottom: 30,
  textAlign: 'center',
}

export const defensive: ViewStyle = {
  width: '100%',
  paddingTop: 10,
  paddingHorizontal: 20,
  marginBottom: 5,
}

export const moreInfo: ViewStyle = {
  width: '100%',
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 10,
}

export const playerCat: ViewStyle = {
  flexDirection: 'row',
  marginBottom: 10,
}

export const halfCol: ViewStyle = {
  flex: 1,
}

export const infoItem: TextStyle = {
  color: Colors.blue,
  marginBottom: 20,
}
