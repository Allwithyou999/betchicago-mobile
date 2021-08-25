import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../themes'
import MLBActions from '../../../../actions/mlb'
import { PlayerTable, LoadingView } from '../../../../components'
import { SEASONYEAR } from '../../../../config/constants/common'
import {
  MLB_STANDINGS_MOBILE_EAST_TITLE,
  MLB_STANDINGS_MOBILE_CENTRAL_TITLE,
  MLB_STANDINGS_MOBILE_WEST_TITLE,
} from '.././../../../config/constants/mlb'
import * as screenStyles from './standings.styles'

export interface MLBStandingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  mlbTeamSlugsStatus?: string
  mlbStandingsStatus?: string
  mlbSlugs: Array<object>
  mlbStandingsData: Array<object>
  getmlbteamslugsRequest?: () => void
  getmlbstandingsRequest?: (year: string) => void
}

export interface MLBStandingsScreenState {
  isRefreshing: boolean
}

class MLBStandings extends React.Component<MLBStandingsScreenProps, MLBStandingsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getmlbteamslugsRequest()
    this.props.getmlbstandingsRequest(SEASONYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (
      this.props.mlbTeamSlugsStatus !== nextProps.mlbTeamSlugsStatus ||
      this.props.mlbStandingsStatus !== nextProps.mlbStandingsStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.mlbTeamSlugsStatus === 'done' &&
        nextProps.mlbStandingsStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  buildTeam = (img, name, slug) => (
    <View style={screenStyles.teamInfo}>
      <Image
        source={{
          uri: img,
        }}
        style={screenStyles.teamIcon}
      />
      <Text style={screenStyles.teamName}>{name}</Text>
    </View>
  )

  renderDivision = (league, division, mobileTitle) => {
    const { mlbSlugs } = this.props

    if (!mlbSlugs || !mlbSlugs['slug']) return

    for (let i = 0; i < league.divisions.length; i++) {
      if (league.divisions[i].name === division) {
        let score = league.divisions[i].teams.map(team => {
          let result = {
            w: team.win,
            l: team.loss,
            gb: team.games_back === 0 ? '-' : team.games_back,
          }

          Object.keys(mlbSlugs['slug']).forEach(slug => {
            if (mlbSlugs['slug'][slug].id === team.id) {
              const logo = mlbSlugs['images'].logo_60 + slug + '.png?alt=media'
              result['title'] = this.buildTeam(logo, team.market, slug)
              result['link'] = slug
            }
          })

          return result
        })

        return (
          <View style={screenStyles.tableHolder}>
            <PlayerTable titles={mobileTitle} list={score} tableSmall onPress={this.onViewTeamsDetail} />
          </View>
        )
      }
    }

    return null
  }

  renderLeague = (league, index) => {
    return (
      <View key={index}>
        <Text style={screenStyles.leagueName}>{league.name.toUpperCase()}</Text>
        {this.renderDivision(league, 'East', MLB_STANDINGS_MOBILE_EAST_TITLE)}
        {this.renderDivision(league, 'Central', MLB_STANDINGS_MOBILE_CENTRAL_TITLE)}
        {this.renderDivision(league, 'West', MLB_STANDINGS_MOBILE_WEST_TITLE)}
      </View>
    )
  }

  onViewTeamsDetail = (slug: string) => {
    this.props.navigation.navigate('mlb_teams', { slug, slugs: this.props.mlbSlugs })
  }

  render() {
    const { isLoadingStart, mlbTeamSlugsStatus, mlbStandingsStatus, mlbStandingsData } = this.props
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
            {mlbStandingsData['leagues'] && (
              <View style={screenStyles.standingsContents}>
                <Text style={screenStyles.title}>MLB Standings</Text>
                <Text style={screenStyles.status}>American & National Leagues</Text>
                {mlbStandingsData['leagues'].map((league, index) => this.renderLeague(league, index))}
              </View>
            )}
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing && (!isLoadingStart || mlbTeamSlugsStatus === 'pending' || mlbStandingsStatus === 'pending')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  mlbTeamSlugsStatus: state.mlb.mlbTeamSlugsStatus,
  mlbStandingsStatus: state.mlb.mlbStandingsStatus,
  mlbSlugs: state.mlb.mlbSlugs,
  mlbStandingsData: state.mlb.mlbStandingsData,
})

const mapDispatchToProps = dispatch => ({
  getmlbteamslugsRequest: () => dispatch(MLBActions.getmlbteamslugsRequest()),
  getmlbstandingsRequest: (year: string) => dispatch(MLBActions.getmlbstandingsRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(MLBStandings))
