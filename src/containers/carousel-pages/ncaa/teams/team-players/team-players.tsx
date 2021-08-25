import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import { Colors } from '../../../../../themes'
import { LineTable } from '../../../../../components'
import { NCAA_TEAM_PLAYER_TITLE1, NCAA_TEAM_PLAYER_TITLE2 } from '.././../../../../config/constants/ncaa'
import * as screenStyles from './team-players.styles'

export interface NCAATeamPlayersScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NCAATeamPlayersScreenState {
  isRefreshing: boolean
}

class NCAATeamPlayers extends React.Component<NCAATeamPlayersScreenProps, NCAATeamPlayersScreenState> {
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

  _renderIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={2}
        style={{ bottom: 25 }}
        dotStyle={screenStyles.dotStyle}
        selectedDotStyle={screenStyles.selectedDotStyle}
      />
    )
  }

  render() {
    const list = [
      [
        {
          p: 'G',
          player: 'T.Battle',
          pts: '18.4',
          fg: '33.6',
          pt: '21.5',
          ft: '78.2',
        },
        {
          p: 'F',
          player: 'E.Hughes',
          pts: '20.0',
          fg: '65.0',
          pt: '45.6',
          ft: '65.7',
        },
        {
          p: 'G',
          player: 'F.Howard',
          pts: '12.4',
          fg: '56.7',
          pt: '56.3',
          ft: '100.0',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          pts: '14.3',
          fg: '48.7',
          pt: '34.5',
          ft: '88.9',
        },
      ],
      [
        {
          p: 'G',
          player: 'T.Battle',
          reb: '18.4',
          ast: '33.6',
          stl: '21.5',
          to: '78.2',
        },
        {
          p: 'F',
          player: 'E.Hughes',
          reb: '20.0',
          ast: '65.0',
          stl: '45.6',
          to: '65.7',
        },
        {
          p: 'G',
          player: 'F.Howard',
          reb: '12.4',
          ast: '56.7',
          stl: '56.3',
          to: '100.0',
        },
        {
          p: 'F',
          player: 'O.Brissett',
          reb: '14.3',
          ast: '48.7',
          stl: '34.5',
          to: '88.9',
        },
      ],
    ]

    return (
      <IndicatorViewPager style={screenStyles.indicatorViewPager} indicator={this._renderIndicator()}>
        <View>
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
                <Text style={screenStyles.sectionTitle}>Players & Game Averages</Text>
                <LineTable style={screenStyles.lineTable} titles={NCAA_TEAM_PLAYER_TITLE1} list={list[0]} />
              </View>
              <View style={screenStyles.section}>
                <Text style={screenStyles.introduction}>
                  {`All columns are per game or overall percentage for the season.\nSwipe to see rebounds, assists, steals and turnovers.`}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View>
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
                <Text style={screenStyles.sectionTitle}>Players & Game Averages</Text>
                <LineTable style={screenStyles.lineTable} titles={NCAA_TEAM_PLAYER_TITLE2} list={list[1]} />
              </View>
              <View style={screenStyles.section}>
                <Text style={screenStyles.introduction}>
                  {`All columns are per game or overall percentage for the season.\nSwipe to points, field goal, 3-pointer, and free throw percentages.`}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </IndicatorViewPager>
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
)(NCAATeamPlayers)
