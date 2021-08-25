import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../themes'
import GolfActions from '../../../../actions/golf'
import { PlayerTable, LoadingView } from '../../../../components'
import { SCHEDULE_TITLE } from '.././../../../config/constants/golf'
import { SEASONYEAR } from '../../../../config/constants/common'
import { FormatDate, FormatPeriod, GetLastDayOfWeek } from '../../../../services/utils'
import * as screenStyles from './schedule.styles'

export interface GolfScheduleScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  golfScheduleStatus: string
  golfSchedule: Array<object>
  getgolfscheduleRequest?: (year: string) => void
  onPress?: (val: string) => void
}

export interface GolfScheduleScreenState {
  isRefreshing: boolean
}

class GolfSchedule extends React.Component<GolfScheduleScreenProps, GolfScheduleScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getgolfscheduleRequest(SEASONYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.golfScheduleStatus !== nextProps.golfScheduleStatus) {
      if (this.state.isRefreshing && nextProps.golfScheduleStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onLinkToLeaderboard = (tour: string) => {
    this.props.onPress && this.props.onPress(tour)
  }

  render() {
    const { isLoadingStart, golfScheduleStatus, golfSchedule } = this.props
    const { isRefreshing } = this.state
    const current = new Date()
    let completedTours = [],
      upcomingTours = [],
      liveTours = []

    if (golfSchedule['tournaments']) {
      golfSchedule['tournaments'].forEach((tour, index) => {
        if (current > new Date(tour.end_date)) {
          const data = {
            date: FormatDate(new Date(tour.start_date)),
            name: tour.name,
            linkText: 'Final',
            link: tour.id,
            datePeriod: FormatPeriod(new Date(tour.start_date), new Date(tour.end_date)),
          }

          completedTours.push(data)
        } else {
          if (new Date(tour.start_date) < current || new Date(tour.start_date) < GetLastDayOfWeek()) {
            liveTours.push({
              date: FormatDate(new Date(tour.start_date)),
              name: tour.name,
              datePeriod: FormatPeriod(new Date(tour.start_date), new Date(tour.end_date)),
              linkText: 'Live',
              link: tour.id,
            })
          } else {
            upcomingTours.push({
              date: FormatDate(new Date(tour.start_date)),
              name: tour.name,
              datePeriod: FormatPeriod(new Date(tour.start_date), new Date(tour.end_date)),
            })
          }
        }
      })
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
            <Text style={screenStyles.scheduleTourName}>PGA Tour Schedule</Text>
            {golfSchedule['season'] && (
              <Text style={screenStyles.scheduleSeasonYear}>
                {golfSchedule['season'].year - 1} - {golfSchedule['season'].year} Season
              </Text>
            )}
            <Text style={screenStyles.tableTitle}>THIS WEEK</Text>
            <PlayerTable titles={SCHEDULE_TITLE} list={liveTours} onPress={this.onLinkToLeaderboard} />
            <Text style={screenStyles.tableTitle}>UPCOMING</Text>
            <PlayerTable titles={SCHEDULE_TITLE} list={upcomingTours} />
            <Text style={screenStyles.tableTitle}>COMPLETED</Text>
            <PlayerTable titles={SCHEDULE_TITLE} list={completedTours} onPress={this.onLinkToLeaderboard} />
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || golfScheduleStatus !== 'done')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  golfScheduleStatus: state.golf.golfScheduleStatus,
  golfSchedule: state.golf.golfSchedule,
})

const mapDispatchToProps = dispatch => ({
  getgolfscheduleRequest: (year: string) => dispatch(GolfActions.getgolfscheduleRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GolfSchedule)
