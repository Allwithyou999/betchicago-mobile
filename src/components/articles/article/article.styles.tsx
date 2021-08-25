import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Metrics, Fonts } from '@theme'

export const ROOT: ViewStyle = {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}

export const articleItem: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  paddingBottom: 15,
}

export const articleImg: ImageStyle = {
  width: Metrics.screenWidth,
  height: 300,
}

export const articleContents: ViewStyle = {
  padding: 20,
}

export const articleTitle: TextStyle = {
  ...Fonts.style.h2,
  fontFamily: 'Roboto-Bold',
}

export const articleSectionName: TextStyle = {
  fontSize: 14,
  lineHeight: 17,
  color: Colors.articleSectionTextColor,
  marginTop: 5,
}

export const articleExcerpt: TextStyle = {
  fontSize: 17,
  fontWeight: '300',
  lineHeight: 23,
  marginTop: 15,
}

export const articleFooter: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: Metrics.screenWidth,
  marginTop: 5,
  paddingLeft: 20,
  paddingRight: 20,
}

export const articleTime: TextStyle = {
  fontSize: 12,
  alignItems: 'flex-end',
}

export const capitalFont: TextStyle = {
  textTransform: 'capitalize',
}

export const boldFont: TextStyle = {
  fontWeight: 'bold',
  fontSize: 14,
}

export const articleSocialIcons: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
}

export const socialIcon: ViewStyle = {
  marginLeft: 5,
  marginRight: 8,
}
