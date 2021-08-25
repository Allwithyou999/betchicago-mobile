import * as React from 'react'
import { View, ScrollView, Text, Image, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import NBAActions from '../../../../actions/nba'
import { Colors, Images } from '../../../../themes'
import { LoadingView, CrossTable } from '../../../../components'
import {
  NBA_STANDINGS_ATLANTIC_TITLE,
  NBA_STANDINGS_CENTRAL_TITLE,
  NBA_STANDINGS_SOUTHEAST_TITLE,
  NBA_STANDINGS_NORTHWEST_TITLE,
  NBA_STANDINGS_PACIFIC_TITLE,
  NBA_STANDINGS_SOUTHWEST_TITLE,
} from '../../../../config/constants/nba'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './standings.styles'

export interface NBAStandingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  nbaStandingsStatus?: string
  nbaStandingsData: Array<object>
  getnbastandingsRequest?: (year: string) => void
}

export interface NBAStandingsScreenState {
  isRefreshing: boolean
}

class NBAStandings extends React.Component<NBAStandingsScreenProps, NBAStandingsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getnbastandingsRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  getNBATitles = (name: string) => {
    switch (name) {
      case 'Atlantic':
        return NBA_STANDINGS_ATLANTIC_TITLE
      case 'Central':
        return NBA_STANDINGS_CENTRAL_TITLE
      case 'Southeast':
        return NBA_STANDINGS_SOUTHEAST_TITLE
      case 'Northwest':
        return NBA_STANDINGS_NORTHWEST_TITLE
      case 'Pacific':
        return NBA_STANDINGS_PACIFIC_TITLE
      case 'Southwest':
        return NBA_STANDINGS_SOUTHWEST_TITLE
      default:
        return NBA_STANDINGS_ATLANTIC_TITLE
    }
  }

  getStadningsData = () => {
    const { nbaStandingsData } = this.props
    let result = []

    nbaStandingsData.map((item: any) => {
      let divisions = []

      item.divisions.map((confs: any) => {
        let data = {
          name: confs.name,
          data: [],
        }

        confs.teams.map((team: any) => {
          const icon = `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnba%2Fteam%2Flogo_60%2F${team.market.replace(
            / /g,
            '-',
          )}-${team.name.replace(/ /g, '-')}.png?alt=media`

          let teamData = {
            id: team.id,
            icon: icon,
            name: team.market,
            w: team.wins,
            l: team.losses,
            l10: '-',
            ats: '-',
            ou: '-',
          }

          data['data'].push(teamData)
        })

        divisions.push(data)
      })

      result.push({
        name: item.name,
        divisions,
      })
    })

    return result
  }

  render() {
    const { isLoadingStart, nbaStandingsStatus } = this.props
    const { isRefreshing } = this.state
    let standingsData: any

    if (nbaStandingsStatus === 'done') {
      standingsData = this.getStadningsData()
    }

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
            {standingsData &&
              standingsData.map((confs: any, index: number) => (
                <View key={index}>
                  <Text style={screenStyles.title}>{confs.name}</Text>
                  {confs.divisions.map((conf: any, tindex: number) => (
                    <CrossTable
                      key={tindex}
                      titles={this.getNBATitles(conf['name'])}
                      list={conf['data']}
                      style={screenStyles.crossTable}
                    />
                  ))}
                </View>
              ))}
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || nbaStandingsStatus === 'pending')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  nbaStandingsStatus: state.nba.nbaStandingsStatus,
  nbaStandingsData: state.nba.nbaStandingsData,
})

const mapDispatchToProps = dispatch => ({
  getnbastandingsRequest: (year: string) => dispatch(NBAActions.getnbastandingsRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NBAStandings))
