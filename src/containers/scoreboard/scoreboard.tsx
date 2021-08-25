import * as React from 'react'
import { ScrollView, Text, RefreshControl, TouchableOpacity, View, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment-timezone'
import Immutable from 'seamless-immutable'
import AppActions from '../../actions/app'
import NCAAActions from '../../actions/ncaa'
import MLBActions from '../../actions/mlb'
import { SwipeMenu, LoadingView, GameCard, RoundTable } from '../../components'
import { Colors, Images } from '../../themes'
import { NCAA_SCHEDULE_TITLE, NCAA_Final_SCHEDULE_TITLE } from '../../config/constants/ncaa'
import { NFL_SCHEDULE_TITLE, NFL_Final_SCHEDULE_TITLE } from '../../config/constants/nfl'
import { PGA_ROUND2_TITLE } from '../../config/constants/pga'
import { FormatDateFull, FormatAMPM } from '../../services'
import { Metrics } from '../../themes'
import * as screenStyles from './scoreboard.styles'

export interface AddScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  navigateToPage: (page: string) => void

  ncaaScheduleStatus?: string
  ncaaScheduleData?: Array<Array<object>>
  getncaascheduledataRequest?: (date: string) => void

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

export interface AddScreenState {
  isRefreshing: boolean
  selectedDate: string
  dayList: Array<string>
}

class Add extends React.Component<AddScreenProps, AddScreenState> {
  isLoadingDateMenu = false
  isFirstLoadDateMenu = true
  prevDayCount = 50
  afterDayCount = 50

  constructor(props: AddScreenProps) {
    super(props)
    let dayList = this.getDynamicDayList(this.prevDayCount, this.afterDayCount)
    this.state = {
      isRefreshing: false,
      selectedDate: moment()
        .tz('America/Chicago')
        .format('YYYY/MM/DD'),
      dayList: dayList,
    }
  }

  initialize(init?: boolean) {
    const date = new Date(this.state.selectedDate)
    this.props.getncaascheduledataRequest(this.state.selectedDate)

    this.props.getmlbscoreboarddataRequest(this.state.selectedDate)
    this.props.getmlbscoreboardoddsRequest(date)
    if (init) this.props.getmlbteamslugsRequest()
  }

  componentDidMount() {
    this.initialize(true)
  }

  componentWillReceiveProps(nextProps: AddScreenProps) {
    if (this.props.ncaaScheduleStatus !== nextProps.ncaaScheduleStatus) {
      if (this.state.isRefreshing && nextProps.ncaaScheduleStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  getDynamicDayList = (before: number, after: number) => {
    let list = []
    for (let i = before; i >= -1 * after; i--) {
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
      this.prevDayCount += 15
      let dayList = this.getDynamicDayList(this.prevDayCount, this.afterDayCount)
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
    } else if (
      !this.isLoadingDateMenu &&
      event.nativeEvent.contentSize.width - event.nativeEvent.contentOffset.x < Metrics.screenWidth * 2
    ) {
      this.isLoadingDateMenu = true
      this.afterDayCount += 15
      let dayList = this.getDynamicDayList(this.prevDayCount, this.afterDayCount)

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

  onChangedWeek = (date: string) => {
    this.setState(
      {
        selectedDate: date,
      },
      () => {
        this.initialize()
      },
    )
  }

  arrangeNCAAData = (data: any) => {
    let games = []

    data.map((team, index) => {
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

      games.push(team)
    })

    return games
  }

  arrangeMLBData = (scoreData: any, oddsData: any, slugs: any) => {
    const { selectedDate } = this.state
    let games = {
      lists: [],
      game: [],
    }

    if (!scoreData['league'] || !scoreData['league']['games'] || !slugs['slug']) return []

    Immutable.asMutable(scoreData['league']['games'])
      .sort((a, b) => new Date(a.game.scheduled).getTime() - new Date(b.game.scheduled).getTime())
      .forEach((item: object) => {
        let game = JSON.parse(JSON.stringify(item['game']))
        let homeLogo, awayLogo

        Object.keys(slugs['slug']).forEach(slug => {
          if (slugs['slug'][slug].id === game.away_team) {
            awayLogo = slugs['images'].logo_60 + slug + '.png?alt=media'
            game.away_logo = awayLogo
            game.away_bg = slugs['images'].background + slug + '-away.png?alt=media'
            game.away_color = slugs['slug'][slug]['bg-color']
          } else if (slugs['slug'][slug].id === game.home_team) {
            homeLogo = slugs['images'].logo_60 + slug + '.png?alt=media'
            game.home_logo = homeLogo
            game.home_bg = slugs['images'].background + slug + '-home.png?alt=media'
            game.home_color = slugs['slug'][slug]['bg-color']
          }
        })

        if (oddsData) {
          oddsData
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

        const { home, away } = game
        let id = '17084'
        let oddValue = '-',
          homeMl = '--',
          awayMl = '--'
        const markets = game.odd ? game.odd.markets || [] : []

        !!markets[1] &&
          markets[1].books.forEach(book => {
            if (book.id.indexOf(id) !== -1 && !!book.outcomes) {
              book.outcomes.forEach(out => {
                if (out.odds.substr(0, 1) === '-') {
                  oddValue = out.total
                }
              })
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

        let result: Array<object> = [
          {
            logo: awayLogo,
            name: away.abbr.toUpperCase(),
            ou: parseInt(awayMl) < 0 ? awayMl : `O/U: ${oddValue}`,
            time: FormatAMPM(new Date(game.scheduled)),
            score: away.runs > home.runs ? <Text style={screenStyles.bold}>{away.runs}</Text> : away.runs,
            data: game.status !== 'closed' ? '' : 'Final',
            status: game.status,
            game: game,
          },
          {
            logo: homeLogo,
            name: home.abbr.toUpperCase(),
            ou: parseInt(awayMl) < 0 ? `O/U: ${oddValue}` : homeMl,
            time: '',
            score: home.runs > away.runs ? <Text style={screenStyles.bold}>{home.runs}</Text> : home.runs,
            data: '',
            status: game.status,
          },
        ]

        games['lists'].push(result)
        games['game'].push(game)
      })

    return games
  }

  onToFullCoverage = (type: string) => () => {
    this.props.navigation.navigate('home')
    this.props.navigateToPage(type)
  }

  onViewNCAAMatchupGame = (team: Array<any>, date: string) => () => {
    this.props.navigation.navigate('ncaa_matchup', { team: team, date: date })
  }

  onViewGameCoverage = (game: any, list: any) => () => {
    const awayScore = game['status'] !== 'closed' ? list[0]['ou'] : list[0]['score']
    const homeScore = game['status'] !== 'closed' ? list[1]['ou'] : list[1]['score']

    this.props.navigation.navigate('mlb_matchup', {
      team: game,
      date: this.state.selectedDate,
      score: [awayScore, homeScore],
    })
  }

  render() {
    const {
      ncaaScheduleStatus,
      ncaaScheduleData,
      mlbScoreboardDataStatus,
      mlbScoreboardOddsStatus,
      mlbTeamSlugsStatus,
      mlbScoreboardData,
      mlbScoreboardOdds,
      mlbSlugs,
    } = this.props
    const { dayList, selectedDate } = this.state
    const players = [
      {
        pos: 'T1',
        player: 'Phil Mickelson',
        score: <Text style={screenStyles.bold}>-10</Text>,
        today: '-4',
      },
      {
        pos: 'T1',
        player: 'Phil Mickelson',
        score: <Text style={screenStyles.bold}>-10</Text>,
        today: '-4',
      },
      {
        pos: 'T1',
        player: 'Phil Mickelson',
        score: <Text style={screenStyles.bold}>-10</Text>,
        today: '-6(16)',
      },
      {
        pos: 'T1',
        player: 'Phil Mickelson',
        score: <Text style={screenStyles.bold}>-10</Text>,
        today: '-4',
      },
    ]

    let ncaaGames = [],
      mlbGames = {},
      golfGames = []

    if (ncaaScheduleStatus === 'done' && ncaaScheduleData && ncaaScheduleData[selectedDate]) {
      ncaaGames = this.arrangeNCAAData(ncaaScheduleData[selectedDate])
    }

    if (
      mlbScoreboardDataStatus === 'done' &&
      mlbScoreboardOddsStatus === 'done' &&
      mlbTeamSlugsStatus === 'done' &&
      mlbScoreboardData &&
      mlbScoreboardOdds &&
      mlbSlugs &&
      mlbScoreboardData[selectedDate] &&
      mlbScoreboardOdds[selectedDate]
    ) {
      mlbGames = this.arrangeMLBData(mlbScoreboardData[selectedDate], mlbScoreboardOdds[selectedDate], mlbSlugs)
    }

    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.topBanner}>
          <Image style={screenStyles.topLogoImg} source={Images.TEXT_LOGO} />
        </View>
        <SwipeMenu
          type="date"
          background="#111111"
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
            <Text style={screenStyles.pageTitle}>LIVE SCOREBOARD</Text>
            <Text style={screenStyles.pageSubTitle}>
              Brought to you by <Text style={screenStyles.bold}>BetChicago.com</Text>
            </Text>
            {ncaaScheduleStatus !== 'pending' &&
            mlbScoreboardDataStatus !== 'pending' &&
            mlbScoreboardOddsStatus !== 'pending' &&
            mlbTeamSlugsStatus !== 'pending' ? (
              <React.Fragment>
                <Animatable.View style={screenStyles.mainContent}>
                  {/* <View style={screenStyles.section}>
                  <View style={screenStyles.subjectContainer}>
                    <Text style={screenStyles.subject}>Favorites</Text>
                  </View>
                  <GameCard
                    style={screenStyles.gameCard}
                    titles={NFL_SCHEDULE_TITLE}
                    list={team}
                    iconSize={{ width: 24, height: 24 }}
                  />
                  </View> */}
                  {/*** NCAA Scheduled Games ***/}
                  {ncaaGames &&
                    ncaaGames.length > 0 && (
                      <View style={screenStyles.section}>
                        <View style={screenStyles.subjectContainer}>
                          <Text style={screenStyles.subject}>NCAAM</Text>
                          <TouchableOpacity onPress={this.onToFullCoverage('NCAA BB')}>
                            <Text style={screenStyles.fullCoverage}>FULL COVERAGE ></Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          {ncaaGames.map((team, index) => (
                            <TouchableOpacity key={index} onPress={this.onViewNCAAMatchupGame(team, selectedDate)}>
                              <GameCard
                                style={screenStyles.gameCard}
                                titles={
                                  team[0]['status'] !== 'closed' ? NCAA_SCHEDULE_TITLE : NCAA_Final_SCHEDULE_TITLE
                                }
                                list={team}
                                iconSize={{ width: 24, height: 24 }}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )}
                  {/*** MLB Scheduled Games ***/}
                  {mlbGames['lists'] &&
                    mlbGames['lists'].length > 0 && (
                      <View style={screenStyles.section}>
                        <View style={screenStyles.subjectContainer}>
                          <Text style={screenStyles.subject}>MLB</Text>
                          <TouchableOpacity onPress={this.onToFullCoverage('MLB')}>
                            <Text style={screenStyles.fullCoverage}>FULL COVERAGE ></Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          {mlbGames['lists'].map((team, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={this.onViewGameCoverage(mlbGames['game'][index], team)}
                            >
                              <GameCard
                                style={screenStyles.gameCard}
                                titles={
                                  team[0]['status'] !== 'closed' ? NCAA_SCHEDULE_TITLE : NCAA_Final_SCHEDULE_TITLE
                                }
                                list={team}
                                iconSize={{ width: 24, height: 24 }}
                              />
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )}
                  {/*** Modelo AD ***/}
                  {/* <View style={screenStyles.sponsorAd}>
                <Image style={screenStyles.ADImg} source={Images.LIVESCORE_BANNER} />
                <Text style={screenStyles.ADSubject}>Sponsor activation AD</Text>
                <View style={screenStyles.ADDescView}>
                  <Text style={screenStyles.ADDesc}>{`Play the modelo especial\nChampions League Parlay`}</Text>
                </View>
              </View> */}
                  {/*** Golf Scheduled Games ***/}
                  {/* <View style={screenStyles.section}>
                <View style={screenStyles.subjectContainer}>
                  <Text style={screenStyles.subject}>PGA</Text>
                  <TouchableOpacity onPress={this.onToFullCoverage('Golf')}>
                    <Text style={screenStyles.fullCoverage}>FULL COVERAGE ></Text>
                  </TouchableOpacity>
                </View>
                <Text style={screenStyles.pgaTitle}>AT&T Pebble Beach Pro-Am</Text>
                <View style={screenStyles.pgaInfoRow}>
                  <Text style={screenStyles.pgaInfoLable}>Location:</Text>
                  <Text style={screenStyles.pgaInfoValue}>Pebble Beach, CA</Text>
                </View>
                <View style={screenStyles.pgaInfoRow}>
                  <Text style={screenStyles.pgaInfoLable}>Course:</Text>
                  <Text style={screenStyles.pgaInfoValue}>
                    Pebble Beach Golf Links, MPCC - Shore Course, Spyglass Hill Golf, Course
                  </Text>
                </View>
                <View style={screenStyles.pgaInfoRow}>
                  <Text style={screenStyles.pgaInfoLable}>Purse:</Text>
                  <Text style={screenStyles.pgaInfoValue}>$7.6M</Text>
                </View>
                <Text style={screenStyles.tableTitle}>Round 2 - Suspended</Text>
                <RoundTable titles={PGA_ROUND2_TITLE} list={players} style={screenStyles.roundTable} />
                <TouchableOpacity>
                  <Text style={screenStyles.fullLeaderBoardBtn}>FULL LEADERBOARD ></Text>
                </TouchableOpacity>
              </View>
             */}
                </Animatable.View>
                <View style={screenStyles.footer}>
                  <Text style={screenStyles.footerLabel}>*Time and odds are subject to change.</Text>
                </View>
              </React.Fragment>
            ) : (
              <View style={screenStyles.loadingView}>
                <LoadingView
                  isVisible={
                    ncaaScheduleStatus === 'pending' ||
                    mlbScoreboardDataStatus === 'pending' ||
                    mlbScoreboardOddsStatus === 'pending' ||
                    mlbTeamSlugsStatus === 'pending'
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  ncaaScheduleStatus: state.ncaa.ncaaScheduleStatus,
  ncaaScheduleData: state.ncaa.ncaaScheduleData,

  mlbScoreboardDataStatus: state.mlb.mlbScoreboardDataStatus,
  mlbScoreboardOddsStatus: state.mlb.mlbScoreboardOddsStatus,
  mlbTeamSlugsStatus: state.mlb.mlbTeamSlugsStatus,
  mlbScoreboardData: state.mlb.mlbScoreboardData,
  mlbScoreboardOdds: state.mlb.mlbScoreboardOdds,
  mlbSlugs: state.mlb.mlbSlugs,
})

const mapDispatchToProps = dispatch => ({
  navigateToPage: (page: string) => dispatch(AppActions.navigateToPage(page)),

  getncaascheduledataRequest: (date: string) => dispatch(NCAAActions.getncaascheduledataRequest(date)),

  getmlbscoreboarddataRequest: (date: string) => dispatch(MLBActions.getmlbscoreboarddataRequest(date)),
  getmlbscoreboardoddsRequest: (date: Date) => dispatch(MLBActions.getmlbscoreboardoddsRequest(date)),
  getmlbteamslugsRequest: () => dispatch(MLBActions.getmlbteamslugsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Add)
