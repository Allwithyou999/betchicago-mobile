import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../themes'

export const ROOT: ViewStyle = {
  width: Metrics.screenWidth,
  backgroundColor: Colors.white,
}

export const scrollContents: ViewStyle = {
  paddingVertical: 20,
}

export const topConfMenu: ViewStyle = {
  paddingVertical: 5,
  paddingHorizontal: 25,
}

export const selectButton: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  width: 'auto',
}

export const buttonText: TextStyle = {
  fontWeight: 'bold',
  fontSize: 14,
  textTransform: 'uppercase',
}

export const downArrow: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 14,
}

export const topConfMenuDesc: TextStyle = {
  color: Colors.selectBoxTextColor,
  fontSize: 12,
  marginTop: 5,
}

export const standingsTable: ViewStyle = {
  marginTop: 5,
  marginHorizontal: 10,
  paddingBottom: 10,
  borderBottomWidth: 2,
  borderBottomColor: Colors.dividerColor,
}

export const glossary: ViewStyle = {
  marginTop: 28,
  marginBottom: 20,
  paddingHorizontal: 20,
}

export const glossaryTitle: TextStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  color: Colors.black,
  marginBottom: 10,
  textTransform: 'uppercase',
}

export const lineWrapper: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginVertical: 4,
}

export const lineTitle: TextStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  color: Colors.black,
  marginRight: 5,
}

export const lineContent: TextStyle = {
  fontSize: 12,
  color: Colors.modalSubject,
}

// Modal UI
export const confModal: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const confAnimationView: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  paddingTop: 50,
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
}

export const modalContent: ViewStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  paddingVertical: 31,
  paddingLeft: 35,
  backgroundColor: Colors.black,
}

export const modalHeader: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const closeButton: ViewStyle = {
  position: 'absolute',
  right: 16,
  alignSelf: 'center',
}

export const modalSubject: TextStyle = {
  color: Colors.modalSubject,
  fontSize: 14,
  fontWeight: '600',
  textTransform: 'uppercase',
}

export const modalBody: ViewStyle = {
  marginTop: 33,
  paddingRight: 35,
}

export const modalItemWrapper: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginBottom: 18,
}

export const dotIndicator: ViewStyle = {
  marginRight: 9,
  opacity: 0,
}

export const modalItemText: TextStyle = {
  color: Colors.white,
  fontSize: 17,
}

export const itemActive: TextStyle = {
  color: Colors.active,
  opacity: 1,
}
