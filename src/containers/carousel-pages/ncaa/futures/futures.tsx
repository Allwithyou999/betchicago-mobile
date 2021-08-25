import * as React from 'react'
import { View, Animated, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native'
import { withNavigation, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../themes'
import NCAAActions from '../../../../actions/ncaa'
import { LoadingView, CrossTable } from '../../../../components'
import { NCAA_FUTURES_TITLE } from '.././../../../config/constants/ncaa'
import { CURRENTYEAR } from '../../../../config/constants/common'
import * as screenStyles from './futures.styles'

export interface NCAAFuturesScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  ncaaFuturesStatus?: string
  ncaaFuturesData?: Array<object>
  getncaafuturesdataRequest?: (year: string) => void
}

export interface NCAAFuturesScreenState {
  isRefreshing: boolean
}

class NCAAFutures extends React.Component<NCAAFuturesScreenProps, NCAAFuturesScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
    }
  }

  initialize() {
    this.props.getncaafuturesdataRequest(CURRENTYEAR)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.ncaaFuturesStatus !== nextProps.ncaaFuturesStatus) {
      if (this.state.isRefreshing && nextProps.ncaaFuturesStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onViewTeamInfo = id => {
    this.props.navigation.navigate('ncaa_teams', { teamID: id })
  }

  render() {
    const { isLoadingStart, ncaaFuturesStatus, ncaaFuturesData } = this.props
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
              <Text style={screenStyles.pagetitle}>Futures Odds</Text>
              <Text style={screenStyles.lastUpdate}>
                Odds to Win 2019 NCAA Men's Tournament (
                {ncaaFuturesData && ncaaFuturesData['endDate'] ? ncaaFuturesData['endDate'] : ''})
              </Text>
            </View>
            {ncaaFuturesData &&
              ncaaFuturesData['teams'] && (
                <CrossTable
                  titles={NCAA_FUTURES_TITLE}
                  list={ncaaFuturesData['teams']}
                  style={screenStyles.futuresTable}
                  iconSize={{ width: 29, height: 29 }}
                  onSelected={this.onViewTeamInfo}
                />
              )}

            <Text style={screenStyles.introduction}>
              {`The "Odds to Win" bet is also referred to as a "futures" bet. In this case, bettors are wagering which team will win the NCAA Men's Tournament Championship. Odds generally change on a weekly basis.`}
            </Text>
          </View>
        </ScrollView>
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || ncaaFuturesStatus === 'pending')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ncaaFuturesStatus: state.ncaa.ncaaFuturesStatus,
  ncaaFuturesData: state.ncaa.ncaaFuturesData,
})

const mapDispatchToProps = dispatch => ({
  getncaafuturesdataRequest: (year: string) => dispatch(NCAAActions.getncaafuturesdataRequest(year)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(NCAAFutures))
