import * as React from 'react'
import { Animated, View, Platform, RefreshControl, Text, TouchableOpacity, Image } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment-timezone'
import NBAActions from '../../../../actions/nba'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import { Icon, LoadingView, StackupTable, TwoTeamsStats, LineTable } from '../../../../components'
import { Colors } from '../../../../themes'
import {
  NCAA_MATCHUP_LAST10_TITLE1,
  NCAA_MATCHUP_LAST10_TITLE2,
  NCAA_STARTING_LINEUP_TITLE,
  NCAA_MATCHUP_PLAYER_STATS_TITLE1,
  NCAA_MATCHUP_PLAYER_STATS_TITLE2,
} from '../../../../config/constants/ncaa'
import { NBA_MATCHUP_TEAMS_SCORING_TITLE } from '../../../../config/constants/nba'
import * as screenStyles from './matchup.styles'

export interface NBAMatchupScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  nbaMatchupGameStatus?: string
  nbaMatchupGame?: any
  nbaMatchupTeamsStatus?: string
  nbaMatchupTeams?: any
  getnbamatchupgameRequest?: (id: string) => void
  getnbamatchupteamsRequest?: (awayId: string, homeId: string) => void
}

export interface NBAMatchupScreenState {
  isRefreshing: boolean
  scrollY: AnimatedValue
  teams: any
  scheduleDate: string
}

class NBAMatchup extends React.Component<NBAMatchupScreenProps, NBAMatchupScreenState> {
  scrollViewRef = null

