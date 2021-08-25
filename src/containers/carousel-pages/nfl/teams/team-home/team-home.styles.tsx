import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingBottom: 40,
}

export const section: ViewStyle = {
  width: '100%',
  marginTop: 25,
  marginBottom: 35,
  paddingHorizontal: 20,
}

export const sectionTitle: TextStyle = {
  ...Fonts.style.h6,
  fontFamily: 'Roboto-Medium',
}

export const gameCard: ViewStyle = {
  marginTop: 20,
}

export const listTextItem: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 15,
}

export const dotIcon: ViewStyle = {
  width: 30,
  height: 25,
  left: -10,
}

export const itemText: ViewStyle = {
  paddingRight: 20,
  left: -10,
  top: 10,
}

export const statsTable: ViewStyle = {
  marginTop: 20,
}

export const lineTable: ViewStyle = {
  marginTop: 20,
}

export const blueText: TextStyle = {
  color: Colors.blue,
}
