import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { LineTable, SectionDivider } from '@components'
import { NFL_STATS_TOTAL_OFFENSIVE } from '../../../../../config/constants/nfl'
import * as screenStyles from './complete-list.styles'

export interface NFLStatsCompleteListScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface NFLStatsCompleteListScreenState {
  isRefreshing: boolean
}

class NFLStatsCompleteList extends React.Component<NFLStatsCompleteListScreenProps, NFLStatsCompleteListScreenState> {
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
    let list = []
    list = [
      {
        team: 'LA Rams',
        ypg: '439.3',
        rush: '104.6',
        rec: '268.7',
        ppg: '34.0',
      },
      {
        team: 'LA Rams',
        ypg: '439.3',
        rush: '104.6',
        rec: '268.7',
        ppg: '34.0',
      },
      {
        team: 'LA Rams',
        ypg: '439.3',
        rush: '104.6',
        rec: '268.7',
        ppg: '34.0',
      },
      {
        team: 'LA Rams',
        ypg: '439.3',
        rush: '104.6',
        rec: '268.7',
        ppg: '34.0',
      },
    ]

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
        <View style={screenStyles.offensive}>
          <Text style={screenStyles.statsSubject}>Total Offensive</Text>
          <LineTable type="extend" titles={NFL_STATS_TOTAL_OFFENSIVE} list={list} />
        </View>
        <SectionDivider />
        <View style={screenStyles.scrollContents}>
          <View style={screenStyles.moreInfo}>
            <Text style={screenStyles.statsSubject}>Team Statistics</Text>
            <View style={screenStyles.playerCat}>
              <View style={screenStyles.halfCol}>
                <Text style={screenStyles.infoItemHeader}>OFFENSIVE</Text>
                <Text style={screenStyles.infoItem}>Total Offense</Text>
                <Text style={screenStyles.infoItem}>Rushing Offense</Text>
                <Text style={screenStyles.infoItem}>Passing Offense</Text>
                <Text style={screenStyles.infoItem}>Receiving Offense</Text>
                <Text style={screenStyles.infoItem}>First Downs</Text>
                <Text style={screenStyles.infoItem}>3rd Down Conv</Text>
                <Text style={screenStyles.infoItem}>4th Down Conv</Text>
              </View>
              <View style={screenStyles.halfCol}>
                <Text style={screenStyles.infoItemHeader}>DEFENSE</Text>
                <Text style={screenStyles.infoItem}>Total Defense</Text>
                <Text style={screenStyles.infoItem}>Rushing Defense</Text>
                <Text style={screenStyles.infoItem}>Passing Defense</Text>
                <Text style={screenStyles.infoItem}>Receiving Defense</Text>
                <Text style={screenStyles.infoItem}>Sacks</Text>
                <Text style={screenStyles.infoItem}>Interceptions</Text>
                <Text style={screenStyles.infoItem}>Fumbles Forced</Text>
              </View>
            </View>
            <View style={screenStyles.playerCat}>
              <View style={screenStyles.halfCol}>
                <Text style={screenStyles.infoItemHeader}>SPECIAL TEAMS</Text>
                <Text style={screenStyles.infoItem}>Field Goals</Text>
                <Text style={screenStyles.infoItem}>Extra Points</Text>
                <Text style={screenStyles.infoItem}>Punting</Text>
                <Text style={screenStyles.infoItem}>Kickoff Returns</Text>
                <Text style={screenStyles.infoItem}>Punt Returns</Text>
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
)(NFLStatsCompleteList)
