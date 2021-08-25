import { ViewStyle, ImageStyle, TextStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  paddingHorizontal: 3,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  overflow: 'hidden',
}

export const teamIcon: ImageStyle = {
  position: 'relative',
  width: 35,
  height: 35,
}

export const teamNameWrapper: ViewStyle = {
  marginLeft: 5,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
}

export const teamRankings: TextStyle = {
  position: 'relative',
  fontSize: 12,
  color: Colors.tableHeaderCellColor,
  marginRight: 3,
}

export const teamName: TextStyle = {
  position: 'relative',
  fontSize: 14,
  flexWrap: 'wrap',
}
