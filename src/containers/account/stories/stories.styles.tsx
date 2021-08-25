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
  paddingBottom: 144,
}

export const description: TextStyle = {
  position: 'relative',
  width: '100%',
  padding: 15,
  fontSize: 13,
  color: '#959595',
  lineHeight: 17,
}

export const storyItem: ViewStyle = {
  position: 'relative',
  backgroundColor: Colors.white,
}

export const storyImg: ImageStyle = {
  position: 'relative',
  backgroundColor: '#EEEEEE',
  width: '100%',
  height: 211,
}

export const mainStory: ViewStyle = {
  position: 'relative',
  width: '100%',
  backgroundColor: Colors.white,
  paddingHorizontal: 20,
  paddingVertical: 15,
}

export const storyTitle: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#000000',
}

export const storyFooter: ViewStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 20,
}

export const storyDate: TextStyle = {
  fontSize: 12,
  color: '#0D0D0D',
}

export const boldFont: TextStyle = {
  fontWeight: 'bold',
}

export const storyIcons: ViewStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
}

export const socialIcon: ViewStyle = {
  marginLeft: 5,
  marginRight: 8,
}

export const divider: ViewStyle = {
  borderTopColor: '#DEDEDE',
  borderTopWidth: 1,
  height: 11,
}
