import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Colors } from '../../themes'

export const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: Colors.white,
}

export const topBanner: ViewStyle = {
  position: 'relative',
  backgroundColor: '#111111',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 127,
}

export const topLogoImg: ImageStyle = {
  position: 'relative',
  width: 188,
  height: 33,
  marginTop: 40,
}

export const scrollContents: ViewStyle = {
  alignItems: 'center',
  paddingTop: 20,
  minHeight: '100%',
}

export const pageTitle: TextStyle = {
  fontSize: 14,
  fontWeight: '600',
}

export const pageSubTitle: TextStyle = {
  marginTop: 2,
  fontSize: 12,
  fontStyle: 'italic',
}

export const bold: TextStyle = {
  fontWeight: 'bold',
}

export const mainContent: ViewStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

export const section: ViewStyle = {
  position: 'relative',
  width: '100%',
  marginBottom: 15,
  paddingHorizontal: 20,
}

export const subjectContainer: ViewStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 27,
}

export const subject: TextStyle = {
  fontSize: 14,
  fontWeight: 'bold',
  textTransform: 'uppercase',
}

export const fullCoverage: TextStyle = {
  fontSize: 10,
  fontWeight: '600',
  color: Colors.active,
}

export const gameCard: ViewStyle = {
  marginTop: 25,
  marginBottom: 5,
}

export const leadingScores: ViewStyle = {
  marginTop: 5,
}

export const scoreText: TextStyle = {
  fontSize: 12,
  color: '#959595',
}

export const sponsorAd: ViewStyle = {
  position: 'relative',
  width: '100%',
  height: 210,
}

export const ADImg: ImageStyle = {
  width: '100%',
  height: '100%',
}

export const ADSubject: TextStyle = {
  position: 'absolute',
  top: 6,
  left: 6,
  fontSize: 10,
  textTransform: 'uppercase',
  color: 'white',
  fontWeight: '600',
}

export const ADDescView: ViewStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const ADDesc: TextStyle = {
  fontSize: 17,
  textTransform: 'uppercase',
  color: 'white',
  fontWeight: '600',
  textAlign: 'center',
}

export const pgaTitle: TextStyle = {
  marginTop: 25,
  marginBottom: 5,
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black',
}

export const pgaInfoRow: ViewStyle = {
  position: 'relative',
  marginTop: 5,
  display: 'flex',
  flexDirection: 'row',
}

export const pgaInfoLable: TextStyle = {
  position: 'relative',
  width: 58,
  fontSize: 11,
  color: '#666666',
}

export const pgaInfoValue: TextStyle = {
  position: 'relative',
  fontSize: 11,
  color: '#666666',
  paddingRight: 40,
}

export const tableTitle: TextStyle = {
  marginTop: 15,
  fontSize: 14,
  color: '#000000',
  fontWeight: '600',
}

export const roundTable: ViewStyle = {
  marginTop: 17,
}

export const fullLeaderBoardBtn: TextStyle = {
  color: Colors.active,
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 15,
  alignSelf: 'center',
}

export const footer: ViewStyle = {
  width: '100%',
  height: 80,
  backgroundColor: '#F2F2F2',
  borderColor: '#CDCDCD',
  borderTopWidth: 1,
  borderBottomWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 15,
  marginTop: 40,
}

export const footerLabel: TextStyle = {
  fontSize: 10,
}

export const loadingView: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
}

export const warningText: TextStyle = {
  textAlign: 'center',
  fontSize: 20,
  fontFamily: 'Roboto-Bold',
  marginVertical: 25,
}
