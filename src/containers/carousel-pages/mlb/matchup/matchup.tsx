import * as React from 'react'
import { View, Animated, Platform, TouchableOpacity, RefreshControl, Text, Image, findNodeHandle } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment-timezone'
import MLBActions from '../../../../actions/mlb'
import {
  Icon,
  RecordTable,
  TotalLineTable,
  ScoreItem,
  TeamsDetail,
  LoadingView,
  MatchupNotes,
  FullOddsTable,
} from '../../../../components'
import { Colors } from '../../../../themes'
import {
  MLB_COVERAGE_MATCHU_LATESTODDS,
  MLB_COVERAGE_MATCHU_RECORD,
  MLB_COVERAGE_MATCHU_OFFENSIVE,
  MLB_COVERAGE_MATCHUP_PITCHER_TITLE,
  MLB_COVERAGE_MATCHUP_LINEUP_TITLE,
  MLB_COVERAGE_MATCHU_FULLODDSCOVERAGE,
  MLB_COVERAGE_BOX_BATTER_TITLE,
  MLB_COVERAGE_BOX_PITCHER_TITLE,
} from '.././../../../config/constants/mlb'
import { GetTimezone } from '../../../../services'
import { SEASONYEAR } from '../../../../config/constants/common'
import * as screenStyles from './matchup.styles'

const oddsInfo = [
  {
    title: 'WESTGATE',
    color: '#C29824',
    id: '17084',
  },
  {
    title: 'CG TECHNOLOGY',
    color: '#FB1A24',
    id: '17089',
  },
  {
    title: 'WILLIAM HILL',
    color: '#032C4C',
    id: '17100',
  },
  {
    title: 'WYNN',
    color: '#65553E',
    id: '17101',
  },
  {
    title: 'PINNACLE',
    color: '#FC561F',
    id: '92',
  },
]

export interface MLBMatchupScreenProps extends NavigationScreenProps<{}> {
  mlbMatchupDataStatus?: string
  mlbMatchupData?: any
  mlbAwayTeamStatsStatus?: string
  mlbAwayTeamStats?: any
  mlbHomeTeamStatsStatus?: string
  mlbHomeTeamStats?: any
  mlbOddsStatus?: string
  mlbOdds?: any
  mlbStandingsStatus?: string
  mlbStandingsData: any
  getmlbmatchupdataRequest?: (id: string) => void
  getmlbawayteamstatsRequest?: (id: string) => void
  getmlbhometeamstatsRequest?: (id: string) => void
  getmlboddsRequest?: (date: Date) => void
  getmlbstandingsRequest?: (year: string) => void
}

export interface MLBMatchupScreenState {
  isRefreshing: boolean
  teams: any
  scrollY: AnimatedValue
  scheduleDate: string
  score: any
}

class MLBMatchup extends React.Component<MLBMatchupScreenProps, MLBMatchupScreenState> {
  scrollViewRef = null
  fullOddsRef = null

  constructor(props: MLBMatchupScreenProps) {
    super(props)

    const teams = this.props.navigation.state.params['team']
    const date = this.props.navigation.state.params['date']
    const score = this.props.navigation.state.params['score']

    this.state = {
      isRefreshing: false,
      scrollY: new Animated.Value(0),
      teams: teams,
      scheduleDate: date
        ? moment(date)
            .tz('America/Chicago')
            .format('dddd, MMMM Do')
        : moment()
            .tz('America/Chicago')
            .format('dddd, MMMM Do'),
      score,
    }
  }

  initialize() {
    this.props.getmlbmatchupdataRequest(this.state.teams.id)
    this.props.getmlboddsRequest(new Date())
    this.props.getmlbstandingsRequest(SEASONYEAR)
  }

  componentDidMount() {
    this.initialize()
  }

