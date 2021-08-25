import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import Immutable from 'seamless-immutable'
import { Colors } from '../../../../themes'
import MLBActions from '../../../../actions/mlb'
import { SwipeMenu, PlayerTable, LoadingView } from '../../../../components'
import { MLB_SCHEDULE_MOBILE_TITLE } from '.././../../../config/constants/mlb'
import { FormatDateFull, FormatDate, FormatAMPM } from '../../../../services'
import * as screenStyles from './schedule.styles'
import { Metrics } from '../../../../themes'

export interface MLBScheduleScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  mlbScheduleDataStatus: string
  mlbScoreboardOddsStatus?: string
  mlbTeamSlugsStatus?: string
  mlbScheduleData: Array<object>
  mlbScoreboardOdds?: Array<object>
  mlbSlugs: Array<object>
  getmlbscheduledataRequest?: (date: string) => void
  getmlbscoreboardoddsRequest?: (date: Date) => void
  getmlbteamslugsRequest?: () => void
}

export interface MLBScheduleScreenState {
  isRefreshing: boolean
  selectedDate: string
  dayList: Array<string>
}

class MLBSchedule extends React.Component<MLBScheduleScreenProps, MLBScheduleScreenState> {
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
      dayList: dayList,
    }
  }

  initialize() {
    this.loadScheduleData()
    this.props.getmlbteamslugsRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (
      this.props.mlbTeamSlugsStatus !== nextProps.mlbTeamSlugsStatus ||
      this.props.mlbScoreboardOddsStatus !== nextProps.mlbScoreboardOddsStatus ||
      this.props.mlbScheduleDataStatus !== nextProps.mlbScheduleDataStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.mlbTeamSlugsStatus === 'done' &&
        nextProps.mlbScheduleDataStatus === 'done' &&
        nextProps.mlbScoreboardOddsStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  loadScheduleData = () => {
    const date = new Date(this.state.selectedDate)
    this.props.getmlbscheduledataRequest(FormatDateFull(date))
    this.props.getmlbscoreboardoddsRequest(date)
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.loadScheduleData()
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
          this.loadScheduleData()
        }, 300)
      },
    )
  }

  generateScheduleList = (schedule, slugs, boxscore) =>
    Immutable.asMutable(
      schedule.map(item => {
        const home = item.home
        const away = item.away

        const game = boxscore.league.games.filter(
          game => game.game.away_team === item.away_team && game.game.home_team === item.home_team,
        )[0]

        // let homePitcher = '',
        //   awayPitcher = ''
        // if (game) {
        //   if (game.game.home.probable_pitcher) {
        //     homePitcher = game.game.home.probable_pitcher.first_name + ' ' + game.game.home.probable_pitcher.last_name
        //   }
        //   if (game.game.away.probable_pitcher) {
        //     awayPitcher = game.game.away.probable_pitcher.first_name + ' ' + game.game.away.probable_pitcher.last_name
        //   }
        // }

        let result: any = {
          time: FormatAMPM(new Date(item.scheduled)),
          coverage: (
            <TouchableOpacity onPress={this.onMoveToMatchup(game)}>
              <Text style={[screenStyles.blue, { textAlign: 'right' }]}>Matchup</Text>
            </TouchableOpacity>
          ),
          // link: `${item.id}`,
          timeOrder: new Date(item.scheduled).getTime(),
        }

        // if (item.status === 'closed' || item.status === 'inprogress') {
        //   result.link += '/boxscore'
        //   result.coverage = 'Box Score'
        // }

        let homeLogo, awayLogo
        Object.keys(slugs.slug).forEach(slug => {
          if (slugs.slug[slug].id === home.id) {
            homeLogo = slugs.images.logo_60 + slug + '.png?alt=media'
          } else if (slugs.slug[slug].id === away.id) {
            awayLogo = slugs.images.logo_60 + slug + '.png?alt=media'
          }
        })

        //mobile
        result.m_matchup = (
          <View style={screenStyles.teamInfo}>
            <Image
              source={{
                uri: awayLogo,
              }}
              style={screenStyles.teamIcon}
            />
            <Text style={screenStyles.teamName}>{away.abbr.toUpperCase()}</Text>
          </View>
        )
        result.m_against = (
          <View style={screenStyles.cellContainer}>
            <Text style={screenStyles.atText}>at</Text>
            <View style={screenStyles.teamInfo}>
              <Image
                source={{
                  uri: homeLogo,
                }}
                style={screenStyles.teamIcon}
              />
              <Text style={screenStyles.teamName}>{home.abbr.toUpperCase()}</Text>
            </View>
          </View>
        )
        result.m_time = FormatAMPM(new Date(item.scheduled))

        return result
      }),
    ).sort((a, b) => a.timeOrder - b.timeOrder)

  onMoveToMatchup = (game: any) => () => {
    const { mlbScoreboardOdds } = this.props
    const { selectedDate } = this.state

    if (!game || !mlbScoreboardOdds) return

    const { mlbSlugs } = this.props
    let team = { ...game.game }
    let awayScore = '',
      homeScore = ''

    Object.keys(mlbSlugs['slug']).forEach(slug => {
      if (mlbSlugs['slug'][slug].id === team.away_team) {
        team['away_logo'] = mlbSlugs['images'].logo_60 + slug + '.png?alt=media'
        team['away_bg'] = mlbSlugs['images'].background + slug + '-away.png?alt=media'
        team['away_color'] = mlbSlugs['slug'][slug]['bg-color']
      } else if (mlbSlugs['slug'][slug].id === team.home_team) {
        team['home_logo'] = mlbSlugs['images'].logo_60 + slug + '.png?alt=media'
        team['home_bg'] = mlbSlugs['images'].background + slug + '-home.png?alt=media'
        team['home_color'] = mlbSlugs['slug'][slug]['bg-color']
      }
    })

    if (mlbScoreboardOdds && mlbScoreboardOdds[selectedDate]) {
      mlbScoreboardOdds[selectedDate]
        .filter(odd => new Date(odd['scheduled']).getDate() === new Date(this.state.selectedDate).getDate())
        .forEach(odd => {
          let match = true
          odd['competitors'].forEach(c => {
            if (
              (c.qualifier === 'home' && c.abbreviation !== team.home.abbr) ||
              (c.qualifier === 'away' && c.abbreviation !== team.away.abbr)
            ) {
              match = false
            }
          })

          if (match) {
            team.odd = odd
          }
        })
    }

    let oddType = '-',
      oddValue = '-',
      homeMl = '--',
      awayMl = '--'

    if (team.odd) {
      const markets = team.odd.markets || []

      let id = '17084' // be default it's westgate

      !!markets[1] &&
        markets[1].books.forEach(book => {
          if (book.id.indexOf(id) !== -1 && !!book.outcomes) {
            book.outcomes.forEach(out => {
              if (out.odds.substr(0, 1) === '-') {
                oddType = out.type.substr(0, 1).toUpperCase()
                oddValue = out.total
              }
            })
            if (oddType === '-' && book.outcomes.length) {
              let out = book.outcomes[0]
              oddType = out.type.substr(0, 1).toUpperCase()
              oddValue = out.total
            }
          }
        })

      !!markets[0] &&
        markets[0].books.forEach(book => {
          if (book.id.indexOf(id) !== -1 && !!book.outcomes) {
            book.outcomes.forEach(out => {
              if (out.type === 'home') {
                homeMl = out.odds
              } else {
                awayMl = out.odds
              }
            })
          }
        })
    }

    if (team.status === 'scheduled') {
      awayScore = parseInt(awayMl) < 0 ? awayMl : oddValue
      homeScore = parseInt(awayMl) < 0 ? oddValue : homeMl
    } else {
      awayScore = team.away.runs
      homeScore = team.home.runs
    }

    this.props.navigation.navigate('mlb_matchup', {
      team: team,
      date: this.state.selectedDate,
      score: [awayScore, homeScore],
    })
  }

  render() {
    const { isLoadingStart, mlbScheduleDataStatus, mlbTeamSlugsStatus, mlbScheduleData, mlbSlugs } = this.props
    const { isRefreshing, dayList, selectedDate } = this.state
    const displayedDate = new Date(selectedDate)
    let currList = []

    if (
      isLoadingStart &&
      mlbScheduleDataStatus === 'done' &&
      mlbScheduleData['current'] &&
      mlbTeamSlugsStatus === 'done' &&
      mlbSlugs['slug']
    ) {
      currList = this.generateScheduleList(mlbScheduleData['current'], mlbSlugs, mlbScheduleData['currBox'])
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
            {/* <CalendarDay onChangeDate={this.onChangeDate} /> */}
            <View style={screenStyles.scheduleContents}>
              <Text style={screenStyles.title}>MLB Schedule</Text>
              <Text style={screenStyles.status}>All Times Central Time Zone</Text>
              <View>
                <Text style={screenStyles.scheduleDate}>{FormatDate(displayedDate, 'WW, mm dd').toUpperCase()}</Text>
                <PlayerTable tableSmall titles={MLB_SCHEDULE_MOBILE_TITLE} list={currList} />
              </View>
            </View>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing &&
            (!isLoadingStart || mlbTeamSlugsStatus === 'pending' || mlbScheduleDataStatus === 'pending')
          }
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  mlbScheduleDataStatus: state.mlb.mlbScheduleDataStatus,
  mlbScoreboardOddsStatus: state.mlb.mlbScoreboardOddsStatus,
  mlbTeamSlugsStatus: state.mlb.mlbTeamSlugsStatus,
  mlbScheduleData: state.mlb.mlbScheduleData,
  mlbScoreboardOdds: state.mlb.mlbScoreboardOdds,
  mlbSlugs: state.mlb.mlbSlugs,
})

const mapDispatchToProps = dispatch => ({
  getmlbscheduledataRequest: (date: string) => dispatch(MLBActions.getmlbscheduledataRequest(date)),
  getmlbscoreboardoddsRequest: (date: Date) => dispatch(MLBActions.getmlbscoreboardoddsRequest(date)),
  getmlbteamslugsRequest: () => dispatch(MLBActions.getmlbteamslugsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(MLBSchedule))
