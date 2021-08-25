import * as React from 'react'
import { ScrollView, RefreshControl, View, Text, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import NBAActions from '../../../../actions/nba'
import { Colors, Metrics } from '../../../../themes'
import { SwipeMenu, GameCard, LoadingView } from '../../../../components'
import { NCAA_SCHEDULE_TITLE } from '../../../../config/constants/ncaa'
import { NBA_SCORES_TITLE } from '../../../../config/constants/nba'
import * as screenStyles from './scores.styles'

export interface NBAScoresScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  nbaScheduleStatus: string
  nbaScheduleData: Array<object>
  nbaSummaryStatus: string
  nbaSummaryData: Array<object>
  getnbascheduleRequest?: (date: string) => void
  getnbasummaryRequest?: (ids: Array<string>) => void
}

export interface NBAScoresScreenState {
  isRefreshing: boolean
  selectedDate: string
  dayList: Array<string>
}

class NBAScores extends React.Component<NBAScoresScreenProps, NBAScoresScreenState> {
  isLoadingDateMenu = false
  isFirstLoadDateMenu = true

  constructor(props) {
    super(props)
    let dayList = this.getDynamicDayList(100)

    this.state = {
      isRefreshing: false,
      dayList: dayList,
      selectedDate: moment()
        .tz('America/Chicago')
        .format('YYYY/MM/DD'),
    }
  }

  initialize() {
    this.props.getnbascheduleRequest(this.state.selectedDate)
  }

  getSummary = (data: any) => {
    const { selectedDate } = this.state
    let ids = []

    data[selectedDate].map((game: any) => {
      if (game.status !== 'unnecessary') {
        ids.push(game.id)
      }
    })

    this.props.getnbasummaryRequest(ids)
  }