  componentWillReceiveProps(nextProps: MLBMatchupScreenProps) {
    if (
      this.props.mlbMatchupDataStatus !== nextProps.mlbMatchupDataStatus &&
      nextProps.mlbMatchupDataStatus === 'done'
    ) {
      this.props.getmlbawayteamstatsRequest(nextProps.mlbMatchupData.summary.game.away.id)
      this.props.getmlbhometeamstatsRequest(nextProps.mlbMatchupData.summary.game.home.id)
    }

    if (
      this.props.mlbMatchupDataStatus !== nextProps.mlbMatchupDataStatus ||
      this.props.mlbAwayTeamStatsStatus !== nextProps.mlbAwayTeamStatsStatus ||
      this.props.mlbHomeTeamStatsStatus !== nextProps.mlbHomeTeamStatsStatus ||
      this.props.mlbOddsStatus !== nextProps.mlbOddsStatus ||
      this.props.mlbStandingsStatus !== nextProps.mlbStandingsStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.mlbMatchupDataStatus === 'done' &&
        nextProps.mlbAwayTeamStatsStatus === 'done' &&
        nextProps.mlbHomeTeamStatsStatus === 'done' &&
        nextProps.mlbOddsStatus === 'done' &&
        nextProps.mlbStandingsStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onClosePopup = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  generateLink = (linkText, text) => (
    <Text style={screenStyles.tableText}>
      <Text>{linkText}</Text> {text}
    </Text>
  )

  generateGameStats = (hitter: any, pitcher: any, stats: any, gameData: any) => {
    if (!stats || !stats.players) return

    for (let i = 0; i < stats.players.length; i++) {
      const player = stats.players[i]
      if (player.statistics.hitting) {
        let avg = ''
        if (gameData) {
          try {
            const p = gameData.players.filter(gp => gp.id === player.id)[0]
            if (p && p.splits && p.splits.hitting) {
              avg = p.splits.hitting.overall[0].total[0].avg
            }
          } catch (e) {}
        }
        const hit = player.statistics.hitting.overall
        hitter.score.push({
          batter: this.generateLink(player.last_name, player.position),
          ab: hit.ab,
          r: hit.runs.total,
          h: hit.onbase.h,
          rbi: hit.rbi,
          bb: hit.onbase.bb,
          ave: avg,
        })
      }

      if (player.statistics.pitching && player.statistics.pitching.overall) {
        const pit = player.statistics.pitching.overall
        pitcher.score.push({
          pitcher: this.generateLink(player.last_name, player.position),
          ip: pit.ip_2,
          h: pit.onbase.h,
          r: pit.runs.total,
          er: pit.runs.earned,
          bb: pit.onbase.bb,
          era: pit.era,
        })
      }
    }

    if (stats.statistics.hitting && stats.statistics.hitting.overall) {
      const hit = stats.statistics.hitting.overall
      hitter.total = {
        batter: 'Totals',
        ab: hit.ab,
        r: hit.runs.total,
        h: hit.onbase.h,
        rbi: hit.rbi,
        bb: hit.onbase.bb,
      }
    } else {
      hitter.total = {}
    }

    if (stats.statistics.pitching && stats.statistics.pitching.overall) {
      const pit = stats.statistics.pitching.overall
      pitcher.total = {
        pitcher: 'Totals',
        ip: pit.ip_2,
        h: pit.onbase.h,
        r: pit.runs.total,
        er: pit.runs.earned,
        bb: pit.onbase.bb,
      }
    } else {
      pitcher.total = {}
    }
  }

  generateLatestOdds = (type: string, odd: any) => {
    if (!odd) return null

    let score = {
      moneyline: '',
      runline: null,
      overunder: null,
      odds: <Text style={screenStyles.oddsLink}>ODDS</Text>,
    }

    let oddId = 0
    odd.competitors.forEach((c, i) => {
      if (c.qualifier === type) oddId = i
    })

    let markets = odd.markets
    let id = '17084'

    markets[0].books.forEach(book => {
      if (book.id.indexOf(id) !== -1) {
        score['moneyline'] = book.outcomes[oddId].odds
      }
    })

    !!markets[2] &&
      markets[2].books.forEach(book => {
        if (book.id.indexOf(id) !== -1) {
          score['runline'] = (
            <Text>
              {book.outcomes[oddId].odds}
              <Text style={{ fontSize: 13 }}>{' (' + book.outcomes[oddId].spread + ')'}</Text>
            </Text>
          )
        }
      })

    !!markets[1] &&
      markets[1].books.forEach(book => {
        if (book.id.indexOf(id) !== -1) {
          score['overunder'] = (
            <Text>
              {book.outcomes[oddId].odds}
              <Text style={{ fontSize: 13 }}>
                {' (' + book.outcomes[oddId].type.substr(0, 1).toUpperCase() + ' ' + book.outcomes[oddId].total + ')'}
              </Text>
            </Text>
          )
        }
      })

    return score
  }

  generateRecord = (type: string, coverage: any, teamData: any, standing: any) => {
    if (!teamData || !standing || !teamData.splits) return null

    let overall = teamData.splits.pitching.overall[0]
    let score = {
      overall: overall.total[0] ? `${overall.total[0].team_win}-${overall.total[0].team_loss}` : '',
      home: overall.home_away[0] ? `${overall.home_away[0].team_win}-${overall.home_away[0].team_loss}` : '',
      away: overall.home_away[1] ? `${overall.home_away[1].team_win}-${overall.home_away[1].team_loss}` : '',
      last: '',
    }
    let gameStanding

    if (standing) {
      standing.leagues.forEach(league => {
        league.divisions.forEach(division => {
          division.teams.forEach(team => {
            if (type === 'home') {
              if (team.id === coverage.summary.game.home.id) {
                gameStanding = team
              }
            } else {
              if (team.id === coverage.summary.game.away.id) {
                gameStanding = team
              }
            }
          })
        })
      })
    }

    if (gameStanding) {
      score['last'] = gameStanding.last_10_won + '-' + gameStanding.last_10_lost
    }

    return score
  }

  generateOffensive = (type: string, teamData: any) => {
    if (!teamData || !teamData.splits) return null

    let overall = teamData.splits.pitching.overall[0]
    let toverall = teamData.splits.hitting.overall[0].total[0]
    let score = {
      ave: toverall.avg,
      obp: '.' + (toverall.obp + '').split('.')[1],
      rung: (toverall.runs / (overall.total[0].team_win + overall.total[0].team_loss)).toFixed(1),
      sog: (toverall.ktotal / (overall.total[0].team_win + overall.total[0].team_loss)).toFixed(1),
      slg: '.' + (toverall.slg + '').split('.')[1],
    }

    return score
  }

  generateStartPitcher = (type: string, coverage: any, teamData: any) => {
    const game = coverage.summary.game[type]
    let pitcherScore = []
    let tempPitcher
    if (
      coverage.summary.game.status === 'scheduled' ||
      coverage.summary.game.status === 'closed' ||
      coverage.summary.game.status === 'complete'
    ) {
      if (game.starting_pitcher) {
        tempPitcher = game.starting_pitcher
      } else if (game.probable_pitcher) {
        tempPitcher = game.probable_pitcher
      }
    } else if (coverage.summary.game.status === 'inprogress') {
      tempPitcher = game.current_pitcher
    }

    let pit = {}
    let pitcher = null

    if (teamData && teamData.players && tempPitcher) pitcher = teamData.players.filter(p => p.id === tempPitcher.id)[0]

    if (pitcher && pitcher.splits.pitching) {
      pit = pitcher.splits.pitching.overall[0].total[0]
    }
    try {
      pitcherScore.push({
        starting: !pitcher ? (
          <Text>{`${tempPitcher.first_name.substr(0, 1)}. ${tempPitcher.last_name}`}</Text>
        ) : (
          <Text>{`${pitcher.first_name.substr(0, 1)}. ${pitcher.last_name} (${pit['team_win']}-${
            pit['team_loss']
          })`}</Text>
        ),
        ip: pit['ip_2'],
        h: pit['h'],
        r: pit['runs'],
        er: pit['er'],
        era: pit['era'].toFixed(2),
      })
    } catch (error) {}

    pit = {}

    try {
      if (pitcher && pitcher.splits.pitching) {
        pitcher.splits.pitching.overall[0].home_away.forEach(p => {
          if (p.value === type) {
            pit = p
          }
        })
      }

      pitcherScore.push({
        starting: !pitcher ? (
          <Text />
        ) : (
          <Text>{` at ${type.substr(0, 1).toUpperCase()}${type.substr(1)} (${pit['team_win']}-${
            pit['team_loss']
          })`}</Text>
        ),
        ip: pit['ip_2'],
        h: pit['h'],
        r: pit['runs'],
        er: pit['er'],
        era: pit['era'] ? pit['era'].toFixed(2) : 0,
      })
    } catch (error) {
      console.log(error)
    }

    return pitcherScore
  }

  generateLineUp = (type: string, coverage: any, teamData: any) => {
    const game = coverage.summary.game[type]
    let batterScore = []

    if (teamData && game.lineup) {
      let lineup = game.lineup.map(line => teamData.players.filter(p => p.id === line.id)[0])
      lineup = lineup.filter(p => !!p)
      batterScore = lineup.map(player => {
        let hit = {}
        if (player.splits.hitting) {
          hit = player.splits.hitting.overall[0].total[0]
        }
        return {
          lineup: this.generateLink(player.last_name, player.position),
          ab: hit['ab'],
          r: hit['runs'],
          h: hit['h'],
          rbi: hit['rbi'],
          hr: hit['hr'],
          ave: hit['avg'],
        }
      })
    }

    return batterScore
  }

  generateFullOddsCoverage = (odds: any, odd: any) => {
    if (!odd) return null

    let coverage = [],
      homeId,
      awayId

    odd.competitors.forEach((c, i) => {
      if (c.qualifier === 'home') awayId = i
      if (c.qualifier === 'away') homeId = i
    })

    odds.map((item, index) => {
      let id = item.id
      let moneyO = ['-', '-']
      let moneyL = ['-', '-']
      let spreadO = ['-', '-']
      let spreadL = ['-', '-']
      let spreadLI = ['-', '-']
      let totalO = ['-', '-']
      let totalL = ['-', '-']
      let totalOI = ['-', '-']
      let totalLI = ['-', '-']
      let totalLL = ['-', '-']

      let markets = odd.markets

      !!markets[0] &&
        markets[0].books.forEach(book => {
          if (book.id.indexOf(id) !== -1) {
            moneyL[0] = book.outcomes[homeId].odds
            moneyL[1] = book.outcomes[awayId].odds
            moneyO[0] = book.outcomes[homeId].opening_odds
            moneyO[1] = book.outcomes[awayId].opening_odds
          }
        })

      !!markets[2] &&
        markets[2].books.forEach(book => {
          if (book.id.indexOf(id) !== -1) {
            spreadL[0] = book.outcomes[homeId].odds
            spreadL[1] = book.outcomes[awayId].odds
            spreadLI[0] = book.outcomes[homeId].spread
            spreadLI[1] = book.outcomes[awayId].spread
            spreadO[0] = book.outcomes[homeId].opening_odds
            spreadO[1] = book.outcomes[awayId].opening_odds
          }
        })
      !!markets[1] &&
        markets[1].books.forEach(book => {
          if (book.id.indexOf(id) !== -1) {
            totalL[0] = book.outcomes[homeId].odds
            totalL[1] = book.outcomes[awayId].odds
            totalLI[0] = book.outcomes[homeId].total
            totalLI[1] = book.outcomes[awayId].total
            totalLL[0] = book.outcomes[homeId].type.substr(0, 1).toUpperCase()
            totalLL[1] = book.outcomes[awayId].type.substr(0, 1).toUpperCase()
            totalO[0] = book.outcomes[homeId].opening_odds
            totalO[1] = book.outcomes[awayId].opening_odds
            totalOI[0] = book.outcomes[homeId].opening_total
            totalOI[1] = book.outcomes[awayId].opening_total
          }
        })

      let timezone = GetTimezone()

      coverage.push([
        {
          team: odd.competitors[awayId].abbreviation,
          moneyline: moneyL[1],
          runline: `${spreadLI[1]}  ${spreadL[1]}`,
          overunder: `${totalLI[1]}  ${totalL[1]} ${totalLL[1]}`,
        },
        {
          team: odd.competitors[homeId].abbreviation,
          moneyline: moneyL[0],
          runline: `${spreadLI[0]}  ${spreadL[0]}`,
          overunder: `${totalLI[0]}  ${totalL[0]} ${totalLL[0]}`,
        },
      ])
    })

    return coverage
  }

  onScrollFullCoverage = () => {
    if (!this.fullOddsRef) return

    let diffY = 0
    this.fullOddsRef.measureLayout(
      findNodeHandle(this.scrollViewRef),
      (x: number, y: number, width: number, height: number) => {
        diffY = y
        this.scrollViewRef.getNode().scrollTo({ y: diffY, animated: true })
      },
      (error: any) => {
        console.log('Swipe menu scroll error:', error)
      },
    )
  }

  render() {
    const { isRefreshing, teams, scheduleDate, score } = this.state
    const {
      mlbMatchupDataStatus,
      mlbMatchupData,
      mlbAwayTeamStatsStatus,
      mlbAwayTeamStats,
      mlbHomeTeamStatsStatus,
      mlbHomeTeamStats,
      mlbOddsStatus,
      mlbOdds,
      mlbStandingsStatus,
      mlbStandingsData,
    } = this.props

    const HEADER_MAX_HEIGHT = 175
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 175
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const time = moment(teams.scheduled)
      .tz('America/Chicago')
      .format('hh:mm a')

    const gameStatus = teams.status // 'inprogress', 'closed', 'scheduled'
    let gameOdd
    let inningText: string, p1, p2, pitcher1, pitcher2
    let homeHitters = {
      score: [],
      total: {},
    }
    let homePitchers = {
      score: [],
      total: {},
    }
    let awayHitters = {
      score: [],
      total: {},
    }
    let awayPitchers = {
      score: [],
      total: {},
    }
    let awayLatestOdds, awayRecord, awayOffensive, awayStartPitcher, awayLineup
    let homeLatestOdds, homeRecord, homeOffensive, homeStartPitcher, homeLineup
    let fullOddsCoverage

    if (gameStatus === 'inprogress' && teams.outcome) {
      inningText = teams.outcome.current_inning_half === 'B' ? 'BOT ' : 'TOP '
      inningText += teams.outcome.current_inning
      if (inningText === 'BOT 0') {
        inningText = 'TOP 1'
      }
    }

    if (mlbMatchupDataStatus === 'done' && mlbMatchupData) {
      if (gameStatus === 'closed' && mlbMatchupData.boxscore.game.pitching) {
        // Pitching and Batting
        p1 = mlbMatchupData.boxscore.game.pitching.win.id
        p2 = mlbMatchupData.boxscore.game.pitching.loss.id

        for (let i = 0; i < mlbMatchupData.summary.game.home.players.length; i++) {
          if (mlbMatchupData.summary.game.home.players[i].id === p1) {
            pitcher1 = mlbMatchupData.summary.game.home.players[i]
          }

          if (mlbMatchupData.summary.game.home.players[i].id === p2) {
            pitcher2 = mlbMatchupData.summary.game.home.players[i]
          }
        }

        for (let i = 0; i < mlbMatchupData.summary.game.away.players.length; i++) {
          if (mlbMatchupData.summary.game.away.players[i].id === p1) {
            pitcher1 = mlbMatchupData.summary.game.away.players[i]
          }

          if (mlbMatchupData.summary.game.away.players[i].id === p2) {
            pitcher2 = mlbMatchupData.summary.game.away.players[i]
          }
        }
      }

      if (gameStatus !== 'scheduled' && mlbAwayTeamStatsStatus === 'done' && mlbHomeTeamStatsStatus === 'done') {
        //Away&Home Batter, Pitcher
        this.generateGameStats(awayHitters, awayPitchers, mlbMatchupData.summary.game.away, mlbAwayTeamStats.data)
        this.generateGameStats(homeHitters, homePitchers, mlbMatchupData.summary.game.home, mlbHomeTeamStats.data)
      }

      if (gameStatus === 'scheduled') {
        // Latest Odds
        if (mlbOddsStatus === 'done') {
          mlbOdds.filter(odd => new Date(odd.scheduled).getDate() === new Date().getDate()).forEach(odd => {
            let match = true
            odd.competitors.forEach(c => {
              if (
                (c.qualifier === 'home' && c.abbreviation !== mlbMatchupData.summary.game.home.abbr) ||
                (c.qualifier === 'away' && c.abbreviation !== mlbMatchupData.summary.game.away.abbr)
              ) {
                match = false
              }
            })
            if (match) {
              gameOdd = odd
            }
          })

          awayLatestOdds = this.generateLatestOdds('away', gameOdd)
          homeLatestOdds = this.generateLatestOdds('home', gameOdd)
        }

        // Record
        if (mlbAwayTeamStatsStatus === 'done' && mlbHomeTeamStatsStatus === 'done' && mlbStandingsStatus === 'done') {
          awayRecord = this.generateRecord('away', mlbMatchupData, mlbAwayTeamStats.data, mlbStandingsData)
          homeRecord = this.generateRecord('home', mlbMatchupData, mlbHomeTeamStats.data, mlbStandingsData)

          // Offensive Production
          awayOffensive = this.generateOffensive('away', mlbAwayTeamStats.data)
          homeOffensive = this.generateOffensive('home', mlbHomeTeamStats.data)

          // Starting Pitcher
          awayStartPitcher = this.generateStartPitcher('away', mlbMatchupData, mlbAwayTeamStats.data)
          homeStartPitcher = this.generateStartPitcher('home', mlbMatchupData, mlbHomeTeamStats.data)

          // Lineup
          awayLineup = this.generateLineUp('away', mlbMatchupData, mlbAwayTeamStats.data)
          homeLineup = this.generateLineUp('home', mlbMatchupData, mlbHomeTeamStats.data)
        }
      }

      if (gameStatus === 'scheduled' || gameStatus === 'inprogress') {
        // Full Odds coverage
        fullOddsCoverage = this.generateFullOddsCoverage(oddsInfo, gameOdd)
      }
    }

    return (
      <Animated.View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <Animated.View style={screenStyles.topHeader}>
          <TouchableOpacity style={screenStyles.closeButton} onPress={this.onClosePopup}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <Icon iconType="material" name="close" size={30} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
        </Animated.View>
        <React.Fragment>
          <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
            <View style={screenStyles.bannerTeams}>
              <View style={screenStyles.bannerRow}>
                <View style={screenStyles.inlineRow}>
                  <Image
                    source={{
                      uri: teams.away_logo,
                    }}
                    style={screenStyles.teamLogo}
                  />
                  <Animated.Text style={screenStyles.teamName}>{teams.away.market}</Animated.Text>
                  {mlbMatchupData &&
                    mlbMatchupData.summary &&
                    mlbMatchupData.summary.game.away.win &&
                    mlbMatchupData.summary.game.away.loss && (
                      <Text style={screenStyles.teamStatus}>
                        ({mlbMatchupData.summary.game.away.win}-{mlbMatchupData.summary.game.away.loss})
                      </Text>
                    )}
                </View>
                <View>
                  <Animated.Text style={screenStyles.teamScore}>
                    {gameStatus === 'scheduled' && score[0] >= 0 && <Text style={screenStyles.oddsLabel}>O/U: </Text>}
                    {score[0]}
                  </Animated.Text>
                </View>
              </View>
              <View style={screenStyles.bannerRow}>
                <View style={screenStyles.inlineRow}>
                  <Image
                    source={{
                      uri: teams.home_logo,
                    }}
                    style={screenStyles.teamLogo}
                  />
                  <Animated.Text style={screenStyles.teamName}>{teams.home.market}</Animated.Text>
                  {mlbMatchupData &&
                    mlbMatchupData.summary &&
                    mlbMatchupData.summary.game.home.win &&
                    mlbMatchupData.summary.game.home.loss && (
                      <Text style={screenStyles.teamStatus}>
                        ({mlbMatchupData.summary.game.home.win}-{mlbMatchupData.summary.game.home.loss})
                      </Text>
                    )}
                </View>
                <View>
                  <Animated.Text style={screenStyles.teamScore}>
                    {gameStatus === 'scheduled' && score[0] < 0 && <Text style={screenStyles.oddsLabel}>O/U: </Text>}
                    {score[1]}
                  </Animated.Text>
                </View>
              </View>
            </View>
            <View style={screenStyles.bannerRow}>
              <Text style={screenStyles.teamDate}>{gameStatus === 'scheduled' && scheduleDate}</Text>
              <Text style={screenStyles.teamDate}>
                {gameStatus === 'scheduled' && time}
                {gameStatus === 'closed' && `FINAL`}
                {gameStatus === 'inprogress' && inningText}
              </Text>
            </View>
          </Animated.View>
          <View style={screenStyles.mainContent}>
            <Animated.ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              scrollEventThrottle={2}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onPageRefresh}
                  colors={[Colors.active]}
                  tintColor={Colors.active}
                />
              }
            >
              {mlbMatchupDataStatus !== 'pending' && (
                <View style={screenStyles.scrollContents}>
                  {gameStatus === 'scheduled' && (
                    <React.Fragment>
                      <TouchableOpacity style={screenStyles.fullOddsButton} onPress={this.onScrollFullCoverage}>
                        <Text style={screenStyles.fullOddsText}>Full Odds Coverage</Text>
                        <Icon
                          style={screenStyles.downArrow}
                          iconType="fontAwesome5"
                          name="caret-down"
                          size={17}
                          color={Colors.blue}
                        />
                      </TouchableOpacity>
                      {/* Away Team */}
                      <View style={screenStyles.contentBlock}>
                        <View style={screenStyles.teamInfo}>
                          <Image source={{ uri: teams.away_logo }} style={screenStyles.teamIcon} />
                          <Text style={screenStyles.teamFullName}>{`${teams.away.market} ${teams.away.name}`}</Text>
                        </View>
                        <RecordTable
                          color={teams.away_color}
                          subject="Latest Odds"
                          titles={MLB_COVERAGE_MATCHU_LATESTODDS}
                          list={awayLatestOdds}
                        />
                        <RecordTable
                          color={teams.away_color}
                          subject="Record"
                          titles={MLB_COVERAGE_MATCHU_RECORD}
                          list={awayRecord}
                        />
                        <RecordTable
                          color={teams.away_color}
                          subject="Offensive Production"
                          titles={MLB_COVERAGE_MATCHU_OFFENSIVE}
                          list={awayOffensive}
                        />
                        <TotalLineTable
                          color={teams.away_color}
                          titles={MLB_COVERAGE_MATCHUP_PITCHER_TITLE}
                          list={awayStartPitcher}
                        />
                        <TotalLineTable
                          color={teams.away_color}
                          showBottomLine
                          titles={MLB_COVERAGE_MATCHUP_LINEUP_TITLE}
                          list={awayLineup}
                        />
                        <MatchupNotes type="scheduled" />
                      </View>
                      {/* Home Team */}
                      <View style={screenStyles.contentBlock}>
                        <View style={screenStyles.teamInfo}>
                          <Image source={{ uri: teams.home_logo }} style={screenStyles.teamIcon} />
                          <Text style={screenStyles.teamFullName}>{`${teams.home.market} ${teams.home.name}`}</Text>
                        </View>
                        <RecordTable
                          color={teams.home_color}
                          subject="Latest Odds"
                          titles={MLB_COVERAGE_MATCHU_LATESTODDS}
                          list={homeLatestOdds}
                        />
                        <RecordTable
                          color={teams.home_color}
                          subject="Record"
                          titles={MLB_COVERAGE_MATCHU_RECORD}
                          list={homeRecord}
                        />
                        <RecordTable
                          color={teams.home_color}
                          subject="Offensive Production"
                          titles={MLB_COVERAGE_MATCHU_OFFENSIVE}
                          list={homeOffensive}
                        />
                        <TotalLineTable
                          color={teams.home_color}
                          titles={MLB_COVERAGE_MATCHUP_PITCHER_TITLE}
                          list={homeStartPitcher}
                        />
                        <TotalLineTable
                          color={teams.home_color}
                          showBottomLine
                          titles={MLB_COVERAGE_MATCHUP_LINEUP_TITLE}
                          list={homeLineup}
                        />

                        <MatchupNotes type="scheduled" />
                      </View>
                    </React.Fragment>
                  )}
                  {(gameStatus === 'closed' || gameStatus === 'inprogress') && (
                    <React.Fragment>
                      <View style={screenStyles.teamsInfoView}>
                        <ScoreItem type="simple" game={teams} />
                        {gameStatus === 'inprogress' && (
                          <React.Fragment>
                            <View>
                              <Text style={screenStyles.blackText}>
                                <Text style={screenStyles.bold}>Last: </Text>
                                J.D. Martinez files out to deep right field to Giancarlo stanton. Justin Upton to third.
                              </Text>
                            </View>
                            <TeamsDetail
                              style={screenStyles.teamsDetail}
                              teamInfo={[]}
                              awayColor={teams.away_color}
                              homeColor={teams.home_color}
                            />
                          </React.Fragment>
                        )}
                        {gameStatus === 'closed' && (
                          <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                            <Text style={screenStyles.blackText}>
                              <Text style={screenStyles.bold}>W: </Text>
                              {teams.pitching.win.first_name.substr(0, 1) + '. ' + teams.pitching.win.last_name} (
                              {teams.pitching.win.win}-{teams.pitching.win.loss}
                              );
                              {!!pitcher1 &&
                                `${' '}${pitcher1.statistics.pitching.overall.ip_2} IP,${' '}${
                                  pitcher1.statistics.pitching.overall.runs.earned
                                } ER,${' '}${pitcher1.statistics.pitching.overall.outs.ktotal}K`}
                            </Text>
                            <Text style={screenStyles.blackText}>
                              <Text style={screenStyles.bold}>L: </Text>
                              {teams.pitching.loss.first_name.substr(0, 1) + '. ' + teams.pitching.loss.last_name} (
                              {teams.pitching.loss.win}-{teams.pitching.loss.loss}
                              );
                              {!!pitcher2 &&
                                `${' '}${pitcher2.statistics.pitching.overall.ip_2} IP,${' '}${
                                  pitcher2.statistics.pitching.overall.runs.earned
                                } ER,${' '}${pitcher2.statistics.pitching.overall.outs.ktotal}K`}
                            </Text>
                          </View>
                        )}
                      </View>
                      {/* Away Team */}
                      <View style={screenStyles.contentBlock}>
                        <View style={screenStyles.teamInfo}>
                          <Image source={{ uri: teams.away_logo }} style={screenStyles.teamIcon} />
                          <Text style={screenStyles.teamFullName}>{`${teams.away.market} ${teams.away.name}`}</Text>
                        </View>
                        <TotalLineTable
                          color={teams.away_color}
                          showTotalValue
                          titles={MLB_COVERAGE_BOX_BATTER_TITLE}
                          list={awayHitters.score}
                        />
                        <MatchupNotes type="closed" />
                        <TotalLineTable
                          style={screenStyles.teamTable}
                          color={teams.away_color}
                          showTotalValue
                          titles={MLB_COVERAGE_BOX_PITCHER_TITLE}
                          list={awayPitchers.score}
                        />
                      </View>
                      {/* Home Team */}
                      <View style={screenStyles.contentBlock}>
                        <View style={screenStyles.teamInfo}>
                          <Image source={{ uri: teams.home_logo }} style={screenStyles.teamIcon} />
                          <Text style={screenStyles.teamFullName}>{`${teams.home.market} ${teams.home.name}`}</Text>
                        </View>
                        <TotalLineTable
                          color={teams.home_color}
                          showTotalValue
                          titles={MLB_COVERAGE_BOX_BATTER_TITLE}
                          list={homeHitters.score}
                        />
                        <MatchupNotes type="closed" />
                        <TotalLineTable
                          style={screenStyles.teamTable}
                          color={teams.home_color}
                          showTotalValue
                          titles={MLB_COVERAGE_BOX_PITCHER_TITLE}
                          list={homePitchers.score}
                        />
                      </View>
                    </React.Fragment>
                  )}
                  {(gameStatus === 'scheduled' || gameStatus === 'inprogress') &&
                    fullOddsCoverage && (
                      /* Full Odds Coverage */
                      <View style={screenStyles.contentBlock} ref={ref => (this.fullOddsRef = ref)}>
                        <View>
                          <Text style={screenStyles.blockTitle}>FULL ODDS COVERAGE</Text>
                          {/* <Text style={screenStyles.blockDesc}>Last Updated: 06/01/18 12:34PM CT</Text> */}
                        </View>
                        {oddsInfo.map((item, index) => (
                          <FullOddsTable
                            key={index}
                            style={{ marginBottom: 20 }}
                            color={item['color']}
                            subject={item['title']}
                            titles={MLB_COVERAGE_MATCHU_FULLODDSCOVERAGE}
                            list={fullOddsCoverage[index]}
                          />
                        ))}
                      </View>
                    )}
                </View>
              )}
            </Animated.ScrollView>
            <LoadingView
              isVisible={
                !isRefreshing &&
                (mlbMatchupDataStatus === 'pending' ||
                  mlbAwayTeamStatsStatus === 'pending' ||
                  mlbHomeTeamStatsStatus === 'pending' ||
                  mlbOddsStatus === 'pending' ||
                  mlbStandingsStatus === 'pending')
              }
            />
          </View>
        </React.Fragment>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  mlbMatchupDataStatus: state.mlb.mlbMatchupDataStatus,
  mlbMatchupData: state.mlb.mlbMatchupData,
  mlbAwayTeamStatsStatus: state.mlb.mlbAwayTeamStatsStatus,
  mlbAwayTeamStats: state.mlb.mlbAwayTeamStats,
  mlbHomeTeamStatsStatus: state.mlb.mlbHomeTeamStatsStatus,
  mlbHomeTeamStats: state.mlb.mlbHomeTeamStats,
  mlbOddsStatus: state.mlb.mlbOddsStatus,
  mlbOdds: state.mlb.mlbOdds,
  mlbStandingsStatus: state.mlb.mlbStandingsStatus,
  mlbStandingsData: state.mlb.mlbStandingsData,
})

const mapDispatchToProps = dispatch => ({
  getmlbmatchupdataRequest: (id: string) => dispatch(MLBActions.getmlbmatchupdataRequest(id)),
  getmlbawayteamstatsRequest: (id: string) => dispatch(MLBActions.getmlbawayteamstatsRequest(id)),
  getmlbhometeamstatsRequest: (id: string) => dispatch(MLBActions.getmlbhometeamstatsRequest(id)),
  getmlboddsRequest: (date: Date) => dispatch(MLBActions.getmlboddsRequest(date)),
  getmlbstandingsRequest: (year: string) => dispatch(MLBActions.getmlbstandingsRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MLBMatchup)
