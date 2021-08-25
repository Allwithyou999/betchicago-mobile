import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { GameCard, SectionDivider, NewsSlider } from '@components'
import { NFL_TEAMS_SCHEDULE } from '.././../../../../config/constants/nfl'
import * as screenStyles from './team-schedule.styles'

export interface NFLTeamScheduleScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NFLTeamScheduleScreenState {
  isRefreshing: boolean
}

class NFLTeamSchedule extends React.Component<NFLTeamScheduleScreenProps, NFLTeamScheduleScreenState> {
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
      newsLists = []
    scheduleList = [
      {
        index: 1,
        date: 'Sep 9',
        separator: '@',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fst-louis-cardinals.png?alt=media',
        name: 'Atalanta',
        time: '12:20pm',
      },
      {
        index: 2,
        date: 'Sep 17',
        separator: 'vs',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fbaltimore-orioles.png?alt=media',
        name: 'Baltimore',
        time: '9:20pm',
      },
      {
        index: 3,
        date: 'Sep 23',
        separator: '@',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Ftoronto-blue-jays.png?alt=media',
        name: 'Toronto',
        time: '7:30pm',
      },
      {
        index: 4,
        date: 'Sep 30',
        separator: 'vs',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Farizona-diamondbacks.png?alt=media',
        name: 'Arizona',
        time: '8:30pm',
      },
      {
        index: 5,
        date: 'Oct 8',
        separator: 'vs',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fnew-york-yankees.png?alt=media',
        name: 'New York',
        time: '11:30pm',
      },
      {
        index: 6,
        date: 'Oct 9',
        separator: 'vs',
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fmlb%2Fteam%2Flogo_60%2Fnew-york-yankees.png?alt=media',
        name: 'New York',
        time: '11:30pm',
      },
    ]

    newsLists = [
      {
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/3tmXXIFhAkeo66imKQ0ea2/0a8d94cfb5c4ab382e7465dff4c7fcf7/AP_18252607833369.jpg?h=300&w=400&fm=jpg&fit=fill',
        title: 'Week 3 NFL trend plays: Lions in tough spot with Pats coming off a loss',
      },
      {
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/3vdp5lklioE24aOGmCCOcU/d0fcaed7e65b22543d140257828bf46c/AP_18217649555022.jpg?h=300&w=400&fm=jpg&fit=fill',
        title: "2018 Tour Championship odds: Tiger's FedEx Cup path and where to find betting value",
      },
      {
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/38tD2YSSb6EWqmW28guIue/9b39752b3c1edfdb15f9ea151c68842a/AP_18259742778836.jpg?h=300&w=400&fm=jpg&fit=fill',
        title: 'Jets at Browns betting lines and preview: Cleveland home favorite for first time since 2015',
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
            <Text style={screenStyles.sectionTitle}>Regular Season 2018</Text>
            <GameCard type="extend" style={screenStyles.gameCard} titles={NFL_TEAMS_SCHEDULE} list={scheduleList} />
          </View>
          <SectionDivider />
          <NewsSlider type="UC" list={newsLists} />
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
)(NFLTeamSchedule)