  componentWillReceiveProps(nextProps: NBAScoresScreenProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.nbaScheduleStatus !== nextProps.nbaScheduleStatus) {
      if (nextProps.nbaScheduleStatus === 'done') {
        nextProps.nbaScheduleData && this.getSummary(nextProps.nbaScheduleData)

        if (this.props.nbaSummaryStatus !== nextProps.nbaSummaryStatus) {
          if (
            this.state.isRefreshing &&
            (nextProps.nbaSummaryStatus === 'done' || nextProps.nbaSummaryStatus === 'error')
          ) {
            this.setState({ isRefreshing: false })
          }
        }
      } else if (nextProps.nbaScheduleStatus === 'error') {
        this.state.isRefreshing && this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
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
          this.initialize()
        }, 300)
      },
    )
  }

  onViewMatchupGame = (team: any) => () => {
    this.props.navigation.navigate('nba_matchup', { team: team, date: this.state.selectedDate })
  }

  getScheduledGames = () => {
    const { nbaScheduleData } = this.props
    const { selectedDate } = this.state
    let result = []

    nbaScheduleData[selectedDate].map((game: any) => {
      if (game.status !== 'unnecessary') {
        const awayIcon = `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnba%2Fteam%2Flogo_60%2F${game.away.name.replace(
          / /g,
          '-',
        )}.png?alt=media`
        const homeIcon = `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnba%2Fteam%2Flogo_60%2F${game.home.name.replace(
          / /g,
          '-',
        )}.png?alt=media`

        result.push([
          {
            id: game.away.id,
            gameId: game.id,
            type: 'away',
            logo: awayIcon,
            name: game.away.name,
            alias: game.away.alias,
            score:
              game.away_points > game.home_points ? (
                <Text style={screenStyles.bold}>{game.away_points}</Text>
              ) : (
                game.away_points
              ),
            ou: 'O/U: ---',
            time: game.scheduled
              ? moment(game.scheduled)
                  .tz('America/Chicago')
                  .format('hh:mm a')
              : '',
            status: game.status,
            data: game.status !== 'closed' ? '' : 'Final',
            a1: this.getSummaryScoring(game.id, 'away', 0),
            a2: this.getSummaryScoring(game.id, 'away', 1),
            a3: this.getSummaryScoring(game.id, 'away', 2),
            a4: this.getSummaryScoring(game.id, 'away', 3),
            t: game.away_points,
          },
          {
            id: game.home.id,
            gameId: game.id,
            type: 'home',
            logo: homeIcon,
            name: game.home.name,
            alias: game.home.alias,
            score:
              game.home_points > game.away_points ? (
                <Text style={screenStyles.bold}>{game.home_points}</Text>
              ) : (
                game.home_points
              ),
            ou: '---',
            time: '',
            status: game.status,
            data: '',
            a1: this.getSummaryScoring(game.id, 'home', 0),
            a2: this.getSummaryScoring(game.id, 'home', 1),
            a3: this.getSummaryScoring(game.id, 'home', 2),
            a4: this.getSummaryScoring(game.id, 'home', 3),
            t: game.home_points,
          },
        ])
      }
    })

    return result
  }

  getSummaryScoring = (id: string, type: 'away' | 'home', index: number) => {
    const { nbaSummaryData } = this.props
    let score = ''

    if (type === 'away') {
      score =
        nbaSummaryData &&
        nbaSummaryData[id] &&
        nbaSummaryData[id].away.scoring &&
        nbaSummaryData[id].away.scoring[index]
          ? nbaSummaryData[id].away.scoring[index].points
          : ''
    } else {
      score =
        nbaSummaryData &&
        nbaSummaryData[id] &&
        nbaSummaryData[id].home.scoring &&
        nbaSummaryData[id].home.scoring[index]
          ? nbaSummaryData[id].home.scoring[index].points
          : ''
    }

    return score
  }

  render() {
    const { isLoadingStart, nbaScheduleStatus, nbaScheduleData, nbaSummaryStatus, nbaSummaryData } = this.props
    const { isRefreshing, selectedDate, dayList } = this.state
    let scheduledGame: any

    if (nbaScheduleStatus === 'done' && nbaScheduleData[selectedDate] && nbaSummaryStatus === 'done') {
      scheduledGame = this.getScheduledGames()
    }

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
            <View style={screenStyles.daySchedule}>
              <View style={screenStyles.scheduleHeader}>
                <Text style={screenStyles.dateText}>
                  {moment(selectedDate)
                    .tz('America/Chicago')
                    .format('dddd, MMMM Do')}
                </Text>
                <Text style={screenStyles.timezoneText}>All Times CT</Text>
              </View>
              {scheduledGame &&
                scheduledGame.map((team: any, index: number) => (
                  <TouchableOpacity onPress={this.onViewMatchupGame(team)} key={index}>
                    <GameCard
                      style={screenStyles.gameCard}
                      titles={team[0]['status'] !== 'closed' ? NCAA_SCHEDULE_TITLE : NBA_SCORES_TITLE}
                      list={team}
                      iconSize={{ width: 24, height: 24 }}
                      headerTitle={team[0]['status'] === 'closed' ? 'Final' : ''}
                      hasHeader={team[0]['status'] === 'closed'}
                    />
                    {nbaSummaryData[team[0]['gameId']] &&
                      nbaSummaryData[team[0]['gameId']]['home'].leaders &&
                      nbaSummaryData[team[0]['gameId']]['away'].leaders && (
                        <View style={screenStyles.leadingScores}>
                          <Text style={screenStyles.scoreText}>
                            {nbaSummaryData[team[0]['gameId']]['away'].leaders.points[0].full_name}({team[0].alias}
                            ): {nbaSummaryData[team[0]['gameId']]['away'].leaders.points[0].statistics.points} PTS,{' '}
                            {nbaSummaryData[team[0]['gameId']]['away'].leaders.points[0].statistics.rebounds} REB,{' '}
                            {nbaSummaryData[team[0]['gameId']]['away'].leaders.points[0].statistics.assists} AST
                          </Text>
                          <Text style={screenStyles.scoreText}>
                            {nbaSummaryData[team[1]['gameId']]['home'].leaders.points[0].full_name}({team[1].alias}
                            ): {nbaSummaryData[team[1]['gameId']]['home'].leaders.points[0].statistics.points} PTS,{' '}
                            {nbaSummaryData[team[1]['gameId']]['home'].leaders.points[0].statistics.rebounds} REB,{' '}
                            {nbaSummaryData[team[1]['gameId']]['home'].leaders.points[0].statistics.assists} AST
                          </Text>
                        </View>
                      )}
                  </TouchableOpacity>
                ))}
            </View>
            <Text style={screenStyles.introduction}>*Time and odds are subject to change.</Text>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing && (!isLoadingStart || nbaScheduleStatus === 'pending' || nbaSummaryStatus === 'pending')
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  nbaScheduleStatus: state.nba.nbaScheduleStatus,
  nbaScheduleData: state.nba.nbaScheduleData,
  nbaSummaryStatus: state.nba.nbaSummaryStatus,
  nbaSummaryData: state.nba.nbaSummaryData,
})

const mapDispatchToProps = dispatch => ({
  getnbascheduleRequest: (date: string) => dispatch(NBAActions.getnbascheduleRequest(date)),
  getnbasummaryRequest: (ids: Array<string>) => dispatch(NBAActions.getnbasummaryRequest(ids)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NBAScores))
