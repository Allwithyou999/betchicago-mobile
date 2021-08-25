import { ViewStyle } from 'react-native'
import { Colors, Metrics } from '../../../themes'

export const sectionDivider: ViewStyle = {
  width: Metrics.screenWidth,
  height: 10,
  backgroundColor: Colors.lightGrey,
  borderTopColor: Colors.grey,
  borderTopWidth: 1,
  borderBottomColor: Colors.grey,
  borderBottomWidth: 1,
}

export const lineDivider: ViewStyle = {
  borderTopColor: Colors.dividerColor,
  borderTopWidth: 1,
  width: '100%',
  height: 1,
}
