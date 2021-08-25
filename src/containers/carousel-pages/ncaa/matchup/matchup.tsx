import * as React from 'react'
import { View, Animated, Platform, TouchableOpacity, ScrollView, RefreshControl, Text, Image } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment-timezone'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import NCAAActions from '../../../../actions/ncaa'
import {
  Icon,
  AnimatableButton,
  LoadingView,
  StackupTable,
  SectionDivider,
  LineTable,
  TwoTeamsStats,
} from '../../../../components'
import { Colors } from '../../../../themes'
import {
  NCAA_MATCHUP_LAST10_TITLE1,
  NCAA_MATCHUP_LAST10_TITLE2,
  NCAA_STARTING_LINEUP_TITLE,
  NCAA_MATCHUP_TEAMS_SCORING_TITLE,
  NCAA_MATCHUP_PLAYER_STATS_TITLE1,
  NCAA_MATCHUP_PLAYER_STATS_TITLE2,
} from '../../../../config/constants/ncaa'
import * as screenStyles from './matchup.styles'

export interface NCAAMatchupScreenProps extends NavigationScreenProps<{}> {
  ncaaMatchupStatus?: string
  ncaaMatchupData?: Array<object>
  ncaaLastGameHomeStatus?: string
  ncaaLastGameHomeData?: Array<object>
  ncaaLastGameAwayStatus?: string
  ncaaLastGameAwayData?: Array<object>
  getncaamatchupdataRequest?: (status: string, gameId: string, awayId: string, homeId: string) => void
  getncaalastgameawayRequest?: (ids: Array<string>) => void
  getncaalastgamehomeRequest?: (ids: Array<string>) => void
}

export interface NCAAMatchupScreenState {
  isRefreshing: boolean
  teams: Array<any>
  isSetFavourite: boolean
  scrollY: AnimatedValue
  scheduleDate: string
}

class NCAAMatchup extends React.Component<NCAAMatchupScreenProps, NCAAMatchupScreenState> {
  constructor(props) {
    super(props)

    const teams = this.props.navigation.state.params['team']
    const date = this.props.navigation.state.params['date']

    this.state = {
      isRefreshing: false,
      isSetFavourite: false,
      scrollY: new Animated.Value(0),
      teams: teams ? teams : [],
      scheduleDate: date
        ? moment(date)
            .tz('America/Chicago')
            .format('dddd, MMMM Do')
        : moment()
            .tz('America/Chicago')
            .format('dddd, MMMM Do'),
    }

    this.initialize()
  }

