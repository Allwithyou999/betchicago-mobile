import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { LineTable } from '../../../../../components'
import { NFL_TEAMS_PLAYER } from '.././../../../../config/constants/nfl'
import { GetAgeFromBirth } from '../../../../../services/utils'
import * as screenStyles from './team-players.styles'

export interface NFLTeamPlayersScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  players?: Array<object>
  dispatch?: () => void
}

export interface NFLTeamPlayersScreenState {
  isRefreshing: boolean
  playerList: Array<object>
}

class NFLTeamPlayers extends React.Component<NFLTeamPlayersScreenProps, NFLTeamPlayersScreenState> {
  constructor(props) {
    super(props)

    const playerList = []
    if (this.props.players && this.props.players['players']) {
      this.props.players['players'].map(player => {
        const yr = GetAgeFromBirth(new Date(player['birth_date']))

        playerList.push({
          no: player['jersey'],
          player: player['name'],
          pos: player['position'],
          yr: yr ? yr : '',
        })
      })
    }

    this.state = { isRefreshing: false, playerList: playerList }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 5000)
  }

  render() {
    const { playerList } = this.state

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
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Team Roster</Text>
            <LineTable type="extend" style={screenStyles.lineTable} titles={NFL_TEAMS_PLAYER} list={playerList} />
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
)(NFLTeamPlayers)
