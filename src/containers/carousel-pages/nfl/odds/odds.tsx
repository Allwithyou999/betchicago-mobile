import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { SwipeMenu, MatchupTable, SectionDivider, CrossTable, NewsSlider } from '../../../../components'
import { NFL_ODDS_TITLE, NFL_ODDS_FUTURES_TITLE } from '.././../../../config/constants/nfl'
import NFLActions from '../../../../actions/nfl'
import { FormatDate } from '../../../../services'
import * as screenStyles from './odds.styles'

export interface NFLOddsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  status: boolean
  getnflfutureoddsRequest: () => void
}

export interface NFLOddsScreenState {
  isRefreshing: boolean
}

class NFLOdds extends React.Component<NFLOddsScreenProps, NFLOddsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  componentDidMount() {
    //this.props.getnflfutureoddsRequest()
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.)
  }

  _onPageRefresh = () => {
    this.props.getnflfutureoddsRequest()
    this.setState({ isRefreshing: true })
    // Simulate fetching data from the server
  }

  onChangedWeek = index => {
    console.log(index)
  }

  onViewTeamInfo = id => {
    this.props.navigation.navigate('nfl_teams', { teamID: id })
  }

  render() {
    let weekList = [],
      oddsList = [],
      futureOddsList = [],
      newsLists = []

    for (let i = 1; i < 12; i++) {
      weekList.push('Week ' + i)
    }

    oddsList = [
      {
        date: 'Oct 04, 7:20PM CT',
        data: [
          {
            logo:
              'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
            name: 'WAS',
            westgate: '+10 -11  T 48',
            hill: '+10 -11  T 48',
          },
          {
            logo:
              'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
            name: 'MIA',
            westgate: '+10 -11',
            hill: '+10 -11',
          },
        ],
      },
      {
        date: 'Oct 04, 7:21PM CT',
        data: [
          {
            logo:
              'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
            name: 'WAS',
            westgate: '+7 -116  T 58',
            hill: '+10 -11  T 48',
          },
          {
            logo:
              'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
            name: 'MIA',
            westgate: '+7 -105',
            hill: '+8 -105',
          },
        ],
      },
    ]

    futureOddsList = [
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Milwaukee',
        odds: '+333',
      },
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Arizona',
        odds: '+555',
      },
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Cincinnati',
        odds: '+888',
      },
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Milwaukee',
        odds: '+333',
      },
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Arizona',
        odds: '+555',
      },
      {
        icon:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2Farizona-cardinals.png?alt=media',
        name: 'Cincinnati',
        odds: '+888',
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
        title: '2018 Tour Championship odds: Tiger\'s FedEx Cup path and where to find betting value',
      },
      {
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/38tD2YSSb6EWqmW28guIue/9b39752b3c1edfdb15f9ea151c68842a/AP_18259742778836.jpg?h=300&w=400&fm=jpg&fit=fill',
        title: 'Jets at Browns betting lines and preview: Cleveland home favorite for first time since 2015',
      },
    ]

    return (
      <View style={screenStyles.ROOT}>
        {/* <SwipeMenu titles={weekList} onChanged={this.onChangedWeek} /> */}
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
            <Text style={screenStyles.warningText}>Coming soon</Text>
            {/* <Text style={screenStyles.topIntroduction}>
              Odds are provided for entertainment purposes only.{'\n'}Bet Chicago does not set odds or take bets on
              games.{'\n'}Lines are provided by third parties and Bet Chicago makes no guarantee the information is
              accurate or up-to-date.
            </Text>
            <MatchupTable
              titles={NFL_ODDS_TITLE}
              list={oddsList}
              style={screenStyles.matchupTable}
              onSelected={this.onViewTeamInfo}
            />
            <Text style={screenStyles.bottomIntroduction}>
              *Time and odds are subject to change. To change your default odds provider click Account below, then
              select “odds provider”.
            </Text>
            <SectionDivider /> */}
            {/* <Text style={screenStyles.tableTitle}>FUTURES</Text>
            <CrossTable
              titles={NFL_ODDS_FUTURES_TITLE}
              list={futureOddsList}
              style={screenStyles.crossTable}
              onSelected={this.onViewTeamInfo}
            /> */}
            {/* <SectionDivider />
            <NewsSlider type="UC" list={newsLists} /> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({
  getnflfutureoddsRequest: () => dispatch(NFLActions.getnflfutureoddsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NFLOdds))
