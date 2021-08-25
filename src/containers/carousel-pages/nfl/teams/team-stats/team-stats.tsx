import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated, TouchableWithoutFeedback } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { LineTable, AnimatableButton, StatsTable, AnimatedHideView } from '@components'
import {
  NFL_TEAMS_OFFENSIVE_LEADERS_PASSING,
  NFL_TEAMS_OFFENSIVE_LEADERS_RUSHING,
  NFL_TEAMS_OFFENSIVE_LEADERS_RECEIVING,
  NFL_TEAMS_PLAYER_STATS_DEFENSE,
  NFL_TEAMS_PLAYER_STATS_RETURNS,
  NFL_TEAMS_PLAYER_STATS_KICKING,
  NFL_TEAMS_PLAYER_STATS_PUNTING,
  NFL_TEAMS_TEAM_STATS,
} from '.././../../../../config/constants/nfl'
import * as screenStyles from './team-stats.styles'

export interface NFLTeamStatsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NFLTeamStatsScreenState {
  isRefreshing: boolean
  isTeamStatsShow: boolean
}

class NFLTeamStats extends React.Component<NFLTeamStatsScreenProps, NFLTeamStatsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, isTeamStatsShow: false }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 5000)
  }

  onSwitchStats = type => () => {
    if (type === 'team') {
      this.setState({ isTeamStatsShow: true })
    } else {
      this.setState({ isTeamStatsShow: false })
    }
  }

  render() {
    const { isTeamStatsShow } = this.state
    let playerStats = {},
      teamStats = []
    playerStats = {
      passing: [
        {
          player: 'M. Trubisky',
          att: '330',
          comp: '196',
          yds: '2193',
          td: '7',
          int: '7',
        },
        {
          player: 'M. Glennon',
          att: '140',
          comp: '93',
          yds: '833',
          td: '4',
          int: '5',
        },
      ],
      rushing: [
        {
          player: 'J. Howard',
          att: '276',
          yds: '1122',
          avg: '4.1',
          td: '9',
          fum: '1',
        },
        {
          player: 'T. Cohen',
          att: '87',
          yds: '370',
          avg: '4.3',
          td: '2',
          fum: '2',
        },
        {
          player: 'M. Trubisky',
          att: '41',
          yds: '248',
          avg: '6.0',
          td: '2',
          fum: '5',
        },
      ],
      receiving: [
        {
          player: 'K. Wright',
          rec: '59',
          tar: '91',
          yds: '614',
          avg: '10.4',
          td: '1',
        },
        {
          player: 'J. Bellamy',
          rec: '24',
          tar: '46',
          yds: '376',
          avg: '15.7',
          td: '1',
        },
        {
          player: 'T. Cohen',
          rec: '53',
          tar: '71',
          yds: '353',
          avg: '6.8',
          td: '1',
        },
        {
          player: 'K. Wright ',
          rec: '59',
          tar: '91',
          yds: '614',
          avg: '',
          td: '1',
        },
      ],
      defense: [
        {
          player: 'K. Wright ',
          tack: '59',
          asst: '91',
          sack: '614',
          int: '32',
          td: '1',
        },
      ],
      returns: [
        {
          player: 'K. Wright ',
          att: '59',
          tds: '91',
          avg: '614',
          long: '42',
          td: '1',
        },
      ],
      kicking: [
        {
          player: 'K. Wright ',
          fgm: '59',
          fga: '91',
          pct: '614',
          xpm: '23',
          xpa: '1',
        },
      ],
      punting: [
        {
          player: 'K. Wright ',
          punts: '59',
          yds: '91',
          long: '614',
          avg: '234',
          net: '1',
        },
      ],
    }

    teamStats = [
      {
        category: 'Offensive Yards',
        chi: '654',
        opp: '747',
        bold: true,
      },
      {
        category: 'Plays',
        chi: '145',
        opp: '141',
      },
      {
        category: 'Yards/Game',
        chi: '327.0',
        opp: '327.5',
      },
      {
        category: 'Yards/Game',
        chi: '39',
        opp: '42',
        bold: true,
      },
      {
        category: 'Per Game',
        chi: '19.5',
        opp: '21.0',
      },
    ]

    return (
      <ScrollView
        style={screenStyles.ROOT}
        scrollEventThrottle={2}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.props.scrollY } } }])}
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
          <AnimatedHideView visible={isTeamStatsShow}>
            <View style={screenStyles.section}>
              <View style={screenStyles.sectionHeader}>
                <Text style={screenStyles.sectionTitle}>Team Stats</Text>
                <TouchableWithoutFeedback onPress={this.onSwitchStats('player')}>
                  <Text style={screenStyles.switchButtonText}>Player Stats ></Text>
                </TouchableWithoutFeedback>
              </View>
              <StatsTable isShowHeader titles={NFL_TEAMS_TEAM_STATS} list={teamStats} style={screenStyles.statsTable} />
            </View>
          </AnimatedHideView>
          <AnimatedHideView visible={!isTeamStatsShow}>
            <View style={screenStyles.section}>
              <View style={screenStyles.sectionHeader}>
                <Text style={screenStyles.sectionTitle}>Player Stats</Text>
                <TouchableWithoutFeedback onPress={this.onSwitchStats('team')}>
                  <Text style={screenStyles.switchButtonText}>Team Stats ></Text>
                </TouchableWithoutFeedback>
              </View>
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_OFFENSIVE_LEADERS_PASSING}
                list={playerStats['passing']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_OFFENSIVE_LEADERS_RUSHING}
                list={playerStats['rushing']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_OFFENSIVE_LEADERS_RECEIVING}
                list={playerStats['receiving']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_PLAYER_STATS_DEFENSE}
                list={playerStats['defense']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_PLAYER_STATS_RETURNS}
                list={playerStats['returns']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_PLAYER_STATS_KICKING}
                list={playerStats['kicking']}
              />
              <LineTable
                style={screenStyles.lineTable}
                titles={NFL_TEAMS_PLAYER_STATS_PUNTING}
                list={playerStats['punting']}
              />
            </View>
          </AnimatedHideView>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NFLTeamStats)
