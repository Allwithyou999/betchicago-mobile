import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { AnimatedHideView } from '@components'
import { NFLPlayerStats, NFLTeamStats, NFLStatsCompleteList } from '../../stats'
import * as screenStyles from './stats.styles'

export interface NFLStatsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  status: boolean
  dispatch?: () => void
}

export interface NFLStatsScreenState {
  showStatsType: 'player' | 'team' | 'complete'
}

class NFLStats extends React.Component<NFLStatsScreenProps, NFLStatsScreenState> {
  constructor(props) {
    super(props)
    this.state = { showStatsType: 'player' }
  }

  switchStats = type => () => {
    if (type === 'player') {
      this.setState({ showStatsType: 'player' })
    } else {
      this.setState({ showStatsType: 'team' })
    }
  }

  onViewCompleteList = type => {
    this.setState({ showStatsType: 'complete' })
  }

  render() {
    const { showStatsType } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.statsNavBar}>
          <TouchableOpacity style={screenStyles.navBarButton} onPress={this.switchStats('player')}>
            <Text style={[screenStyles.navBarText, showStatsType === 'player' ? screenStyles.boldText : {}]}>
              Player Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={screenStyles.navBarButton} onPress={this.switchStats('team')}>
            <Text style={[screenStyles.navBarText, showStatsType === 'team' ? screenStyles.boldText : {}]}>
              Team Stats
            </Text>
          </TouchableOpacity>
        </View>
        <AnimatedHideView visible={showStatsType === 'player'}>
          <NFLPlayerStats onViewCompleteList={this.onViewCompleteList} />
        </AnimatedHideView>
        <AnimatedHideView visible={showStatsType === 'team'}>
          <NFLTeamStats />
        </AnimatedHideView>
        <AnimatedHideView visible={showStatsType === 'complete'}>
          <NFLStatsCompleteList />
        </AnimatedHideView>
      </View>
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
)(NFLStats)
