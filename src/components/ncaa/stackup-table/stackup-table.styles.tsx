import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts } from '../../../themes'

export const ROOT: ViewStyle = {
  position: 'relative',
  paddingHorizontal: 20,
}

export const tabelHeaderRow: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomColor: Colors.dividerColor,
  borderBottomWidth: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
  marginBottom: 10,
}

export const leftCell: ViewStyle = {
  width: '24%',
  alignItems: 'flex-start',
}

export const centerCell: ViewStyle = {
  width: '52%',
  alignItems: 'center',
}

export const rightCell: ViewStyle = {
  width: '24%',
  alignItems: 'flex-end',
}

export const headerCellText: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
}

export const logoIcon: ImageStyle = {
  width: 24,
  height: 24,
}

export const tableRow: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: 8,
  paddingHorizontal: 16,
}

export const cellText: TextStyle = {
  fontSize: 14,
}
