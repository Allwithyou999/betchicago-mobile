import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import Immutable from 'seamless-immutable'
import { Colors } from '../../../../themes'
import MLBActions from '../../../../actions/mlb'
import { SwipeMenu, ScoreItem, LoadingView } from '../../../../components'
import { Metrics } from '../../../../themes'
import * as screenStyles from './scoreboard.styles'

export interface MLBScoreboardScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  mlbScoreboardDataStatus?: string
  mlbScoreboardOddsStatus?: string
  mlbTeamSlugsStatus?: string
  mlbScoreboardData?: object
  mlbScoreboardOdds?: Array<object>
  mlbSlugs: Array<object>
  getmlbscoreboarddataRequest?: (date: string) => void
  getmlbscoreboardoddsRequest?: (date: Date) => void
  getmlbteamslugsRequest?: () => void
}

export interface MLBScoreboardScreenState {
  isRefreshing: boolean
  selectedDate: string
  dayList: Array<string>
}

class MLBScoreboard extends React.Component<MLBScoreboardScreenProps, MLBScoreboardScreenState> {
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

  initialize(init?: boolean) {
    this.props.getmlbscoreboarddataRequest(this.state.selectedDate)
    this.props.getmlbscoreboardoddsRequest(new Date(this.state.selectedDate))
    if (init) this.props.getmlbteamslugsRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize(true)
    }

    if (
      this.props.mlbTeamSlugsStatus !== nextProps.mlbTeamSlugsStatus ||
      this.props.mlbScoreboardDataStatus !== nextProps.mlbScoreboardDataStatus ||
      this.props.mlbScoreboardOddsStatus !== nextProps.mlbScoreboardOddsStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.mlbTeamSlugsStatus === 'done' &&
        nextProps.mlbScoreboardDataStatus === 'done' &&
        nextProps.mlbScoreboardOddsStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize(false)
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
          this.initialize(false)
        }, 300)
      },
    )
  }

  onViewGameCoverage = team => (awayScore, homeScore) => {
    this.props.navigation.navigate('mlb_matchup', {
      team: team,
      date: this.state.selectedDate,
      score: [awayScore, homeScore],
    })
  }

  buildScoreItems = () => {
    const { mlbSlugs, mlbScoreboardOdds } = this.props
    const { selectedDate } = this.state
    let { mlbScoreboardData } = this.props

    const items = []

    if (
      !mlbScoreboardData ||
      !mlbScoreboardData[selectedDate] ||
      !mlbScoreboardData[selectedDate]['league'] ||
      !mlbScoreboardData[selectedDate]['league']['games'] ||
      !mlbSlugs ||
      !mlbSlugs['slug']
    )
      return []

    Immutable.asMutable(mlbScoreboardData[selectedDate]['league']['games'])
      .sort((a, b) => new Date(a.game.scheduled).getTime() - new Date(b.game.scheduled).getTime())
      .forEach((item: object) => {
        let game = JSON.parse(JSON.stringify(item['game']))

        Object.keys(mlbSlugs['slug']).forEach(slug => {
          if (mlbSlugs['slug'][slug].id === game.away_team) {
            game.away_logo = mlbSlugs['images'].logo_60 + slug + '.png?alt=media'
            game.away_bg = mlbSlugs['images'].background + slug + '-away.png?alt=media'
            game.away_color = mlbSlugs['slug'][slug]['bg-color']
          } else if (mlbSlugs['slug'][slug].id === game.home_team) {
            game.home_logo = mlbSlugs['images'].logo_60 + slug + '.png?alt=media'
            game.home_bg = mlbSlugs['images'].background + slug + '-home.png?alt=media'
            game.home_color = mlbSlugs['slug'][slug]['bg-color']
          }
        })

        if (mlbScoreboardOdds && mlbScoreboardOdds[selectedDate]) {
          mlbScoreboardOdds[selectedDate]
            .filter(odd => new Date(odd['scheduled']).getDate() === new Date(this.state.selectedDate).getDate())
            .forEach(odd => {
              let match = true
              odd['competitors'].forEach(c => {
                if (
                  (c.qualifier === 'home' && c.abbreviation !== game.home.abbr) ||
                  (c.qualifier === 'away' && c.abbreviation !== game.away.abbr)
                ) {
                  match = false
                }
              })

              if (match) {
                game.odd = odd
              }
            })
        }

        items.push(game)
      })

    const result = []
    for (let i = 0; i < items.length; i++) {
      result.push(<ScoreItem key={i} game={items[i]} onGameCoveragePress={this.onViewGameCoverage(items[i])} />)
    }

    return result
  }

  render() {
    const { isLoadingStart, mlbTeamSlugsStatus, mlbScoreboardOddsStatus, mlbScoreboardDataStatus } = this.props
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
            {/* <CalendarDay onChangeDate={this.onChangeDate} /> */}
            <View style={screenStyles.leaderboardContents}>
              <Text style={screenStyles.title}>MLB Scoreboard</Text>
              <Text style={screenStyles.status}>Latest Scores and Money Lines</Text>
              <View style={screenStyles.scores}>{this.buildScoreItems()}</View>
            </View>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing &&
            (!isLoadingStart ||
              mlbTeamSlugsStatus === 'pending' ||
              mlbScoreboardOddsStatus === 'pending' ||
              mlbScoreboardDataStatus === 'pending')
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  mlbScoreboardDataStatus: state.mlb.mlbScoreboardDataStatus,
  mlbScoreboardOddsStatus: state.mlb.mlbScoreboardOddsStatus,
  mlbTeamSlugsStatus: state.mlb.mlbTeamSlugsStatus,
  mlbScoreboardData: state.mlb.mlbScoreboardData,
  mlbScoreboardOdds: state.mlb.mlbScoreboardOdds,
  mlbSlugs: state.mlb.mlbSlugs,
})

const mapDispatchToProps = dispatch => ({
  getmlbscoreboarddataRequest: (date: string) => dispatch(MLBActions.getmlbscoreboarddataRequest(date)),
  getmlbscoreboardoddsRequest: (date: Date) => dispatch(MLBActions.getmlbscoreboardoddsRequest(date)),
  getmlbteamslugsRequest: () => dispatch(MLBActions.getmlbteamslugsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(MLBScoreboard))
