import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { LineTable, SectionDivider } from '@components'
import {
  NFL_STATS_TEAM_OFFENSIVE_LEADERS_TOTAL,
  NFL_STATS_TEAM_OFFENSIVE_LEADERS_PASSING,
  NFL_STATS_TEAM_OFFENSIVE_LEADERS_RUSHING,
  NFL_STATS_TEAM_OFFENSIVE_LEADERS_RECEIVING,
  NFL_STATS_TEAM_DEFENSE_LEADERS_SACKS,
  NFL_STATS_TEAM_DEFENSE_LEADERS_TACKLES,
  NFL_STATS_TEAM_DEFENSE_LEADERS_INTERCEPTIONS,
} from '../../../../../config/constants/nfl'
import * as screenStyles from './team-stats.styles'

export interface NFLTeamStatsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface NFLTeamStatsScreenState {
  isRefreshing: boolean
}

class NFLTeamStats extends React.Component<NFLTeamStatsScreenProps, NFLTeamStatsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 5000)
  }

  render() {
    let teamLeaders = {}
    teamLeaders = {
      total: [
        {
          player: 'LA Rams',
          yds: '1318',
          ypg: '432.3',
          pts: '102',
          ppg: '34.0',
        },
        {
          player: 'New Orleans',
          yds: '1284',
          ypg: '428.0',
          pts: '104',
          ppg: '34.7',
        },
        {
          player: 'LA Chargers',
          yds: '1246',
          ypg: '415.3',
          pts: '82',
          ppg: '27.3',
        },
        {
          player: 'Oakland',
          yds: '1202',
          ypg: '415.3',
          pts: '82',
          ppg: '17.3',
        },
        {
          player: 'Kansas City',
          yds: '1195',
          ypg: '398.3',
          pts: '118',
          ppg: '39.3',
        },
      ],
      passing: [
        {
          player: 'New Orleans',
          att: '123',
          comp: '103',
          yds: '1063',
          td: '4',
          int: '2',
        },
        {
          player: 'LA Rams',
          att: '101',
          comp: '71',
          yds: '917',
          td: '4',
          int: '0',
        },
        {
          player: 'Minnesota',
          att: '139',
          comp: '95',
          yds: '917',
          td: '3',
          int: '0',
        },
      ],
      rushing: [
        {
          player: 'Carolina',
          yds: '498',
          ypg: '166.0',
          avg: '5.5',
          td: '88',
          fum: '1',
        },
        {
          player: 'Cleveland',
          yds: '403',
          ypg: '134.0',
          avg: '4.5',
          td: '6',
          fum: '2',
        },
      ],
      receiving: [
        {
          player: 'Carolina',
          yds: '498',
          ypg: '166.0',
          avg: '5.5',
          td: '88',
          fum: '1',
        },
        {
          player: 'Cleveland',
          yds: '403',
          ypg: '134.0',
          avg: '4.5',
          td: '6',
          fum: '2',
        },
      ],
      tackles: [
        {
          player: 'Arizona',
          solo: '174',
          ast: '50',
          ttl: '224',
        },
        {
          player: 'Miami',
          solo: '135',
          ast: '83',
          ttl: '221',
        },
        {
          player: 'Dallas',
          solo: '153',
          ast: '66',
          ttl: '219',
        },
      ],
      sacks: [
        {
          player: 'Chicago',
          sack: '10.2',
          ydsl: '50',
        },
        {
          player: 'Dallas',
          sack: '10.1',
          ydsl: '50',
        },
        {
          player: 'Detroit',
          sack: '10.0',
          ydsl: '50',
        },
      ],
      interceptions: [
        {
          player: 'Miami',
          pd: '16',
          int: '7',
          yds: '151',
          lng: '54',
          td: '0',
        },
        {
          player: 'Seattle',
          pd: '17',
          int: '7',
          yds: '72',
          lng: '39',
          td: '0',
        },
      ],
    }

    return (
      <ScrollView
        style={screenStyles.ROOT}
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
          <View style={screenStyles.offensive}>
            <Text style={screenStyles.statsSubject}>Team Offense Leaders</Text>
            <View>
              <LineTable titles={NFL_STATS_TEAM_OFFENSIVE_LEADERS_TOTAL} list={teamLeaders['total']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <LineTable titles={NFL_STATS_TEAM_OFFENSIVE_LEADERS_PASSING} list={teamLeaders['passing']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <LineTable titles={NFL_STATS_TEAM_OFFENSIVE_LEADERS_RUSHING} list={teamLeaders['rushing']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <LineTable titles={NFL_STATS_TEAM_OFFENSIVE_LEADERS_RECEIVING} list={teamLeaders['receiving']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SectionDivider />
          <View style={screenStyles.defensive}>
            <Text style={screenStyles.statsSubject}>Team Defense Leaders</Text>
            <View>
              <LineTable titles={NFL_STATS_TEAM_DEFENSE_LEADERS_TACKLES} list={teamLeaders['tackles']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <LineTable titles={NFL_STATS_TEAM_DEFENSE_LEADERS_SACKS} list={teamLeaders['sacks']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
            <View>
              <LineTable titles={NFL_STATS_TEAM_DEFENSE_LEADERS_INTERCEPTIONS} list={teamLeaders['interceptions']} />
              <TouchableOpacity>
                <Text style={screenStyles.rankingBtn}>Complete Rankings</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SectionDivider />
          <View style={screenStyles.moreInfo}>
            <Text style={screenStyles.statsSubject}>Additional Team Categories</Text>
            <View style={screenStyles.playerCat}>
              <View style={screenStyles.halfCol}>
                <Text style={screenStyles.infoItem}>Downs</Text>
                <Text style={screenStyles.infoItem}>Kicking</Text>
                <Text style={screenStyles.infoItem}>Punting</Text>
              </View>
              <View style={screenStyles.halfCol}>
                <Text style={screenStyles.infoItem}>Punt Returns</Text>
                <Text style={screenStyles.infoItem}>Kickoff Returns</Text>
                <Text style={screenStyles.infoItem}>Give/Take</Text>
              </View>
            </View>
          </View>
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
