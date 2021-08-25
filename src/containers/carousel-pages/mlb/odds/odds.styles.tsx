import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
}

export const title: TextStyle = {
  ...Fonts.style.h1,
  fontFamily: 'Roboto-Bold',
}

export const oddsContents: ViewStyle = {
  paddingVertical: 20,
  paddingHorizontal: 15,
  width: '100%',
}

export const textUpdated: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: '500',
  marginVertical: 15,
}

export const textUpdatedDate: TextStyle = {
  marginLeft: 3,
  color: Colors.blue,
  textTransform: 'uppercase',
}

export const textDisclaimer: TextStyle = {
  fontSize: 11,
  lineHeight: 13,
  marginBottom: 15,
  fontWeight: '100',
}

export const gameSchedule: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: '600',
  marginBottom: 8,
}

export const gameText: TextStyle = {
  ...Fonts.style.h8,
  fontWeight: '100',
  marginBottom: 8,
}

export const boldFont: TextStyle = {
  fontWeight: '600',
}

export const westgateText: TextStyle = {
  ...gameText,
  textAlign: 'right',
}
