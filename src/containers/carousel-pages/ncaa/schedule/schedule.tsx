import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment-timezone'
import NCAAActions from '../../../../actions/ncaa'
import { Colors } from '../../../../themes'
import { SwipeMenu, GameCard, LoadingView } from '../../../../components'
import { NCAA_SCHEDULE_TITLE, NCAA_Final_SCHEDULE_TITLE } from '../../../../config/constants/ncaa'
import * as screenStyles from './schedule.styles'
import { Metrics } from '../../../../themes'

export interface NCAAScheduleScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  ncaaScheduleStatus?: string
  ncaaScheduleData?: Array<Array<object>>
  getncaascheduledataRequest?: (date: string) => void
}

export interface NCAAScheduleScreenState {
  isRefreshing: boolean
  selectedDate: string
  dayList: Array<string>
  isCompleteSchedule: boolean
}

class NCAASchedule extends React.Component<NCAAScheduleScreenProps, NCAAScheduleScreenState> {
  isLoadingDateMenu = false
  isFirstLoadDateMenu = true

  constructor(props) {
    super(props)
    let dayList = this.getDynamicDayList(100)

    this.state = {
      isRefreshing: false,
      selectedDate: moment()
        .tz('America/Chicago')
        .format('YYYY/MM/DD'),
      isCompleteSchedule: false,
      dayList: dayList,
    }
  }

  initialize() {
    this.props.getncaascheduledataRequest(this.state.selectedDate)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.ncaaScheduleStatus !== nextProps.ncaaScheduleStatus) {
      if (this.state.isRefreshing && nextProps.ncaaScheduleStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  getDynamicDayList = (n: number) => {
    let list = []
    for (let i = n; i >= -2; i--) {
      let d = new Date().setDate(new Date().getDate() - i)
      list.push(
        moment(d)
          .tz('America/Chicago')
          .format('YYYY/MM/DD'),
      )
    }

    return list
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onScrollMenuBar = event => {
    if (this.isFirstLoadDateMenu) {
      setTimeout(() => {
        this.isFirstLoadDateMenu = false
      }, 1000)

      return
    }
    if (!this.isLoadingDateMenu && event.nativeEvent.contentOffset.x < Metrics.screenWidth * 2) {
      this.isLoadingDateMenu = true
      let increase = 5
      let dayList = this.getDynamicDayList(this.state.dayList.length + increase)
      this.setState(
        {
          dayList,
        },
        () => {
          setTimeout(() => {
            this.isLoadingDateMenu = false
          }, 500)
        },
      )
    }
  }

  onChangedWeek = date => {
    this.setState(
      {
        selectedDate: date,
      },
      () => {
        setTimeout(() => {
          this.props.getncaascheduledataRequest(this.state.selectedDate)
        }, 300)
      },
    )
  }

  // onToggleTeamInfo = () => {
  //   this.setState({ isCompleteSchedule: !this.state.isCompleteSchedule })
  // }

  onViewMatchupGame = team => () => {
    this.props.navigation.navigate('ncaa_matchup', { team: team, date: this.state.selectedDate })
  }

  render() {
    const { isLoadingStart, ncaaScheduleStatus, ncaaScheduleData } = this.props
    const { isRefreshing, dayList, selectedDate } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <SwipeMenu
          type="date"
          titles={dayList}
          active={selectedDate}
          onScrollMenu={this.onScrollMenuBar}
          onChanged={this.onChangedWeek}
        />
        <ScrollView
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
            {ncaaScheduleStatus === 'done' && (
              <Animatable.View>
                <React.Fragment>
                  <View style={screenStyles.daySchedule}>
                    <View style={screenStyles.scheduleHeader}>
                      <Text style={screenStyles.dateText}>
                        {moment(selectedDate)
                          .tz('America/Chicago')
                          .format('dddd, MMMM Do')}
                      </Text>
                      <Text style={screenStyles.timezoneText}>All Times CT</Text>
                    </View>
                    {ncaaScheduleData &&
                      ncaaScheduleData[selectedDate] &&
                      ncaaScheduleData[selectedDate].map((team, index) => {
                        if (team[0]['status'] === 'closed') {
                          let cloneTeam = JSON.parse(JSON.stringify(team))

                          if (cloneTeam[0]['score'] > cloneTeam[1]['score']) {
                            let score = cloneTeam[0]['score']
                            cloneTeam[0]['score'] = <Text style={screenStyles.bold}>{score}</Text>
                          } else {
                            let score = cloneTeam[1]['score']
                            cloneTeam[1]['score'] = <Text style={screenStyles.bold}>{score}</Text>
                          }

                          team = cloneTeam
                        }

                        return (
                          <TouchableOpacity key={index} onPress={this.onViewMatchupGame(team)}>
                            <GameCard
                              style={screenStyles.gameCard}
                              titles={team[0]['status'] !== 'closed' ? NCAA_SCHEDULE_TITLE : NCAA_Final_SCHEDULE_TITLE}
                              list={team}
                              iconSize={{ width: 24, height: 24 }}
                            />
                            {/* {isCompleteSchedule && (
                              <View style={screenStyles.leadingScores}>
                                <Text style={screenStyles.scoreText}>B.Brown (Auburn): 23 PTS, 1 AST</Text>
                                <Text style={screenStyles.scoreText}>T.Davis (South Carolina): 27 PTS, 12 REB, 2 AST</Text>
                              </View>
                            )} */}
                          </TouchableOpacity>
                        )
                      })}
                  </View>
                  <Text style={screenStyles.introduction}>
                    *Time and odds are subject to change. To change your default odds provider click Account below, then
                    select “odds provider”.
                  </Text>
                </React.Fragment>
              </Animatable.View>
            )}
            {ncaaScheduleStatus === 'error' && <Text style={screenStyles.warningText}>No Games Scheduled</Text>}
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || ncaaScheduleStatus === 'pending')} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ncaaScheduleStatus: state.ncaa.ncaaScheduleStatus,
  ncaaScheduleData: state.ncaa.ncaaScheduleData,
})

const mapDispatchToProps = dispatch => ({
  getncaascheduledataRequest: (date: string) => dispatch(NCAAActions.getncaascheduledataRequest(date)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NCAASchedule))
