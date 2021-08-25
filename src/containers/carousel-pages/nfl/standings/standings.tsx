import * as React from 'react'
import { View, ScrollView, Text, Image, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import NFLActions from '../../../../actions/nfl'
import { Colors, Images } from '../../../../themes'
import { CrossTable, SectionDivider, LoadingView } from '../../../../components'
import {
  NFL_STANDINGS_AFC_EAST_TITLE,
  NFL_STANDINGS_AFC_NORTH_TITLE,
  NFL_STANDINGS_AFC_SOUTH_TITLE,
  NFL_STANDINGS_AFC_WEST_TITLE,
  NFL_STANDINGS_NFC_EAST_TITLE,
  NFL_STANDINGS_NFC_NORTH_TITLE,
  NFL_STANDINGS_NFC_SOUTH_TITLE,
  NFL_STANDINGS_NFC_WEST_TITLE,
} from '.././../../../config/constants/nfl'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './standings.styles'

export interface NFLStandingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  standingsStatus?: string
  standingsData?: Array<object>
  getstandingsdataRequest?: (year: string) => void
}

export interface NFLStandingsScreenState {
  isRefreshing: boolean
}

class NFLStandings extends React.Component<NFLStandingsScreenProps, NFLStandingsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getstandingsdataRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.standingsStatus !== nextProps.standingsStatus) {
      if (this.state.isRefreshing && nextProps.standingsStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  getStandingsDivisionData = (conf, divi) => {
    const { standingsStatus, standingsData } = this.props
    let teamList = []

    if (standingsStatus === 'done' && standingsData) {
      let confIndex = 0
      if (conf === 'NFC') confIndex = 1
      let divIndex = 0
      if (divi === 'NORTH') divIndex = 1
      if (divi === 'SOUTH') divIndex = 2
      if (divi === 'WEST') divIndex = 3

      standingsData['conferences'][confIndex].divisions[divIndex].teams.map((team, index) => {
        let filename = team.market + ' ' + team.name
        filename = filename.toLowerCase().replace(/ /g, '-')

        const teamInfo = {
          id: team.id,
          icon: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2F${filename}.png?alt=media`,
          name: team.alias,
          w: team.wins ? team.wins : '-',
          l: team.losses ? team.losses : '-',
          t: team.ties ? team.ties : '-',
          ats: '-',
          ou: '-',
        }

        teamList.push(teamInfo)
      })
    }

    return teamList
  }

  onViewTeamInfo = id => {
    // this.props.navigation.navigate('nfl_teams', { teamID: id })
  }

  render() {
    const { isLoadingStart, standingsStatus, standingsData } = this.props
    const { isRefreshing } = this.state

    return (
      <React.Fragment>
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
            <View style={screenStyles.afcContainer}>
              <Image style={screenStyles.nflIcon} source={Images.NFL_AFC_ICON} />
              <Text style={screenStyles.nflName}>AFC</Text>
              <CrossTable
                titles={NFL_STANDINGS_AFC_EAST_TITLE}
                list={this.getStandingsDivisionData('AFC', 'EAST')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_AFC_NORTH_TITLE}
                list={this.getStandingsDivisionData('AFC', 'NORTH')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_AFC_SOUTH_TITLE}
                list={this.getStandingsDivisionData('AFC', 'SOUTH')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_AFC_WEST_TITLE}
                list={this.getStandingsDivisionData('AFC', 'WEST')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
            </View>
            <View style={screenStyles.nfcContainer}>
              <Image style={screenStyles.nflIcon} source={Images.NFL_NFC_ICON} />
              <Text style={screenStyles.nflName}>NFC</Text>
              <CrossTable
                titles={NFL_STANDINGS_NFC_EAST_TITLE}
                list={this.getStandingsDivisionData('NFC', 'EAST')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_NFC_NORTH_TITLE}
                list={this.getStandingsDivisionData('NFC', 'NORTH')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_NFC_SOUTH_TITLE}
                list={this.getStandingsDivisionData('NFC', 'SOUTH')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
              <CrossTable
                titles={NFL_STANDINGS_NFC_WEST_TITLE}
                list={this.getStandingsDivisionData('NFC', 'WEST')}
                style={screenStyles.crossTable}
                onSelected={this.onViewTeamInfo}
              />
            </View>
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || standingsStatus !== 'done')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  standingsStatus: state.nfl.standingsStatus,
  standingsData: state.nfl.standingsData,
})

const mapDispatchToProps = dispatch => ({
  getstandingsdataRequest: (year: string) => dispatch(NFLActions.getstandingsdataRequest(CURRENTYEAR)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NFLStandings))
