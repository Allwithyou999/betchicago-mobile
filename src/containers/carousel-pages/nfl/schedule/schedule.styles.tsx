import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingVertical: 20,
}

export const daySchedule: ViewStyle = {
  width: '100%',
  marginTop: 5,
  marginBottom: 30,
  paddingHorizontal: 20,
}

export const dateText: TextStyle = {
  fontWeight: 'bold',
  ...Fonts.style.h6,
}

export const gameCard: ViewStyle = {
  marginTop: 20,
  marginBottom: 5,
}

export const introduction: TextStyle = {
  fontSize: 10,
  lineHeight: 18,
  fontWeight: '100',
  marginBottom: 15,
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
