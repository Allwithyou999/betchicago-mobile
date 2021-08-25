import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import GolfActions from '../../../../actions/golf'
import { Colors } from '../../../../themes'
import { PlayerTable, LoadingView } from '../../../../components'
import { RANKING_TITLE } from '.././../../../config/constants/golf'
import { SEASONYEAR } from '../../../../config/constants/common'
import { FormatDate } from '../../../../services/utils'
import * as screenStyles from './rankings.styles'

export interface GolfRankingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  golfRankingStatus: string
  golfRankingList: Array<object>
  getgolfrankinglistRequest?: (year: string) => void
}

export interface GolfRankingsScreenState {
  isRefreshing: boolean
}

class GolfRankings extends React.Component<GolfRankingsScreenProps, GolfRankingsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getgolfrankinglistRequest(SEASONYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.golfRankingStatus !== nextProps.golfRankingStatus) {
      if (this.state.isRefreshing && nextProps.golfRankingStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onViewPlayerDetails = (id: String) => {
    console.log('player id:', id)
    this.props.navigation.navigate('golf_player', { id })
  }

  render() {
    const { isLoadingStart, golfRankingStatus, golfRankingList } = this.props
    const { isRefreshing } = this.state

    let rankList = []

    if (golfRankingList['players']) {
      rankList = golfRankingList['players'].map((rank, index) => ({
        pos: rank.rank,
        name: rank.first_name + ' ' + rank.last_name,
        events: rank.statistics.events_played,
        points: rank.statistics.points,
        link: rank.id,
      }))
    }

    return (
      <React.Fragment>
        {golfRankingList['name'] ? (
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
              <Text style={screenStyles.rankingName}>{golfRankingList['name']}</Text>
              <Text style={screenStyles.rankingUpdate}>
                {`Last Update: ${FormatDate(new Date(golfRankingList['updated_at']), 'mm dd, yyyy')}`}
              </Text>
              <PlayerTable titles={RANKING_TITLE} list={rankList} onPress={this.onViewPlayerDetails} />
            </View>
          </ScrollView>
        ) : (
          <LoadingView isVisible={!isRefreshing && (!isLoadingStart || golfRankingStatus !== 'done')} />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  golfRankingStatus: state.golf.golfRankingStatus,
  golfRankingList: state.golf.golfRankingList,
})

const mapDispatchToProps = dispatch => ({
  getgolfrankinglistRequest: (year: string) => dispatch(GolfActions.getgolfrankinglistRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(GolfRankings))
