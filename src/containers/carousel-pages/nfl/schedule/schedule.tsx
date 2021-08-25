import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import NFLActions from '../../../../actions/nfl'
import { Colors } from '../../../../themes'
import { SwipeMenu, GameCard, SectionDivider, LoadingView } from '../../../../components'
import { NFL_SCHEDULE_TITLE } from '.././../../../config/constants/nfl'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './schedule.styles'

export interface NFLScheduleScreenProps {
  navigation?: any
  scheduleStatus: string
  isLoadingStart?: boolean
  scheduleData?: Array<object>
  getscheduledataRequest?: (year: string) => void
}

export interface NFLScheduleScreenState {
  isRefreshing: boolean
  selectedWeek: number
}

class NFLSchedule extends React.Component<NFLScheduleScreenProps, NFLScheduleScreenState> {
  contentViewRef = null
  duration = 800
  buttonHandleRef = ref => {
    this.contentViewRef = ref
  }

  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, selectedWeek: 0 }
  }

  initialize() {
    // this.props.getscheduledataRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
    //   this.initialize()
    // }
    // if (this.props.scheduleStatus !== nextProps.scheduleStatus) {
    //   if (this.state.isRefreshing && nextProps.scheduleStatus === 'done') {
    //     this.setState({ isRefreshing: false })
    //   }
    // }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onChangedWeek = index => {
    this.contentViewRef.lightSpeedOut(this.duration / 2)
    setTimeout(() => {
      this.contentViewRef.lightSpeedIn(this.duration)
      this.setState({ selectedWeek: index })
    }, this.duration / 2)
  }

  onViewTeamInfo = id => {
    this.props.navigation.navigate('nfl_teams', { teamID: id })
  }

  render() {
    // const { scheduleData, isLoadingStart, scheduleStatus } = this.props
    // const { isRefreshing, selectedWeek } = this.state

    // let weekList = []

    // if (scheduleStatus === 'done' && scheduleData) {
    //   scheduleData.forEach(week => {
    //     weekList.push(week['name'])
    //   })
    // }

    return (
      <View style={screenStyles.ROOT}>
        <Text style={screenStyles.warningText}>2019 NFL Schedule Coming in April</Text>

        {/* <SwipeMenu titles={weekList} onChanged={this.onChangedWeek} />
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
            <Animatable.View easing="ease-out" iterationCount={1} ref={this.buttonHandleRef}>
              {!scheduleData || !scheduleData[selectedWeek] || scheduleData[selectedWeek]['type'] === 'pst' ? (
                <View>
                  <Text style={screenStyles.warningText}>Not available for this game</Text>
                </View>
              ) : (
                <React.Fragment>
                  {scheduleData[selectedWeek]['content'].map((game, index) => (
                    <View style={screenStyles.daySchedule} key={index}>
                      <Text style={screenStyles.dateText}>{game.scheduled}</Text>
                      {game.games.map((team, tindex) => (
                        <GameCard
                          key={tindex}
                          style={screenStyles.gameCard}
                          titles={NFL_SCHEDULE_TITLE}
                          list={team}
                          onSelected={this.onViewTeamInfo}
                        />
                      ))}
                    </View>
                  ))}
                  <Text style={screenStyles.introduction}>
                    *Time and odds are subject to change. To change your default odds provider click Account below, then
                    select “odds provider”.
                  </Text>
                </React.Fragment>
              )}
            </Animatable.View>
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || scheduleStatus !== 'done')} />
       */}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  scheduleStatus: state.nfl.scheduleStatus,
  scheduleData: state.nfl.scheduleData,
})

const mapDispatchToProps = dispatch => ({
  getscheduledataRequest: (year: string) => dispatch(NFLActions.getscheduledataRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NFLSchedule))
