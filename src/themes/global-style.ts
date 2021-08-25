import { TextStyle, ViewStyle, ImageStyle } from 'react-native'
import Colors from './colors'
import Metrics from './metrics'

export const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: '#080814',
}

export const container: ViewStyle = {
  flex: 1,
}

export const topNav: ViewStyle = {
  height: 55,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const scrollContent: ViewStyle = {
  minHeight: '100%',
  paddingHorizontal: 20,
}

export const form: ViewStyle = {
  marginBottom: 115,
}

export const field: ViewStyle = {
  borderBottomColor: '#CDCDCD',
  borderBottomWidth: 1,
  marginTop: 18,
  paddingHorizontal: 25,
}

export const label: TextStyle = {
  fontSize: 13,
  color: '#878787',
}

export const textValue: TextStyle = {
  fontSize: 17,
  color: '#111111',
  marginTop: 4,
  paddingVertical: 5,
}

export const rowItem: ViewStyle = {
  height: 44,
  backgroundColor: Colors.white,
  paddingHorizontal: 16,
  display: 'flex',
  justifyContent: 'center',
  borderBottomColor: '#C8C7CC',
  borderBottomWidth: 0.5,
}

export const rowText: TextStyle = {
  fontSize: 17,
  color: Colors.black,
  fontWeight: '400',
}

export const arrowRight: ViewStyle = {
  position: 'absolute',
  right: 5,
  top: 13,
  width: 20,
  height: 20,
}
