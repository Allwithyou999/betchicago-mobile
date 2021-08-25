import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import GolfActions from '../../../../actions/golf'
import QuickPicker from 'quick-picker'
import { Colors } from '../../../../themes'
import * as screenStyles from './odds.styles'
import { PlayerTable, SelectBox, LoadingView } from '../../../../components'
import { ODDS_TITLE } from '../../../../config/constants/golf'

export interface GolfOddsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  golfOddsStatus?: string
  golfOdds?: Array<object>
  getgolfoddsRequest?: () => void
}

export interface GolfOddsScreenState {
  isRefreshing: boolean
  activeTour: number
  tourList: Array<string>
}

class GolfOdds extends React.Component<GolfOddsScreenProps, GolfOddsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, activeTour: 0, tourList: [] }
  }

  initialize() {
    this.props.getgolfoddsRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (this.props.golfOddsStatus !== nextProps.golfOddsStatus) {
      if (this.state.isRefreshing && nextProps.golfOddsStatus === 'done' && nextProps.golfOddsStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }

    if (nextProps.golfOdds && this.props.golfOdds !== nextProps.golfOdds && nextProps.golfOddsStatus === 'done') {
      const tourList = []

      nextProps.golfOdds.forEach((odd, index) => tourList.push(odd.name))
      this.setState({ tourList })
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true, activeTour: 0 })
    this.initialize()
  }

  onChangeTourNament = () => {
    const { activeTour, tourList } = this.state
    const tourNames = []

    QuickPicker.open({
      items: tourList,
      selectedValue: tourList[activeTour],
      backgroundColor: '#d0d4db',
      onValueChange: selectedValueFromPicker =>
        this.setState({ activeTour: tourList.indexOf(selectedValueFromPicker) }),
    })
  }

  render() {
    const { isLoadingStart, golfOddsStatus, golfOdds } = this.props
    const { isRefreshing, activeTour, tourList } = this.state
    const oddList = []

    if (golfOdds && golfOdds[activeTour] && golfOdds[activeTour]['competitors']) {
      golfOdds[activeTour]['competitors'].forEach(comp => {
        oddList.push({
          name: comp.name,
          odds: comp.books[0].odds,
          westgage: comp.books[0].odds,
        })
      })
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
            <Text style={screenStyles.oddsTitle}>Odds to Win</Text>
            <Text style={screenStyles.tableTitle}>SELECT TOURNAMENT</Text>
            <SelectBox
              style={screenStyles.selectBox}
              title={tourList.length > 0 ? tourList[activeTour] : ''}
              onPress={this.onChangeTourNament}
            />
            <PlayerTable titles={ODDS_TITLE} list={oddList} />
          </View>
        </ScrollView>
        <QuickPicker />
        <LoadingView isVisible={!isRefreshing && (!isLoadingStart || golfOddsStatus !== 'done')} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  golfOddsStatus: state.golf.golfOddsStatus,
  golfOdds: state.golf.golfOdds,
})

const mapDispatchToProps = dispatch => ({
  getgolfoddsRequest: () => dispatch(GolfActions.getgolfoddsRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GolfOdds)
