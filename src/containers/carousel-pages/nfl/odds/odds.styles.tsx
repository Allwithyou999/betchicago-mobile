import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingVertical: 20,
}

export const topIntroduction: TextStyle = {
  marginTop: 10,
  paddingHorizontal: 20,
  fontSize: 12,
  lineHeight: 18,
  fontWeight: '100',
}

export const bottomIntroduction: TextStyle = {
  fontSize: 10,
  lineHeight: 18,
  fontWeight: '100',
  marginBottom: 15,
  paddingHorizontal: 20,
}

export const tableTitle: TextStyle = {
  ...Fonts.style.h6,
  fontFamily: 'Roboto-Bold',
  textTransform: 'uppercase',
  textAlign: 'left',
  alignSelf: 'flex-start',
  width: '100%',
  marginTop: 10,
  marginBottom: 20,
  paddingHorizontal: 20,
}

export const matchupTable: ViewStyle = {
  paddingHorizontal: 20,
}

export const crossTable: ViewStyle = {
  marginBottom: 40,
  paddingHorizontal: 20,
}

export const warningText: TextStyle = {
  textAlign: 'center',
  fontSize: 29,
  lineHeight: 35,
  fontFamily: 'Roboto-Bold',
  marginBottom: 15,
  paddingVertical: 100,
  paddingHorizontal: 30,
}