  constructor(props) {
    super(props)

    const teams = this.props.navigation.state.params['team']
    const date = this.props.navigation.state.params['date']

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
    }
  }

  initialize() {
    this.props.getnbamatchupgameRequest(this.state.teams[0].gameId)
  }

  componentWillReceiveProps(nextProps: NBAMatchupScreenProps) {
    if (
      this.props.nbaMatchupGameStatus !== nextProps.nbaMatchupGameStatus &&
      nextProps.nbaMatchupGameStatus === 'done' &&
      nextProps.nbaMatchupGame &&
      nextProps.nbaMatchupGame.summary
    ) {
      this.props.getnbamatchupteamsRequest(
        nextProps.nbaMatchupGame.summary.away.id,
        nextProps.nbaMatchupGame.summary.home.id,
      )
    }

    if (
      this.props.nbaMatchupGameStatus !== nextProps.nbaMatchupGameStatus ||
      this.props.nbaMatchupTeamsStatus !== nextProps.nbaMatchupTeamsStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.nbaMatchupGameStatus === 'done' &&
        nextProps.nbaMatchupTeamsStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  componentDidMount() {
    this.initialize()
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onClosePopup = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  _renderIndicator() {
    return (
      <PagerDotIndicator
        pageCount={2}
        dotStyle={screenStyles.dotStyle}
        selectedDotStyle={screenStyles.selectedDotStyle}
      />
    )
  }

  extractPlayerStats = (data: any) => {
    let stats = []

    data.map((row: any) => {
      stats.push({
        p: row.position,
        player: row.full_name,
        pts: row.statistics ? row.statistics.points : 0,
        fg: `${row.statistics ? row.statistics.field_goals_made : 0}/${
          row.statistics ? row.statistics.field_goals_att : 0
        }`,
        pt: `${row.statistics ? row.statistics.three_points_made : 0}/${
          row.statistics ? row.statistics.three_points_att : 0
        }`,
        ft: `${row.statistics ? row.statistics.free_throws_made : 0}/${
          row.statistics ? row.statistics.free_throws_att : 0
        }`,
        reb: row.statistics ? row.statistics.rebounds : 0,
        oreb: row.statistics ? row.statistics.offensive_rebounds : 0,
        ast: row.statistics ? row.statistics.assists : 0,
        stl: row.statistics ? row.statistics.steals : 0,
        to: row.statistics ? row.statistics.turnovers : 0,
      })
    })

    return stats
  }

  extractStartLineup = (data: any) => {
    let lineUp = []

    data.map((row: any) => {
      lineUp.push({
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
        astg: row.average ? row.average.assists : 0,
        rebg: row.average ? row.average.rebounds : 0,
      })
    })

    return lineUp
  }

  extractLast10Games = (data: any) => {
    let games = []
    let count = 0

    for (let i = data.schedule.length - 1; i >= 0; i--) {
      if (data.schedule[i].status === 'closed' && count < 10) {
        const row = data.schedule[i]

        if (row.home.name === `${data.market} ${data.name}`) {
          games.push({
            date: row.scheduled.substr(5, 5).replace('-', '/'),
            opp: row.away.alias,
            score: (
              <Text>
                <Text style={screenStyles.bold}>{row.home_points > row.away_points ? 'W' : 'L'} </Text>
                {row.home_points}-{row.away_points}
              </Text>
            ),
            line: <Text>-</Text>,
            ou: <Text>-</Text>,
            fg: `-`,
            ofg: `-`,
            reb: `-`,
          })
        } else {
          games.push({
            date: row.scheduled.substr(5, 5).replace('-', '/'),
            opp: `@${row.home.alias}`,
            score: (
              <Text>
                <Text style={screenStyles.bold}>{row.away_points > row.home_points ? 'W' : 'L'} </Text>
                {row.away_points}-{row.home_points}
              </Text>
            ),
            line: <Text>-</Text>,
            ou: <Text>-</Text>,
            fg: `-`,
            ofg: `-`,
            reb: `-`,
          })
        }

        count++
      }
    }

    return games
  }

  render() {
    const { nbaMatchupGameStatus, nbaMatchupTeamsStatus, nbaMatchupGame, nbaMatchupTeams } = this.props
    const { isRefreshing, teams, scheduleDate } = this.state
    const HEADER_MAX_HEIGHT = 175
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 175
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })

    let stackup = {},
      awayLast10Games = [],
      homeLast10Games = [],
      awayStartLineup = [],
      homeStartLineup = [],
      teamsScoring = [],
      teamStats = {},
      awayPlayerStats = [],
      homePlayerStats = []

    const gameStatus = teams[0].status
    const awayIcon = teams[0].logo
    const homeIcon = teams[1].logo
    const time = moment(teams.scheduled)
      .tz('America/Chicago')
      .format('hh:mm a')
    let awayName = '---'
    let homeName = '---'
    let venue = ''
    let awayStats, homeStats
    let homePlayers = []
    let awayPlayers = []

    if (
      nbaMatchupGameStatus === 'done' &&
      nbaMatchupTeamsStatus === 'done' &&
      nbaMatchupGame &&
      nbaMatchupTeams &&
      nbaMatchupGame.summary
    ) {
      awayName = nbaMatchupGame.summary.away.name
      homeName = nbaMatchupGame.summary.home.name

      if (nbaMatchupGame.players && nbaMatchupTeams.awayData && nbaMatchupTeams.homeData) {
        ;((nbaMatchupTeams.awayProfile && nbaMatchupTeams.awayProfile.players) || []).forEach(player => {
          if (nbaMatchupGame.players[player.id]) {
            awayPlayers.push(nbaMatchupGame.players[player.id])
          }
        })
        ;((nbaMatchupTeams.homeProfile && nbaMatchupTeams.homeProfile.players) || []).forEach(player => {
          if (nbaMatchupGame.players[player.id]) {
            homePlayers.push(nbaMatchupGame.players[player.id])
          }
        })
      }

      if (gameStatus === 'closed' || gameStatus === 'inprogress') {
        venue = nbaMatchupGame.summary.venue.name
        awayStats = nbaMatchupGame.summary.away.statistics
        homeStats = nbaMatchupGame.summary.home.statistics

        // Closed status
        teamsScoring = [
          {
            team: awayName,
            a1: teams[0].a1,
            a2: teams[0].a2,
            a3: teams[0].a3,
            a4: teams[0].a4,
            t: teams[0].t,
          },
          {
            team: homeName,
            a1: teams[1].a1,
            a2: teams[1].a2,
            a3: teams[1].a3,
            a4: teams[1].a4,
            t: teams[1].t,
          },
        ]

        if (awayStats && homeStats) {
          teamStats = {
            away: {
              icon: awayIcon,
              fg: (
                <Text>
                  {awayStats.field_goals_made}/{awayStats.field_goals_att}
                  <Text style={screenStyles.blurText}>{` (${awayStats.field_goals_pct}%)`}</Text>
                </Text>
              ),
              tp: (
                <Text>
                  {awayStats.three_points_made}/{awayStats.three_points_att}
                  <Text style={screenStyles.blurText}>{` (${awayStats.three_points_pct}%)`}</Text>
                </Text>
              ),
              ft: (
                <Text>
                  {awayStats.free_throws_made}/{awayStats.free_throws_att}
                  <Text style={screenStyles.blurText}>{` (${awayStats.free_throws_pct}%)`}</Text>
                </Text>
              ),
              ass: awayStats.assists,
              reb: awayStats.rebounds,
              or: awayStats.offensive_rebounds,
              blo: awayStats.blocks,
              ste: awayStats.steals,
              tur: awayStats.turnovers,
            },
            home: {
              icon: homeIcon,
              fg: (
                <Text>
                  <Text style={screenStyles.blurText}>{` ${homeStats.field_goals_pct}%) `}</Text>
                  {homeStats.field_goals_made}/{homeStats.field_goals_att}
                </Text>
              ),
              tp: (
                <Text>
                  <Text style={screenStyles.blurText}>{`(${homeStats.three_points_pct}%) `}</Text>
                  {homeStats.three_points_made}/{homeStats.three_points_att}
                </Text>
              ),
              ft: (
                <Text>
                  <Text style={screenStyles.blurText}>{`(${homeStats.free_throws_pct}%) `}</Text>
                  {homeStats.free_throws_made}/{homeStats.free_throws_att}
                </Text>
              ),
              ass: homeStats.assists,
              reb: homeStats.rebounds,
              or: homeStats.offensive_rebounds,
              blo: homeStats.blocks,
              ste: homeStats.steals,
              tur: homeStats.turnovers,
            },
          }
        }

        awayPlayerStats = this.extractPlayerStats(awayPlayers)
        homePlayerStats = this.extractPlayerStats(homePlayers)
      } else {
        // Scheduled Status - nbaMatchupTeams.awayData
        stackup = {
          away: {
            icon: awayIcon,
            record: `${nbaMatchupTeams.awayData.wins}-${nbaMatchupTeams.awayData.losses}`,
            ats: '-',
            ou: '-',
            har: '-',
            ppg: nbaMatchupTeams.awayData.stats ? nbaMatchupTeams.awayData.stats.own_record.average.points : '0',
            fgp: nbaMatchupTeams.awayData.stats
              ? nbaMatchupTeams.awayData.stats.own_record.average.field_goals_made /
                nbaMatchupTeams.awayData.stats.own_record.average.field_goals_att
              : 0,
            ofgp: nbaMatchupTeams.awayData.stats
              ? nbaMatchupTeams.awayData.stats.opponents.average.field_goals_made /
                nbaMatchupTeams.awayData.stats.opponents.average.field_goals_att
              : '0',
            ftp: nbaMatchupTeams.awayData.stats
              ? nbaMatchupTeams.awayData.stats.own_record.average.free_throws_made /
                nbaMatchupTeams.awayData.stats.own_record.average.free_throws_att
              : '0',
            pa: nbaMatchupTeams.awayData.stats ? nbaMatchupTeams.awayData.stats.opponents.average.points : '0',
            rebound: nbaMatchupTeams.awayData.stats ? nbaMatchupTeams.awayData.stats.own_record.average.rebounds : '0',
            turnovers: nbaMatchupTeams.awayData.stats
              ? nbaMatchupTeams.awayData.stats.own_record.average.turnovers
              : '0',
          },
          home: {
            icon: homeIcon,
            record: `${nbaMatchupTeams.homeData.wins}-${nbaMatchupTeams.homeData.losses}`,
            ats: '-',
            ou: '-',
            har: '-',
            ppg: nbaMatchupTeams.homeData.stats ? nbaMatchupTeams.homeData.stats.own_record.average.points : '0',
            fgp: nbaMatchupTeams.homeData.stats
              ? nbaMatchupTeams.homeData.stats.own_record.average.field_goals_made /
                nbaMatchupTeams.homeData.stats.own_record.average.field_goals_att
              : '0',
            ofgp: nbaMatchupTeams.homeData.stats
              ? nbaMatchupTeams.homeData.stats.opponents.average.field_goals_made /
                nbaMatchupTeams.homeData.stats.opponents.average.field_goals_att
              : '0',
            ftp: nbaMatchupTeams.homeData.stats
              ? nbaMatchupTeams.homeData.stats.own_record.average.free_throws_made /
                nbaMatchupTeams.homeData.stats.own_record.average.free_throws_att
              : '0',
            pa: nbaMatchupTeams.homeData.stats ? nbaMatchupTeams.homeData.stats.opponents.average.points : '0',
            rebound: nbaMatchupTeams.homeData.stats ? nbaMatchupTeams.homeData.stats.own_record.average.rebounds : '0',
            turnovers: nbaMatchupTeams.homeData.stats
              ? nbaMatchupTeams.homeData.stats.own_record.average.turnovers
              : '0',
          },
        }

        if (nbaMatchupTeams.awayData && nbaMatchupTeams.awayData.stats && nbaMatchupTeams.awayData.stats.players) {
          awayStartLineup = this.extractStartLineup(nbaMatchupTeams.awayData.stats.players)
        }

        if (nbaMatchupTeams.homeData && nbaMatchupTeams.homeData.stats && nbaMatchupTeams.homeData.stats.players) {
          homeStartLineup = this.extractStartLineup(nbaMatchupTeams.homeData.stats.players)
        }

        if (nbaMatchupTeams.awayData && nbaMatchupTeams.awayData.schedule) {
          awayLast10Games = this.extractLast10Games(nbaMatchupTeams.awayData)
        }

        if (nbaMatchupTeams.homeData && nbaMatchupTeams.homeData.schedule) {
          homeLast10Games = this.extractLast10Games(nbaMatchupTeams.homeData)
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
        </Animated.View>
        <React.Fragment>
          <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
            <View style={screenStyles.bannerTeams}>
              <View style={screenStyles.bannerRow}>
                <View style={screenStyles.inlineRow}>
                  <Image
                    source={{
                      uri: awayIcon,
                    }}
                    style={screenStyles.teamLogo}
                  />
                  <Animated.Text style={screenStyles.teamName}>{awayName}</Animated.Text>
                  {/* <Text style={screenStyles.teamStatus}>(14-2)</Text> */}
                </View>
                <View>
                  {gameStatus === 'closed' || gameStatus === 'inprogress' ? (
                    <Animated.Text style={screenStyles.teamScore}>{teams[0].t}</Animated.Text>
                  ) : (
                    <Animated.Text style={screenStyles.teamOU}>--</Animated.Text>
                  )}
                </View>
              </View>
              <View style={screenStyles.bannerRow}>
                <View style={screenStyles.inlineRow}>
                  <Image
                    source={{
                      uri: homeIcon,
                    }}
                    style={screenStyles.teamLogo}
                  />
                  <Animated.Text style={screenStyles.teamName}>{homeName}</Animated.Text>
                  {/* <Text style={screenStyles.teamStatus}>(8-7)</Text> */}
                </View>
                <View>
                  {gameStatus === 'closed' || gameStatus === 'inprogress' ? (
                    <Animated.Text style={screenStyles.teamScore}>{teams[1].t}</Animated.Text>
                  ) : (
                    <Animated.Text style={screenStyles.teamOU}>
                      <Text style={screenStyles.oddsLabel}>O/U: </Text>
                      --
                    </Animated.Text>
                  )}
                </View>
              </View>
            </View>
            <View style={screenStyles.bannerRow}>
              {gameStatus === 'closed' || gameStatus === 'inprogress' ? (
                <>
                  <Text style={screenStyles.teamDate}>{venue}</Text>
                  <Text style={screenStyles.teamDate}>FINAL</Text>
                </>
              ) : (
                <>
                  <Text style={screenStyles.teamDate}>{scheduleDate}</Text>
                  <Text style={screenStyles.teamDate}>{time}</Text>
                </>
              )}
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
              <View style={screenStyles.scrollContents}>
                {gameStatus === 'closed' || gameStatus === 'inprogress' ? (
                  <React.Fragment>
                    <View style={screenStyles.contentBlock}>
                      <View style={screenStyles.blockHeader}>
                        <Text style={screenStyles.headerTitle}>SCORING</Text>
                      </View>
                      <View>
                        <LineTable titles={NBA_MATCHUP_TEAMS_SCORING_TITLE} list={teamsScoring} />
                      </View>
                    </View>
                    {teamStats['away'] &&
                      teamStats['home'] && (
                        <View style={screenStyles.contentBlock}>
                          <TwoTeamsStats away={teamStats['away']} home={teamStats['home']} />
                        </View>
                      )}
                    <View style={screenStyles.contentBlock}>
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
                            <Text style={screenStyles.footerLabel}>
                              Swipe to see rebound, assists, steals, and turnovers.
                            </Text>
                          </View>
                        </View>
                      </IndicatorViewPager>
                    </View>
                    <View style={screenStyles.contentBlock}>
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
                            <Text style={screenStyles.footerLabel}>
                              Swipe to see rebound, assists, steals, and turnovers.
                            </Text>
                          </View>
                        </View>
                      </IndicatorViewPager>
                    </View>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/* Stackup Table */}
                    {stackup['away'] &&
                      stackup['home'] && (
                        <View style={screenStyles.contentBlock}>
                          <StackupTable
                            style={{ paddingHorizontal: 0 }}
                            away={stackup['away']}
                            home={stackup['home']}
                          />
                        </View>
                      )}
                    {/* Away Last 10 Games */}
                    {awayLast10Games.length > 0 && (
                      <View style={screenStyles.contentBlock}>
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
                          style={[screenStyles.tableSlider, { height: awayLast10Games.length * 29 + 110 }]}
                          indicator={this._renderIndicator()}
                        >
                          <View style={screenStyles.tableSliderItem}>
                            <View style={screenStyles.lineTable}>
                              <LineTable titles={NCAA_MATCHUP_LAST10_TITLE1} list={awayLast10Games} />
                            </View>
                            <View style={screenStyles.footer}>
                              <Text style={screenStyles.footerLabel}>
                                (N) - Indicates games held at a neutral location.
                              </Text>
                            </View>
                          </View>
                          <View style={screenStyles.tableSliderItem}>
                            <View style={screenStyles.lineTable}>
                              <LineTable titles={NCAA_MATCHUP_LAST10_TITLE2} list={awayLast10Games} />
                            </View>
                            <View style={screenStyles.footer}>
                              <Text style={screenStyles.footerLabel}>
                                (FG) Field Goals; (OFG) Opponents Field Goals; (REB) Rebounds
                              </Text>
                            </View>
                          </View>
                        </IndicatorViewPager>
                      </View>
                    )}

                    {/* Home Last 10 Games */}
                    {homeLast10Games.length > 0 && (
                      <View style={screenStyles.contentBlock}>
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
                            { height: homeLast10Games.length === 0 ? 120 : homeLast10Games.length * 29 + 110 },
                          ]}
                          indicator={this._renderIndicator()}
                        >
                          <View style={screenStyles.tableSliderItem}>
                            <View style={screenStyles.lineTable}>
                              <LineTable titles={NCAA_MATCHUP_LAST10_TITLE1} list={homeLast10Games} />
                            </View>
                            <View style={screenStyles.footer}>
                              <Text style={screenStyles.footerLabel}>
                                (N) - Indicates games held at a neutral location
                              </Text>
                            </View>
                          </View>
                          <View style={screenStyles.tableSliderItem}>
                            <View style={screenStyles.lineTable}>
                              <LineTable titles={NCAA_MATCHUP_LAST10_TITLE2} list={homeLast10Games} />
                            </View>
                            <View style={screenStyles.footer}>
                              <Text style={screenStyles.footerLabel}>
                                (FG) Field Goals; (OFG) Opponents Field Goals; (REB) Rebounds
                              </Text>
                            </View>
                          </View>
                        </IndicatorViewPager>
                      </View>
                    )}

                    {/* Starting Lineup */}
                    {(awayStartLineup.length > 0 || homeStartLineup.length > 0) && (
                      <View style={screenStyles.contentBlock}>
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
                            <LineTable titles={NCAA_STARTING_LINEUP_TITLE} list={awayStartLineup} />
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
                            <LineTable titles={NCAA_STARTING_LINEUP_TITLE} list={homeStartLineup} />
                          </View>
                        </View>
                        <View style={screenStyles.block}>
                          <View style={screenStyles.footer}>
                            <Text style={screenStyles.footerLabel}>*Based on previous games starting lineup</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </React.Fragment>
                )}
              </View>
            </Animated.ScrollView>
            <LoadingView
              isVisible={!isRefreshing && (nbaMatchupGameStatus === 'pending' || nbaMatchupTeamsStatus === 'pending')}
            />
          </View>
        </React.Fragment>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  nbaMatchupGameStatus: state.nba.nbaMatchupGameStatus,
  nbaMatchupGame: state.nba.nbaMatchupGame,
  nbaMatchupTeamsStatus: state.nba.nbaMatchupTeamsStatus,
  nbaMatchupTeams: state.nba.nbaMatchupTeams,
})

const mapDispatchToProps = dispatch => ({
  getnbamatchupgameRequest: (id: string) => dispatch(NBAActions.getnbamatchupgameRequest(id)),
  getnbamatchupteamsRequest: (awayId: string, homeId: string) =>
    dispatch(NBAActions.getnbamatchupteamsRequest(awayId, homeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NBAMatchup)
