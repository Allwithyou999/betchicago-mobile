import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import NCAAActions from '../../../../actions/ncaa'
import { Colors } from '../../../../themes'
import { LoadingView, RankingsTable } from '../../../../components'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './rankings.styles'

export interface NCAARankingsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  ncaaRankingsStatus?: string
  ncaaRankingsData?: Array<object>
  getncaarankingsdataRequest?: (year: string) => void
}

export interface NCAARankingsScreenState {
  isRefreshing: boolean
}

class NCAARankings extends React.Component<NCAARankingsScreenProps, NCAARankingsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getncaarankingsdataRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.ncaaRankingsStatus !== nextProps.ncaaRankingsStatus) {
      if (this.state.isRefreshing && nextProps.ncaaRankingsStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  render() {
    const { isLoadingStart, ncaaRankingsStatus, ncaaRankingsData } = this.props
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
            <View style={screenStyles.topHeader}>
              <Text style={screenStyles.pagetitle}>RPI RANKINGS</Text>
              <Text style={screenStyles.lastUpdate}>
                Last Updated: {ncaaRankingsData && ncaaRankingsData['updated'] ? ncaaRankingsData['updated'] : ``}
              </Text>
            </View>
          </View>
          {ncaaRankingsData &&
            ncaaRankingsData['rankings'] && (
              <RankingsTable list={ncaaRankingsData['rankings']} style={screenStyles.rankingsTable} />
            )}
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || ncaaRankingsStatus === 'pending')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ncaaRankingsStatus: state.ncaa.ncaaRankingsStatus,
  ncaaRankingsData: state.ncaa.ncaaRankingsData,
})

const mapDispatchToProps = dispatch => ({
  getncaarankingsdataRequest: (year: string) => dispatch(NCAAActions.getncaarankingsdataRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NCAARankings))