  initialize() {
    const teams = this.props.navigation.state.params['team']
    this.props.getncaamatchupdataRequest(teams[0]['status'], teams[0]['gameId'], teams[0]['id'], teams[1]['id'])
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ncaaMatchupStatus !== nextProps.ncaaMatchupStatus) {
      if (this.state.isRefreshing && nextProps.ncaaMatchupStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
      // When Status is not closed:
      if (this.state.teams[0]['status'] !== 'closed' && nextProps.ncaaMatchupStatus === 'done') {
        if (nextProps.ncaaMatchupData['awayTeam'] && nextProps.ncaaMatchupData['awayTeam']['schedule']) {
          let ids = []
          const data = nextProps.ncaaMatchupData['awayTeam']

          for (let i = data.schedule.length - 1; i >= 0; i--) {
            if (data.schedule[i].status === 'closed') {
              ids.push(data.schedule[i].id)
            }
          }

          this.props.getncaalastgameawayRequest(ids)
        }
        if (nextProps.ncaaMatchupData['homeTeam'] && nextProps.ncaaMatchupData['homeTeam']['schedule']) {
          let ids = []
          const data = nextProps.ncaaMatchupData['homeTeam']

          for (let i = data.schedule.length - 1; i >= 0; i--) {
            if (data.schedule[i].status === 'closed') {
              ids.push(data.schedule[i].id)
            }
          }

          this.props.getncaalastgamehomeRequest(ids)
        }
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

  onSetFavourite = () => {
    this.setState({ isSetFavourite: !this.state.isSetFavourite })
  }

  onOpenNotification = () => {}

  _renderIndicator() {
    return (
      <PagerDotIndicator
        pageCount={2}
        dotStyle={screenStyles.dotStyle}
        selectedDotStyle={screenStyles.selectedDotStyle}
      />
    )
  }

  render() {
    const { isRefreshing, teams, scheduleDate } = this.state
    const {
      ncaaMatchupStatus,
      ncaaMatchupData,
      ncaaLastGameAwayStatus,
      ncaaLastGameAwayData,
      ncaaLastGameHomeStatus,
      ncaaLastGameHomeData,
    } = this.props

    const HEADER_MAX_HEIGHT = 175
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 175
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })

    let awayIcon = '',
      homeIcon = '',
      stackup = {},
      awayLast10Game = [],
      homeLast10Game = [],
      awayStartingLineup = [],
      homeStartingLineup = [],
      teamsScoring = [],
      teamStats = {},
      awayPlayerStats = [],
      homePlayerStats = []

    awayIcon = teams[0].logo
    homeIcon = teams[1].logo

    if (ncaaMatchupStatus === 'done' && ncaaMatchupData) {
      if (teams[0]['status'] !== 'closed') {
        // When status is not closed:
        if (ncaaLastGameAwayStatus === 'done' && ncaaLastGameAwayData && ncaaMatchupData['awayTeam']) {
          let count = 0

          ncaaLastGameAwayData.map((row: any, index) => {
            if (!row || count >= 10) return

            let game = {}

            if (row.summary.status === 'closed' && ncaaMatchupData['awayTeam'].name === row.summary.home.name) {
              game = {
                date: row.summary.scheduled.substr(5, 5).replace('-', '/'),
                opp: row.summary.away.alias,
                score: `${row.summary.home.points > row.summary.away.points ? 'W' : 'L'} ${row.summary.home.points}-${
                  row.summary.away.points
                }`,
                line: ``,
                ou: ``,
                fg: `${row.summary.home.statistics ? row.summary.home.statistics.field_goals_made : 0} / ${
                  row.summary.home.statistics ? row.summary.home.statistics.field_goals_att : 0
                }`,
                ofg: ``,
                reb: `${row.summary.home.statistics ? row.summary.home.statistics.rebounds : 0}-${
                  row.summary.home.statistics ? row.summary.home.statistics.offensive_rebounds : 0
                }`,
              }
            } else {
              game = {
                date: row.summary.scheduled.substr(5, 5).replace('-', '/'),
                opp: `@${row.summary.home.alias}`,
                score: `${row.summary.away.points > row.summary.home.points ? 'W' : 'L'} ${row.summary.away.points}-${
                  row.summary.home.points
                }`,
                line: ``,
                ou: ``,
                fg: `${row.summary.away.statistics ? row.summary.away.statistics.field_goals_made : 0} / ${
                  row.summary.away.statistics ? row.summary.away.statistics.field_goals_att : 0
                }`,
                ofg: ``,
                reb: `${row.summary.away.statistics ? row.summary.away.statistics.rebounds : 0}-${
                  row.summary.away.statistics ? row.summary.away.statistics.offensive_rebounds : 0
                }`,
              }
            }

            awayLast10Game.push(game)
            count++
          })
        }
        if (ncaaLastGameHomeStatus === 'done' && ncaaLastGameHomeData && ncaaMatchupData['awayTeam']) {
          let count = 0

          ncaaLastGameHomeData.map((row: any, index) => {
            if (!row || count >= 10) return

            let game = {}

            if (row.summary.status === 'closed' && ncaaMatchupData['awayTeam'].name === row.summary.home.name) {
              game = {
                date: row.summary.scheduled.substr(5, 5).replace('-', '/'),
                opp: row.summary.away.alias,
                score: `${row.summary.home.points > row.summary.away.points ? 'W' : 'L'} ${row.summary.home.points}-${
                  row.summary.away.points
                }`,
                line: ``,
                ou: ``,
                fg: `${row.summary.home.statistics ? row.summary.home.statistics.field_goals_made : 0} / ${
                  row.summary.home.statistics ? row.summary.home.statistics.field_goals_att : 0
                }`,
                ofg: ``,
                reb: `${row.summary.home.statistics ? row.summary.home.statistics.rebounds : 0}-${
                  row.summary.home.statistics ? row.summary.home.statistics.offensive_rebounds : 0
                }`,
              }
            } else {
              game = {
                date: row.summary.scheduled.substr(5, 5).replace('-', '/'),
                opp: `@${row.summary.home.alias}`,
                score: `${row.summary.away.points > row.summary.home.points ? 'W' : 'L'} ${row.summary.away.points}-${
                  row.summary.home.points
                }`,
                line: ``,
                ou: ``,
                fg: `${row.summary.away.statistics ? row.summary.away.statistics.field_goals_made : 0} / ${
                  row.summary.away.statistics ? row.summary.away.statistics.field_goals_att : 0
                }`,
                ofg: ``,
                reb: `${row.summary.away.statistics ? row.summary.away.statistics.rebounds : 0}-${
                  row.summary.away.statistics ? row.summary.away.statistics.offensive_rebounds : 0
                }`,
              }
            }

            homeLast10Game.push(game)
            count++
          })
        }
        if (
          ncaaMatchupData['awayTeam'] &&
          ncaaMatchupData['awayTeam']['stats'] &&
          ncaaMatchupData['awayTeam']['stats']['players']
        ) {
          ncaaMatchupData['awayTeam']['stats']['players'].map((row: any) => {
            awayStartingLineup.push({
              player: row.full_name,
              fg:
                row.average && row.average.field_goals_att > 0
                  ? (row.average.field_goals_made / row.average.field_goals_att).toFixed(1)
                  : 0,
              pt:
                row.average && row.average.three_points_att > 0
                  ? (row.average.three_points_made / row.average.three_points_att).toFixed(1)
                  : 0,
              ft:
                row.average && row.average.free_throws_att > 0
                  ? (row.average.free_throws_made / row.average.free_throws_att).toFixed(1)
                  : 0,
              astg: row.average && row.average.assists ? row.average.assists : 0,
              rebg: row.average && row.average.rebounds ? row.average.rebounds : 0,
            })
          })
        }
        if (
          ncaaMatchupData['homeTeam'] &&
          ncaaMatchupData['homeTeam']['stats'] &&
          ncaaMatchupData['homeTeam']['stats']['players']
        ) {
          ncaaMatchupData['homeTeam']['stats']['players'].map((row: any) => {
            homeStartingLineup.push({
              player: row.full_name,
              fg:
                row.average && row.average.field_goals_att > 0
                  ? (row.average.field_goals_made / row.average.field_goals_att).toFixed(1)
                  : 0,
              pt:
                row.average && row.average.three_points_att > 0
                  ? (row.average.three_points_made / row.average.three_points_att).toFixed(1)
                  : 0,
              ft:
                row.average && row.average.free_throws_att > 0
                  ? (row.average.free_throws_made / row.average.free_throws_att).toFixed(1)
                  : 0,
              astg: row.average && row.average.assists ? row.average.assists : 0,
              rebg: row.average && row.average.rebounds ? row.average.rebounds : 0,
            })
          })
        }
        if (ncaaMatchupData['awayTeam'] && ncaaMatchupData['homeTeam']) {
          const away = ncaaMatchupData['awayTeam']
          const home = ncaaMatchupData['homeTeam']

          stackup = {
            away: {
              icon: awayIcon,
              record: `${away.wins}-${away.losses}`,
              ats: '-',
              ou: '-',
              har: '-',
              ppg: away.stats && away.stats.own_record ? away.stats.own_record.average.points : '-',
              fgp:
                away.stats && away.stats.own_record
                  ? away.stats.own_record.average.field_goals_made / away.stats.own_record.average.field_goals_att
                  : '-',
              ofgp:
                away.stats && away.stats.opponents
                  ? away.stats.opponents.average.field_goals_made / away.stats.opponents.average.field_goals_att
                  : '-',
              ftp:
                away.stats && away.stats.own_record
                  ? away.stats.own_record.average.free_throws_made / away.stats.own_record.average.free_throws_att
                  : '-',
              pa: away.stats && away.stats.opponents ? away.stats.opponents.average.points : '-',
              rebound: away.stats && away.stats.own_record ? away.stats.own_record.average.rebounds : '-',
              turnovers: away.stats && away.stats.own_record ? away.stats.own_record.average.turnovers : '-',
            },
            home: {
              icon: homeIcon,
              record: `${home.wins}-${home.losses}`,
              ats: '-',
              ou: '-',
              har: '-',
              ppg: home.stats && home.stats.own_record ? home.stats.own_record.average.points : '-',
              fgp:
                home.stats && home.stats.own_record
                  ? home.stats.own_record.average.field_goals_made / home.stats.own_record.average.field_goals_att
                  : '-',
              ofgp:
                home.stats && home.stats.opponents
                  ? home.stats.opponents.average.field_goals_made / home.stats.opponents.average.field_goals_att
                  : '-',
              ftp:
                home.stats && home.stats.own_record
                  ? home.stats.own_record.average.free_throws_made / home.stats.own_record.average.free_throws_att
                  : '-',
              pa: home.stats && home.stats.opponents ? home.stats.opponents.average.points : '-',
              rebound: home.stats && home.stats.own_record ? home.stats.own_record.average.rebounds : '-',
              turnovers: home.stats && home.stats.own_record ? home.stats.own_record.average.turnovers : '-',
            },
          }
        }
      } else {
        // When status is closed:
        if (ncaaMatchupData['away'] && ncaaMatchupData['home']) {
          const away = ncaaMatchupData['away']
          const home = ncaaMatchupData['home']

          teamsScoring = [
            {
              team: teams[0].name,
              first: away['score'] && away['score'][0] ? away['score'][0].points : '-',
              second: away['score'] && away['score'][1] ? away['score'][1].points : '-',
              ot: '0',
              f: teams[0].points ? teams[0].points : '-',
            },
            {
              team: teams[1].name,
              first: home['score'] && home['score'][0] ? home['score'][0].points : '-',
              second: home['score'] && home['score'][1] ? home['score'][1].points : '-',
              ot: '0',
              f: teams[1].points ? teams[1].points : '-',
            },
          ]

          teamStats = {
            away: {
              icon: awayIcon,
              fg: (
                <Text>
                  {away.stats.field_goals_made}/{away.stats.field_goals_att}
                  <Text style={screenStyles.blurText}>{` (${away.stats.field_goals_pct}%)`}</Text>
                </Text>
              ),
              tp: (
                <Text>
                  {away.stats.three_points_made}/{away.stats.three_points_att}
                  <Text style={screenStyles.blurText}>{` (${away.stats.three_points_pct}%)`}</Text>
                </Text>
              ),
              ft: (
                <Text>
                  {away.stats.free_throws_made}/{away.stats.free_throws_att}
                  <Text style={screenStyles.blurText}>{` (${away.stats.free_throws_pct}%)`}</Text>
                </Text>
              ),
              ass: away.stats.assists,
              reb: away.stats.rebounds,
              or: away.stats.offensive_rebounds,
              blo: away.stats.blocks,
              ste: away.stats.steals,
              tur: away.stats.turnovers,
            },
            home: {
              icon: homeIcon,
              fg: (
                <Text>
                  <Text style={screenStyles.blurText}>{`(${home.stats.field_goals_pct}%) `}</Text>
                  {home.stats.field_goals_made}/{home.stats.field_goals_att}
                </Text>
              ),
              tp: (
                <Text>
                  <Text style={screenStyles.blurText}>{`(${home.stats.three_points_pct}%) `}</Text>
                  {home.stats.three_points_made}/{home.stats.three_points_att}
                </Text>
              ),
              ft: (
                <Text>
                  <Text style={screenStyles.blurText}>{` (${home.stats.free_throws_pct}%)`}</Text>
                  {home.stats.free_throws_made}/{home.stats.free_throws_att}
                </Text>
              ),
              ass: home.stats.assists,
              reb: home.stats.rebounds,
              or: home.stats.offensive_rebounds,
              blo: home.stats.blocks,
              ste: home.stats.steals,
              tur: home.stats.turnovers,
            },
          }

          if (away['players']) {
            away['players'].map((row, index) => {
              awayPlayerStats.push({
                p: row.position,
                player: row.full_name,
                pts: row.statistics && row.statistics.points ? row.statistics.points : 0,
                fg: `${row.statistics && row.statistics.field_goals_made ? row.statistics.field_goals_made : 0} / ${
                  row.statistics && row.statistics.field_goals_att ? row.statistics.field_goals_att : 0
                }`,
                pt: `${row.statistics && row.statistics.three_points_made ? row.statistics.three_points_made : 0} / ${
                  row.statistics && row.statistics.three_points_att ? row.statistics.three_points_att : 0
                }`,
                ft: `${row.statistics && row.statistics.free_throws_made ? row.statistics.free_throws_made : 0} / ${
                  row.statistics && row.statistics.free_throws_att ? row.statistics.free_throws_att : 0
                }`,
                reb: row.statistics && row.statistics.rebounds ? row.statistics.rebounds : 0,
                oreb: row.statistics && row.statistics.offensive_rebounds ? row.statistics.offensive_rebounds : 0,
                ast: row.statistics && row.statistics.assists ? row.statistics.assists : 0,
                stl: row.statistics && row.statistics.steals ? row.statistics.steals : 0,
                to: row.statistics && row.statistics.turnovers ? row.statistics.turnovers : 0,
              })
            })
          }

          if (home['players']) {
            home['players'].map((row, index) => {
              homePlayerStats.push({
                p: row.position,
                player: row.full_name,
                pts: row.statistics && row.statistics.points ? row.statistics.points : 0,
                fg: `${row.statistics && row.statistics.field_goals_made ? row.statistics.field_goals_made : 0} / ${
                  row.statistics && row.statistics.field_goals_att ? row.statistics.field_goals_att : 0
                }`,
                pt: `${row.statistics && row.statistics.three_points_made ? row.statistics.three_points_made : 0} / ${
                  row.statistics && row.statistics.three_points_att ? row.statistics.three_points_att : 0
                }`,
                ft: `${row.statistics && row.statistics.free_throws_made ? row.statistics.free_throws_made : 0} / ${
                  row.statistics && row.statistics.free_throws_att ? row.statistics.free_throws_att : 0
                }`,
                reb: row.statistics && row.statistics.rebounds ? row.statistics.rebounds : 0,
                oreb: row.statistics && row.statistics.offensive_rebounds ? row.statistics.offensive_rebounds : 0,
                ast: row.statistics && row.statistics.assists ? row.statistics.assists : 0,
                stl: row.statistics && row.statistics.steals ? row.statistics.steals : 0,
                to: row.statistics && row.statistics.turnovers ? row.statistics.turnovers : 0,
              })
            })
          }
        }
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
          {/* <AnimatableButton
            style={screenStyles.favouriteButton}
            rendItem={
              <Icon
                iconType="material"
                name={this.state.isSetFavourite ? 'star' : 'star-border'}
                size={30}
                color={Colors.active}
              />
            }
            type="rubberBand"
            onPress={this.onSetFavourite}
          />
          <AnimatableButton
            style={screenStyles.notificationButton}
            rendItem={<Icon iconType="material" name="notifications-none" size={30} color={Colors.white} />}
            type="swing"
            onPress={this.onOpenNotification}
          /> */}
        </Animated.View>
        {teams[0]['status'] !== 'closed' ? (
          <React.Fragment>
            <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
              <View style={screenStyles.bannerTeams}>
                {teams.map((team, index) => (
                  <View key={index} style={screenStyles.bannerRow}>
                    <View style={screenStyles.inlineRow}>
                      <Image
                        source={{
                          uri: team.logo,
                        }}
                        style={screenStyles.teamLogo}
                      />
                      <Animated.Text style={screenStyles.teamName}>{team.name}</Animated.Text>
                      <Text style={screenStyles.teamStatus}>{``}</Text>
                    </View>
                    <View>
                      <Animated.Text style={screenStyles.teamScore}>{team.score}</Animated.Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={screenStyles.bannerRow}>
                <Text style={screenStyles.teamDate}>{scheduleDate}</Text>
                <Text style={screenStyles.teamDate}>{teams[0]['time']}</Text>
              </View>
            </Animated.View>
            <View style={screenStyles.mainContent}>
              <ScrollView
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
                <View style={screenStyles.scrollContents}>
                  {ncaaMatchupData && (
                    <React.Fragment>
                      {stackup['away'] &&
                        stackup['home'](
                          <React.Fragment>
                            <StackupTable
                              style={screenStyles.stackupTable}
                              away={stackup['away']}
                              home={stackup['home']}
                            />
                            <SectionDivider />
                          </React.Fragment>,
                        )}
                      <View style={screenStyles.block}>
                        <View style={screenStyles.blockHeader}>
                          <Image
                            source={{
                              uri: awayIcon,
                            }}
                            style={screenStyles.headerLogo}
                          />
                          <Text style={screenStyles.headerTitle}>Last 10 Games</Text>
                        </View>
                        <IndicatorViewPager
                          style={[
                            screenStyles.tableSlider,
                            { height: awayLast10Game.length === 0 ? 120 : awayLast10Game.length * 29 + 110 },
                          ]}
                          indicator={this._renderIndicator()}
                        >
                          <View style={screenStyles.tableSliderItem} key={`away-1`}>
                            {ncaaLastGameAwayStatus === 'pending' ? (
                              <LoadingView isVisible={true} style={screenStyles.tableLoading} />
                            ) : (
                              <React.Fragment>
                                <View style={screenStyles.lineTable}>
                                  {ncaaLastGameAwayStatus === 'done' && awayLast10Game.length > 0 ? (
                                    <LineTable titles={NCAA_MATCHUP_LAST10_TITLE1} list={awayLast10Game} />
                                  ) : (
                                    <View style={screenStyles.errorView}>
                                      <Text style={screenStyles.errorText}>No Game Data</Text>
                                    </View>
                                  )}
                                </View>
                                <View style={screenStyles.footer}>
                                  <Text style={screenStyles.footerLabel}>
                                    (N) - Indicates games held at a neutral location
                                  </Text>
                                </View>
                              </React.Fragment>
                            )}
                          </View>
                          <View style={screenStyles.tableSliderItem} key={`away-2`}>
                            {ncaaLastGameAwayStatus === 'pending' ? (
                              <LoadingView isVisible={true} style={screenStyles.tableLoading} />
                            ) : (
                              <React.Fragment>
                                <View style={screenStyles.lineTable}>
                                  {ncaaLastGameAwayStatus === 'done' && awayLast10Game.length > 0 ? (
                                    <LineTable titles={NCAA_MATCHUP_LAST10_TITLE2} list={awayLast10Game} />
                                  ) : (
                                    <View style={screenStyles.errorView}>
                                      <Text style={screenStyles.errorText}>No Game Data</Text>
                                    </View>
                                  )}
                                </View>
                                <View style={screenStyles.footer}>
                                  <Text style={screenStyles.footerLabel}>
                                    (FG) Field Goals; (OFG) Opponents Field Goals; (REB) Rebounds
                                  </Text>
                                </View>
                              </React.Fragment>
                            )}
                          </View>
                        </IndicatorViewPager>
                      </View>
                      <SectionDivider />
                      <View style={screenStyles.block}>
                        <View style={screenStyles.blockHeader}>
                          <Image
                            source={{
                              uri: homeIcon,
                            }}
                            style={screenStyles.headerLogo}
                          />
                          <Text style={screenStyles.headerTitle}>Last 10 Games</Text>
                        </View>
                        <IndicatorViewPager
                          style={[
                            screenStyles.tableSlider,
                            { height: homeLast10Game.length === 0 ? 120 : homeLast10Game.length * 29 + 110 },
                          ]}
                          indicator={this._renderIndicator()}
                        >
                          <View style={screenStyles.tableSliderItem} key={`home-1`}>
                            {ncaaLastGameHomeStatus === 'pending' ? (
                              <LoadingView isVisible={true} style={screenStyles.tableLoading} />
                            ) : (
                              <React.Fragment>
                                <View style={screenStyles.lineTable}>
                                  {ncaaLastGameHomeStatus === 'done' && homeLast10Game.length > 0 ? (
                                    <LineTable titles={NCAA_MATCHUP_LAST10_TITLE1} list={homeLast10Game} />
                                  ) : (
                                    <View style={screenStyles.errorView}>
                                      <Text style={screenStyles.errorText}>No Game Data</Text>
                                    </View>
                                  )}
                                </View>
                                <View style={screenStyles.footer}>
                                  <Text style={screenStyles.footerLabel}>
                                    (N) - Indicates games held at a neutral location
                                  </Text>
                                </View>
                              </React.Fragment>
                            )}
                          </View>
                          <View style={screenStyles.tableSliderItem} key={`home-2`}>
                            {ncaaLastGameHomeStatus === 'pending' ? (
                              <LoadingView isVisible={true} style={screenStyles.tableLoading} />
                            ) : (
                              <React.Fragment>
                                <View style={screenStyles.lineTable}>
                                  {ncaaLastGameHomeStatus === 'done' && homeLast10Game.length > 0 ? (
                                    <LineTable titles={NCAA_MATCHUP_LAST10_TITLE2} list={homeLast10Game} />
                                  ) : (
                                    <View style={screenStyles.errorView}>
                                      <Text style={screenStyles.errorText}>No Game Data</Text>
                                    </View>
                                  )}
                                </View>
                                <View style={screenStyles.footer}>
                                  <Text style={screenStyles.footerLabel}>
                                    (FG) Field Goals; (OFG) Opponents Field Goals; (REB) Rebounds
                                  </Text>
                                </View>
                              </React.Fragment>
                            )}
                          </View>
                        </IndicatorViewPager>
                      </View>
                      <SectionDivider />
                      <View style={screenStyles.block}>
                        <View style={screenStyles.blockHeader}>
                          <Image
                            source={{
                              uri: awayIcon,
                            }}
                            style={screenStyles.headerLogo}
                          />
                          <Text style={screenStyles.headerTitle}>Starting Lineup</Text>
                        </View>
                        <View>
                          <LineTable titles={NCAA_STARTING_LINEUP_TITLE} list={awayStartingLineup} />
                        </View>
                      </View>
                      <View style={screenStyles.block}>
                        <View style={screenStyles.blockHeader}>
                          <Image
                            source={{
                              uri: homeIcon,
                            }}
                            style={screenStyles.headerLogo}
                          />
                          <Text style={screenStyles.headerTitle}>Starting Lineup</Text>
                        </View>
                        <View>
                          <LineTable titles={NCAA_STARTING_LINEUP_TITLE} list={homeStartingLineup} />
                        </View>
                      </View>
                      <View style={screenStyles.block}>
                        <View style={screenStyles.footer}>
                          <Text style={screenStyles.footerLabel}>*Based on previous games starting lineup</Text>
                        </View>
                      </View>
                    </React.Fragment>
                  )}
                </View>
              </ScrollView>
              <LoadingView isVisible={!isRefreshing && ncaaMatchupStatus === 'pending'} />
            </View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
              <View style={screenStyles.bannerTeams}>
                {teams.map((team, index) => (
                  <View key={index} style={screenStyles.bannerRow}>
                    <View style={screenStyles.inlineRow}>
                      <Image
                        source={{
                          uri: team.logo,
                        }}
                        style={screenStyles.teamLogo}
                      />
                      <Animated.Text style={screenStyles.teamName}>{team.name}</Animated.Text>
                      <Text style={screenStyles.teamStatus}>{``}</Text>
                    </View>
                    <View>
                      <Animated.Text style={screenStyles.teamScore}>{team.score}</Animated.Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={screenStyles.bannerRow}>
                <Text style={screenStyles.teamDate}>
                  {ncaaMatchupData && ncaaMatchupData['venue'] ? ncaaMatchupData['venue'] : ''}
                </Text>
                <Text style={screenStyles.teamDate}>Final</Text>
              </View>
            </Animated.View>
            <View style={screenStyles.mainContent}>
              <ScrollView
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
                <View style={screenStyles.scrollContents}>
                  <View style={screenStyles.block}>
                    <View style={screenStyles.blockHeader}>
                      <Text style={screenStyles.headerTitle}>SCORING</Text>
                    </View>
                    <View>
                      <LineTable titles={NCAA_MATCHUP_TEAMS_SCORING_TITLE} list={teamsScoring} />
                    </View>
                    {ncaaMatchupData &&
                      ncaaMatchupData['away'] &&
                      ncaaMatchupData['home'] &&
                      ncaaMatchupData['away'].leaders &&
                      ncaaMatchupData['home'].leaders && (
                        <View style={screenStyles.scoreLeaders}>
                          <Text style={screenStyles.scoreLeaderN}>
                            {ncaaMatchupData['away'].leaders.points[0].full_name}({teams[0].alias}
                            ): {ncaaMatchupData['away'].leaders.points[0].statistics.points} PTS,{' '}
                            {ncaaMatchupData['away'].leaders.points[0].statistics.rebounds} REB,{' '}
                            {ncaaMatchupData['away'].leaders.points[0].statistics.assists} AST
                          </Text>
                          <Text style={screenStyles.scoreLeaderN}>
                            {ncaaMatchupData['home'].leaders.points[0].full_name}({teams[1].alias}
                            ): {ncaaMatchupData['home'].leaders.points[0].statistics.points} PTS,{' '}
                            {ncaaMatchupData['home'].leaders.points[0].statistics.rebounds} REB,{' '}
                            {ncaaMatchupData['home'].leaders.points[0].statistics.assists} AST
                          </Text>
                        </View>
                      )}
                  </View>
                  <SectionDivider />
                  {teamStats['away'] &&
                    teamStats['home'] && (
                      <React.Fragment>
                        <TwoTeamsStats
                          style={screenStyles.stackupTable}
                          away={teamStats['away']}
                          home={teamStats['home']}
                        />
                        <SectionDivider />
                      </React.Fragment>
                    )}
                  <View style={screenStyles.block}>
                    <View style={screenStyles.blockHeader}>
                      <Image
                        source={{
                          uri: awayIcon,
                        }}
                        style={screenStyles.headerLogo}
                      />
                      <Text style={screenStyles.headerTitle}>Player Stats</Text>
                    </View>
                    <IndicatorViewPager
                      style={[
                        screenStyles.tableSlider,
                        { height: awayPlayerStats.length === 0 ? 120 : awayPlayerStats.length * 29 + 120 },
                      ]}
                      indicator={this._renderIndicator()}
                    >
                      <View style={screenStyles.tableSliderItem} key={`away-player-1`}>
                        <View style={screenStyles.lineTable}>
                          {awayPlayerStats.length > 0 ? (
                            <LineTable titles={NCAA_MATCHUP_PLAYER_STATS_TITLE1} list={awayPlayerStats} />
                          ) : (
                            <View style={screenStyles.errorView}>
                              <Text style={screenStyles.errorText}>No Player Stats</Text>
                            </View>
                          )}
                        </View>
                        <View style={screenStyles.footer}>
                          <Text style={screenStyles.footerLabel}>Swipe to see more stat categories.</Text>
                        </View>
                      </View>
                      <View style={screenStyles.tableSliderItem} key={`away-player-2`}>
                        <View style={screenStyles.lineTable}>
                          {awayPlayerStats.length > 0 ? (
                            <LineTable titles={NCAA_MATCHUP_PLAYER_STATS_TITLE2} list={awayPlayerStats} />
                          ) : (
                            <View style={screenStyles.errorView}>
                              <Text style={screenStyles.errorText}>No Player Stats</Text>
                            </View>
                          )}
                        </View>
                        <View style={screenStyles.footer}>
                          <Text style={screenStyles.footerLabel}>Swipe to see more stat categories.</Text>
                        </View>
                      </View>
                    </IndicatorViewPager>
                  </View>
                  <View style={screenStyles.block}>
                    <View style={screenStyles.blockHeader}>
                      <Image
                        source={{
                          uri: homeIcon,
                        }}
                        style={screenStyles.headerLogo}
                      />
                      <Text style={screenStyles.headerTitle}>Player Stats</Text>
                    </View>
                    <IndicatorViewPager
                      style={[
                        screenStyles.tableSlider,
                        { height: homePlayerStats.length === 0 ? 120 : homePlayerStats.length * 29 + 120 },
                      ]}
                      indicator={this._renderIndicator()}
                    >
                      <View style={screenStyles.tableSliderItem} key={`away-player-1`}>
                        <View style={screenStyles.lineTable}>
                          {homePlayerStats.length > 0 ? (
                            <LineTable titles={NCAA_MATCHUP_PLAYER_STATS_TITLE1} list={homePlayerStats} />
                          ) : (
                            <View style={screenStyles.errorView}>
                              <Text style={screenStyles.errorText}>No Player Stats</Text>
                            </View>
                          )}
                        </View>
                        <View style={screenStyles.footer}>
                          <Text style={screenStyles.footerLabel}>Swipe to see more stat categories.</Text>
                        </View>
                      </View>
                      <View style={screenStyles.tableSliderItem} key={`away-player-2`}>
                        <View style={screenStyles.lineTable}>
                          {homePlayerStats.length > 0 ? (
                            <LineTable titles={NCAA_MATCHUP_PLAYER_STATS_TITLE2} list={homePlayerStats} />
                          ) : (
                            <View style={screenStyles.errorView}>
                              <Text style={screenStyles.errorText}>No Player Stats</Text>
                            </View>
                          )}
                        </View>
                        <View style={screenStyles.footer}>
                          <Text style={screenStyles.footerLabel}>Swipe to see more stat categories.</Text>
                        </View>
                      </View>
                    </IndicatorViewPager>
                  </View>
                </View>
              </ScrollView>
            </View>
          </React.Fragment>
        )}
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  ncaaMatchupStatus: state.ncaa.ncaaMatchupStatus,
  ncaaMatchupData: state.ncaa.ncaaMatchupData,
  ncaaLastGameHomeStatus: state.ncaa.ncaaLastGameHomeStatus,
  ncaaLastGameHomeData: state.ncaa.ncaaLastGameHomeData,
  ncaaLastGameAwayStatus: state.ncaa.ncaaLastGameAwayStatus,
  ncaaLastGameAwayData: state.ncaa.ncaaLastGameAwayData,
})

const mapDispatchToProps = dispatch => ({
  getncaamatchupdataRequest: (status: string, gameId: string, awayId: string, homeId: string) =>
    dispatch(NCAAActions.getncaamatchupdataRequest(status, gameId, awayId, homeId)),
  getncaalastgamehomeRequest: (ids: Array<string>) => dispatch(NCAAActions.getncaalastgamehomeRequest(ids)),
  getncaalastgameawayRequest: (ids: Array<string>) => dispatch(NCAAActions.getncaalastgameawayRequest(ids)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NCAAMatchup)
