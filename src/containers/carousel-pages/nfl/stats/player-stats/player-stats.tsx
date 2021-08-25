import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { LeaderTable, SectionDivider, NewsSlider } from '@components'
import * as screenStyles from './player-stats.styles'

export interface NFLPlayerStatsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
  onViewCompleteList?: (type) => void
}

export interface NFLPlayerStatsScreenState {
  isRefreshing: boolean
}

class NFLPlayerStats extends React.Component<NFLPlayerStatsScreenProps, NFLPlayerStatsScreenState> {
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

  // onViewCompleteList = (type) => {
  //   this.props.onViewCompleteList && this.props.onViewCompleteList(type)
  // }

  render() {
    const { onViewCompleteList } = this.props

    let newsLists = [],
      offensiveList = [],
      defendiveList = []

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

    offensiveList = [
      {
        title: 'Passing Yards',
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/6dhWyWNhQWqauKyu4QW6gO/b89fb3f5d9225ab8ca39535977a5a73d/AP_17267099884148.jpg?h=300&w=400&fm=jpg&fit=fill',
        data: [
          ['NO', 'Drew Brees', '1078'],
          ['MIN', 'Kirk Cousins', '965'],
          ['LAR', 'Jared Goff', '936'],
          ['OAK', 'Derek Carr', '901'],
          ['LAC', 'Phillip Rivers', '900'],
        ],
      },
      {
        title: 'Rushing Yards',
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/3O5ueFlSbCsW2YK6mgCsQO/32fb46f52c405f7c3035edc956a5862e/AP_18266077892309.jpg?h=300&w=400&fm=jpg&fit=fill',
        data: [
          ['SF', 'Matt Breida', '274'],
          ['DAL', 'Ezekiel Elliott', '274'],
          ['CAR', 'Christian McCaffrey', '271'],
          ['LAR', 'Todd Gurley', '255'],
          ['WSH', 'Adrian Peterson', '204'],
        ],
      },
    ]

    defendiveList = [
      {
        title: 'Tackles',
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/1c0KMQqrIEmAUiksIy6ckC/68e54dc46a5a22a4de1fdbeb2777017f/AP_344171783551.jpg?h=300&w=400&fm=jpg&fit=fill',
        data: [
          ['IND', 'Darius Leonard', '41'],
          ['MIA', 'Kiko Alonso', '36'],
          ['SF', 'Fred Warner', '34'],
          ['TEN', 'Wesley Woodyard', '31'],
          ['KC', 'Anthony Hitchens', '31'],
        ],
      },
      {
        title: 'SACKS',
        image:
          'http://images.ctfassets.net/p0ykbbcw3bn6/5NxDhCYrXqCkWY4W2k8es2/050603727762cd54cff9a636e663d2df/AP_18266741058503.jpg?h=300&w=400&fm=jpg&fit=fill',
        data: [
          ['DEN', 'Von Miller', '4.0'],
          ['MIA', 'Cameron Jorda', '4.0'],
          ['SF', 'Khalil Mack', '4.0'],
          ['TEN', 'Myles Garrett', '4.0'],
          ['KC', 'DeForest Buckner', '3.5'],
        ],
      },
      {
        title: 'Interceptions',
        image:
          'https://images.ctfassets.net/p0ykbbcw3bn6/5ZB8duqe0o42u8asWWCmiw/66b5606d9f6f75e3f1c87ec947576d74/AP_18294748248818.jpg?h=300&w=400&fm=jpg&fit=fill',
        data: [
          ['MIA', 'Xavien Howard', '3'],
          ['SEA', 'Eari Thomas', '3'],
          ['CAR', 'Donte Jackson', '3'],
          ['MIA', 'Reshad Jones', '2'],
          ['NYJ', 'Darron Lee', '2'],
        ],
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
        <View style={screenStyles.scrollContents}>
          <View style={screenStyles.offensive}>
            <Text style={screenStyles.statsSubject}>Offensive Leaders</Text>
            <LeaderTable list={offensiveList} onPress={onViewCompleteList} />
          </View>
          <SectionDivider />
          <NewsSlider type="UC" list={newsLists} />
          <SectionDivider />
          <View style={screenStyles.defensive}>
            <Text style={screenStyles.statsSubject}>Defensive Leaders</Text>
            <LeaderTable list={defendiveList} />
          </View>
          <SectionDivider />
          <View style={screenStyles.moreInfo}>
            <Text style={screenStyles.statsSubject}>Additional Player Categories</Text>
            <View style={screenStyles.playerCat}>
              <View style={screenStyles.halfCol}>
                <TouchableOpacity onPress={() => onViewCompleteList('touchdowns')}>
                  <Text style={screenStyles.infoItem}>Touchdowns</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onViewCompleteList('kicking')}>
                  <Text style={screenStyles.infoItem}>Kicking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onViewCompleteList('punting')}>
                  <Text style={screenStyles.infoItem}>Punting</Text>
                </TouchableOpacity>
              </View>
              <View style={screenStyles.halfCol}>
                <TouchableOpacity onPress={() => onViewCompleteList('punt-returns')}>
                  <Text style={screenStyles.infoItem}>Punt Returns</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onViewCompleteList('kickoff')}>
                  <Text style={screenStyles.infoItem}>Kickoff Returns</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onViewCompleteList('fumbles')}>
                  <Text style={screenStyles.infoItem}>Fumbles Forced</Text>
                </TouchableOpacity>
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
)(NFLPlayerStats)
