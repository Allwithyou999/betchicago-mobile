import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, Animated, Platform, TouchableOpacity } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import GolfActions from '../../../../actions/golf'
import { Icon, PlayerTable, SectionDivider, LoadingView } from '../../../../components'
import { Colors } from '../../../../themes'
import {
  GOLF_RANKING_PLAYER_SESSION1,
  GOLF_RANKING_PLAYER_SESSION2,
  GOLF_RANKING_PLAYER_CHAMPIONSHIP,
} from '../../../../config/constants/golf'
import { FormatMoney, FormatPlayerTourData } from '../../../../services'
import { SEASONYEAR } from '../../../../config/constants/common'
import * as screenStyles from './player-detail.styles'

export interface GolfPlayerDetailProps extends NavigationScreenProps<{}> {
  golfPlayerStats: any
  golfPlayerStatsStatus: string
  golfPlayerTournament: any
  golfPlayerTournamentStatus: string
  getgolfplayerstatsRequest?: (id: string, year: string) => void
  getgolfplayertournamentRequest?: (id: string, year: string) => void
}

export interface GolfPlayerDetailState {
  isRefreshing: boolean
}

class GolfPlayerDetail extends React.Component<GolfPlayerDetailProps, GolfPlayerDetailState> {
  constructor(props) {
    super(props)

    this.state = { isRefreshing: false }
  }

  initialize() {
    const id = this.props.navigation.state.params['id']

    this.props.getgolfplayerstatsRequest(id, SEASONYEAR)
    this.props.getgolfplayertournamentRequest(id, SEASONYEAR)
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

  render() {
    const sessionList1 = [
      {
        rank: '2',
        earnings: '$8,130,678',
        events: '18',
        wins: '2',
        top: '10',
      },
    ]

    const sessionList2 = [
      {
        avescore: '68.993',
        avedrive: '303.7',
        accuracy: '64.86%',
        greens: '70.43%',
      },
    ]

    const championship = [
      {
        r1: '66',
        r2: '67',
        r3: '68',
        r4: '73',
        topar: '-6',
        pos: '4',
        win: '-11',
      },
    ]

    const { golfPlayerStatsStatus, golfPlayerTournamentStatus, golfPlayerStats, golfPlayerTournament } = this.props
    const { isRefreshing } = this.state

    let playerTop = []
    let playerBottom = []
    let recentScore = []

    if (golfPlayerStatsStatus === 'done' && golfPlayerStats) {
      let stats = golfPlayerStats.stats.statistics
      if (!stats) stats = {}
      playerTop = [
        {
          rank: stats.world_rank,
          earnings: '$' + FormatMoney(stats.earnings),
          events: stats.events_played,
          wins: stats.first_place,
          top10: stats.top_10,
        },
      ]

      playerBottom = [
        {
          avescore: stats.scoring_avg,
          avedrive: stats.drive_avg,
          accuracy: stats.drive_acc + '%',
          greens: stats.gir_pct + '%',
        },
      ]
    }

    if (golfPlayerTournamentStatus === 'done' && golfPlayerTournament) {
      try {
        recentScore = FormatPlayerTourData(golfPlayerTournament.recent)
      } catch (e) {}
    }

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <Animated.View style={screenStyles.topHeader}>
          <TouchableOpacity style={screenStyles.closeButton} onPress={this.onClosePopup}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <Icon iconType="material" name="close" size={30} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
        </Animated.View>
        <View style={screenStyles.mainContent}>
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
              <View>
                <Text style={screenStyles.title}>
                  Odds to Win: <Text style={screenStyles.bold}>25/1</Text>
                </Text>
                <View style={screenStyles.section}>
                  <Text style={screenStyles.sectionTitle}>Current session</Text>
                  <PlayerTable
                    style={screenStyles.tableStyle}
                    titles={GOLF_RANKING_PLAYER_SESSION1}
                    list={playerTop}
                    headerBackground
                  />
                  <PlayerTable titles={GOLF_RANKING_PLAYER_SESSION2} list={playerBottom} headerBackground />
                </View>
                <SectionDivider />
                <View style={screenStyles.section}>
                  <Text style={screenStyles.sectionTitle}>MOST RECENT TOURNAMENT FINISHES</Text>
                  {recentScore.map((value, index) => (
                    <React.Fragment key={index}>
                      <Text style={screenStyles.subSectionTitle}>{value.event}</Text>
                      <PlayerTable
                        style={screenStyles.tableStyle}
                        titles={GOLF_RANKING_PLAYER_CHAMPIONSHIP}
                        list={[value]}
                        headerBackground
                      />
                    </React.Fragment>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <LoadingView
            isVisible={
              !isRefreshing && (golfPlayerStatsStatus === 'pending' || golfPlayerTournamentStatus === 'pending')
            }
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  golfPlayerStats: state.golf.golfPlayerStats,
  golfPlayerStatsStatus: state.golf.golfPlayerStatsStatus,
  golfPlayerTournament: state.golf.golfPlayerTournament,
  golfPlayerTournamentStatus: state.golf.golfPlayerTournamentStatus,
})

const mapDispatchToProps = dispatch => ({
  getgolfplayerstatsRequest: (id: string, year: string) => dispatch(GolfActions.getgolfplayerstatsRequest(id, year)),
  getgolfplayertournamentRequest: (id: string, year: string) =>
    dispatch(GolfActions.getgolfplayertournamentRequest(id, year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GolfPlayerDetail)
