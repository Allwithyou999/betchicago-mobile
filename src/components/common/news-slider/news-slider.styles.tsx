import { ViewStyle, TextStyle } from 'react-native'
import { Colors, Metrics } from '@theme'

export const ROOT: ViewStyle = {
  width: '100%',
  paddingLeft: 20,
  paddingTop: 15,
  paddingRight: 40,
}

export const ucHeight: ViewStyle = {
  height: 268,
}

export const epHeight: ViewStyle = {
  height: 320,
}

export const sliderPager: ViewStyle = {
  marginLeft: 22,
}

export const sliderTitleEP: TextStyle = {
  textTransform: 'capitalize',
  fontSize: 14,
}

export const sliderTitleUC: TextStyle = {
  fontSize: 15,
  color: Colors.blue,
  fontFamily: 'Roboto-Bold',
}

export const sliders: ViewStyle = {
  flex: 1,
  marginTop: 15,
}

export const dotStyle: ViewStyle = {
  backgroundColor: Colors.dotColor,
  width: 6,
  height: 6,
  borderRadius: 6,
}

export const selectedDotStyle: ViewStyle = {
  backgroundColor: Colors.activeDotColor,
  width: 7,
  height: 7,
  borderRadius: 7,
}
