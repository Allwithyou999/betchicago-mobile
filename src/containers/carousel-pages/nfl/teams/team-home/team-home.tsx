import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { GameCard, SectionDivider, Icon, StatsTable, LineTable } from '../../../../../components'
import {
  NFL_SCHEDULE_TITLE,
  NFL_TEAMS_BREAKDOWN,
  NFL_TEAMS_OFFENSIVE_LEADERS_PASSING,
  NFL_TEAMS_OFFENSIVE_LEADERS_RUSHING,
  NFL_TEAMS_OFFENSIVE_LEADERS_RECEIVING,
} from '../../../../../config/constants/nfl'
import { FormatDate } from '../../../../../services'
import * as screenStyles from './team-home.styles'

export interface NFLTeamHomeScreenProps extends NavigationScreenProps<{}> {
  status?: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NFLTeamHomeScreenState {
  isRefreshing: boolean
}

class NFLTeamHome extends React.Component<NFLTeamHomeScreenProps, NFLTeamHomeScreenState> {
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
    let scheduleList = [],
      breakdownList = [],
      offensiveLeaders = {}
    let date = new Date()

    scheduleList = [
      {
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fst-louis-cardinals.png?alt=media',
        name: 'Atalanta',
        score: 'O/U: 48',
        time: '7:20pm',
      },
      {
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fbaltimore-orioles.png?alt=media',
        name: 'Baltimore',
        score: '-4',
        time: '7:21pm',
      },
    ]

    breakdownList = [
      {
        key: 'Overall',
        value: '2-1',
        bold: true,
      },
      {
        key: 'Home',
        value: '1-0',
      },
      {
        key: 'Away',
        value: '1-1',
      },
      {
        key: 'vs. AFC',
        value: '0-0',
      },
      {
        key: 'vs. NFC',
        value: '2-1',
      },
      {
        key: 'Against The Spread (ATS)',
        value: '1-2',
        bold: true,
      },
      {
        key: 'Home',
        value: '1-0',
      },
      {
        key: 'Away',
        value: '1-1',
      },
      {
        key: 'Over/Under',
        value: '2-1',
        bold: true,
      },
    ]

    offensiveLeaders = {
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
    }

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
            <Text style={screenStyles.sectionTitle}>Next Game - {FormatDate(date, 'WW, MMM dd')}</Text>
            <GameCard style={screenStyles.gameCard} titles={NFL_SCHEDULE_TITLE} list={scheduleList} />
          </View>
          <SectionDivider />
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Team Insights</Text>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                The Bears are 10-2 ATS in their last 12 games at Gilette Stadium while going 11-1
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                The Bears are 6-6 ATS in their last 12 games as the visiting team while going 9-3
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>Over is 8-4 in last 12 Bears games</Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>The Bears are 500/1 to win the Super Bowl</Text>
            </View>
          </View>
          <SectionDivider />
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Record Breakdown</Text>
            <StatsTable titles={NFL_TEAMS_BREAKDOWN} list={breakdownList} style={screenStyles.statsTable} />
          </View>
          <SectionDivider />
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Offensive Leaders</Text>
            <LineTable
              style={screenStyles.lineTable}
              titles={NFL_TEAMS_OFFENSIVE_LEADERS_PASSING}
              list={offensiveLeaders['passing']}
            />
            <LineTable
              style={screenStyles.lineTable}
              titles={NFL_TEAMS_OFFENSIVE_LEADERS_RUSHING}
              list={offensiveLeaders['rushing']}
            />
            <LineTable
              style={screenStyles.lineTable}
              titles={NFL_TEAMS_OFFENSIVE_LEADERS_RECEIVING}
              list={offensiveLeaders['receiving']}
            />
          </View>
          <SectionDivider />
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Injury Updates</Text>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB Marshawn Lynch</Text> (knee) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>C Rodney Hudson</Text> (ankle) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB DeAndre Washington</Text> (hamstring) - Questionable Limited
                Participation in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB Marshawn Lynch</Text> (knee) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
            </View>
          </View>
          <SectionDivider />
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Recent Transactions</Text>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB Marshawn Lynch</Text> (knee) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>C Rodney Hudson</Text> (ankle) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB DeAndre Washington</Text> (hamstring) - Questionable Limited
                Participation in Practice (Thurs)
              </Text>
            </View>
            <View style={screenStyles.listTextItem}>
              <Icon
                style={screenStyles.dotIcon}
                iconType="entypo"
                name="dot-single"
                size={36}
                color={Colors.dotColor}
              />
              <Text style={screenStyles.itemText}>
                <Text style={screenStyles.blueText}>RB Marshawn Lynch</Text> (knee) - Questionable Limited Participation
                in Practice (Thurs)
              </Text>
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
)(NFLTeamHome)
