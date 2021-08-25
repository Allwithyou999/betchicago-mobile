import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../../themes'
import { LineTable, LoadingView } from '../../../../../components'
import { NCAA_TEAM_SCHEDULE_TITLE } from '.././../../../../config/constants/ncaa'
import * as screenStyles from './team-schedule.styles'

export interface NCAATeamScheduleScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NCAATeamScheduleScreenState {
  isRefreshing: boolean
}

class NCAATeamSchedule extends React.Component<NCAATeamScheduleScreenProps, NCAATeamScheduleScreenState> {
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
    let list = [
      {
        date: '01/08',
        opp: 'SJU',
        score: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 76-71
          </Text>
        ),
        line: 'L -6.5',
        ou: 'U 148.5',
      },
      {
        date: '01/05',
        opp: '@PROV',
        score: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 65-96
          </Text>
        ),
        line: 'W -3',
        ou: 'U 137',
      },
      {
        date: '01/08',
        opp: 'DEP',
        score: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 76-71
          </Text>
        ),
        line: (
          <Text>
            <Text style={screenStyles.boldText}>L</Text> 12
          </Text>
        ),
        ou: 'P 141',
      },
      {
        date: '01/08',
        opp: 'UCONN (N)',
        score: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 76-71
          </Text>
        ),
        line: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 8
          </Text>
        ),
        ou: 'P 145',
      },
      {
        date: '01/08',
        opp: '@KU',
        score: (
          <Text>
            <Text style={screenStyles.boldText}>W</Text> 76-71
          </Text>
        ),
        line: (
          <Text>
            <Text style={screenStyles.boldText}>L</Text> 6.5
          </Text>
        ),
        ou: 'U 148.5',
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
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>November 2018</Text>
            <LineTable style={screenStyles.lineTable} titles={NCAA_TEAM_SCHEDULE_TITLE} list={list} />
          </View>
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>December 2018</Text>
            <LineTable style={screenStyles.lineTable} titles={NCAA_TEAM_SCHEDULE_TITLE} list={list} />
          </View>
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>January 2019</Text>
            <LineTable style={screenStyles.lineTable} titles={NCAA_TEAM_SCHEDULE_TITLE} list={list} />
          </View>

          <View style={screenStyles.section}>
            <Text style={screenStyles.introduction}>
              *Time and odds are subject to change. To change your default odds provider click Account below, then
              select “odds provider”.
            </Text>
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
)(NCAATeamSchedule)
