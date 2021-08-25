import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import QuickPicker from 'quick-picker'
import GolfActions from '../../../../actions/golf'
import { Colors } from '../../../../themes'
import { LeaderboardTitle, PlayerTable, LoadingView } from '../../../../components'
import { LEADERBOARD_ROUND_TITLE, LEADERBOARD_FINAL_TITLE } from '.././../../../config/constants/golf'
import { SEASONYEAR } from '../../../../config/constants/common'
import { FormatTourPeriod, FormatLeaderboardRound } from '../../../../services/utils'
import * as screenStyles from './leaderboard.styles'

export interface GolfLeaderboardScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  receivedID?: string
  golfTourStatus?: string
  golfLeaderboardStatus?: string
  golfTourList: Array<object>
  golfLeaderboard: Array<object>
  getgolftourlistRequest?: (year: string, id?: string) => void
  getgolfleaderboardRequest?: (id: string, year: string) => void
}

export interface GolfLeaderboardScreenState {
  isRefreshing?: boolean
  isFinal?: boolean
  activeTour?: string
  tourList?: Array<string>
}

class GolfLeaderboard extends React.Component<GolfLeaderboardScreenProps, GolfLeaderboardScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, isFinal: false, activeTour: '', tourList: [] }
  }

  initialize() {
    const id = this.props.receivedID ? this.props.receivedID : ''
    this.props.getgolftourlistRequest(SEASONYEAR, id)
  }

  componentWillReceiveProps(nextProps) {
    const { tourList } = this.state

    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (
      this.props.golfTourStatus !== nextProps.golfTourStatus ||
      this.props.golfLeaderboardStatus !== nextProps.golfLeaderboardStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.golfTourStatus === 'done' &&
        nextProps.golfLeaderboardStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }

    if (this.props.golfTourList !== nextProps.golfTourList && nextProps.golfTourList) {
      const tourList = []

      nextProps.golfTourList['tourList'].map(tour => {
        tourList.push(tour.name)
      })

      const index = nextProps.golfTourList['selectedTour'] ? nextProps.golfTourList['selectedTour'] : 0
      this.setState({ tourList, activeTour: tourList[index] })
      const id = nextProps.golfTourList['tourList'][index]['id']
      this.props.getgolfleaderboardRequest(id, SEASONYEAR)
    }

    if (this.props.golfTourList && this.props.receivedID !== nextProps.receivedID) {
      let receivedIndex = 0

      this.props.golfTourList['tourList'].some((tour, index) => {
        if (tour['id'] === nextProps.receivedID) {
          receivedIndex = index
          return true
        }
      })

      const id = this.props.golfTourList['tourList'][receivedIndex]['id']
      this.setState({ activeTour: tourList[receivedIndex] })
      this.props.getgolfleaderboardRequest(id, SEASONYEAR)
    }
  }

  _onPageRefresh = () => {
    const { golfTourList, getgolfleaderboardRequest } = this.props
    const index = golfTourList['selectedTour'] ? golfTourList['selectedTour'] : 0

    this.setState({ isRefreshing: true, activeTour: this.state.tourList[index] })

    const id = golfTourList['tourList'][index]['id']
    getgolfleaderboardRequest(id, SEASONYEAR)
  }

  onShowTourList = () => {
    const { tourList, activeTour } = this.state

    QuickPicker.open({
      items: tourList,
      selectedValue: activeTour,
      backgroundColor: '#d0d4db',
      onValueChange: selectedValueFromPicker => this.setState({ activeTour: selectedValueFromPicker }),
      onPressDone: this.changeLeaderboardData,
    })
  }

  changeLeaderboardData = () => {
    const { activeTour } = this.state
    const tourObj = this.props.golfTourList['tourList'].filter(item => item['name'] === activeTour)
    QuickPicker.close()
    this.props.getgolfleaderboardRequest(tourObj[0]['id'], SEASONYEAR)
  }

  setTab = isFinal => {
    if (this.state.isFinal !== isFinal) {
      this.setState({ isFinal })
    }
  }

  onViewPlayerDetails = (id: String) => {
    this.props.navigation.navigate('golf_player', { id })
  }

  render() {
    const { isLoadingStart, golfTourStatus, golfLeaderboardStatus, golfLeaderboard } = this.props
    const { isRefreshing, activeTour } = this.state

    let tourScore = [],
      tourLocation = '',
      tourDate = ''

    if (golfLeaderboard && golfLeaderboard['summary'] && golfLeaderboardStatus === 'done') {
      if (golfLeaderboard['players']) {
        tourScore = FormatLeaderboardRound(golfLeaderboard)
      }

      tourLocation = `${golfLeaderboard['summary'].venue.name} - ${
        golfLeaderboard['summary'].venue.city
      }, ${golfLeaderboard['summary'].venue.state || golfLeaderboard['summary'].venue.country}`
      tourDate = FormatTourPeriod(golfLeaderboard['summary'].start_date, golfLeaderboard['summary'].end_date)
    }

    return (
      <React.Fragment>
        <ScrollView
          style={screenStyles.ROOT}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onPageRefresh}
              colors={[Colors.active]}
              tintColor={Colors.active}
            />
          }
        >
          <View style={screenStyles.scrollContents}>
            <LeaderboardTitle
              title={activeTour}
              location={tourLocation}
              date={tourDate}
              onPress={this.onShowTourList}
            />
            <View style={screenStyles.leaderboardContents}>
              <Text style={screenStyles.title}>Leaderboard</Text>
              {golfLeaderboard && golfLeaderboard['summary'] ? (
                <View>
                  {golfLeaderboard['summary'].status !== 'closed' ? (
                    <View style={screenStyles.statusButtons}>
                      {golfLeaderboard['summary'].status !== 'scheduled' && (
                        <Text style={screenStyles.status}>IN PROGRESS</Text>
                      )}
                    </View>
                  ) : (
                    <View style={screenStyles.statusButtons}>
                      <TouchableOpacity onPress={() => this.setTab(true)} disabled={this.state.isFinal}>
                        <Text style={[screenStyles.status, !this.state.isFinal && screenStyles.active]}>FINAL</Text>
                      </TouchableOpacity>
                      <View style={screenStyles.linkDivider} />
                      <TouchableOpacity onPress={() => this.setTab(false)} disabled={!this.state.isFinal}>
                        <Text style={[screenStyles.status, this.state.isFinal && screenStyles.active]}>ROUNDS</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {this.state.isFinal ? (
                    <PlayerTable titles={LEADERBOARD_FINAL_TITLE} list={tourScore} onPress={this.onViewPlayerDetails} />
                  ) : (
                    <PlayerTable titles={LEADERBOARD_ROUND_TITLE} list={tourScore} onPress={this.onViewPlayerDetails} />
                  )}
                </View>
              ) : (
                <Text style={screenStyles.errorMsg}>No player data available</Text>
              )}
            </View>
          </View>
        </ScrollView>
        <QuickPicker />
        <LoadingView
          isVisible={
            !isRefreshing && (!isLoadingStart || golfTourStatus !== 'done' || golfLeaderboardStatus !== 'done')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  golfTourStatus: state.golf.golfTourStatus,
  golfLeaderboardStatus: state.golf.golfLeaderboardStatus,
  golfTourList: state.golf.golfTourList,
  golfLeaderboard: state.golf.golfLeaderboard,
})

const mapDispatchToProps = dispatch => ({
  getgolftourlistRequest: (year: string, id: string) => dispatch(GolfActions.getgolftourlistRequest(year, id)),
  getgolfleaderboardRequest: (id: string, year: string) => dispatch(GolfActions.getgolfleaderboardRequest(id, year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(GolfLeaderboard))
