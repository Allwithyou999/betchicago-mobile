import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../themes'
import MLBActions from '../../../../actions/mlb'
import { PlayerTable, LoadingView } from '../../../../components'
import { FormatDate, FormatAMPM, GetTimezone, FormatDateFull } from '../../../../services'
import { MLB_ODDS_MOBILE_TITLE } from '../../../../config/constants/mlb'
import * as screenStyles from './odds.styles'

export interface MLBOddsScreenProps {
  navigation?: any
  isLoadingStart?: boolean
  mlbOddsStatus?: string
  mlbOddsScoreboardStatus?: string
  mlbOdds: Array<object>
  mlbOddsScoreboardData: Array<object>
  getmlboddsRequest?: (date: Date) => void
  getmlboddsscoreboardRequest?: (date: string) => void
}

export interface MLBOddsScreenState {
  isRefreshing: boolean
}

class MLBOdds extends React.Component<MLBOddsScreenProps, MLBOddsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  initialize() {
    this.props.getmlboddsRequest(new Date())
    this.props.getmlboddsscoreboardRequest(FormatDateFull(new Date()))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize()
    }

    if (
      this.props.mlbOddsStatus !== nextProps.mlbOddsStatus ||
      this.props.mlbOddsScoreboardStatus !== nextProps.mlbOddsScoreboardStatus
    ) {
      if (
        this.state.isRefreshing &&
        nextProps.mlbOddsStatus === 'done' &&
        nextProps.mlbOddsScoreboardStatus === 'done'
      ) {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  generateOdds = (markets, id) => {
    let home = '-'
    let away = '-'
    let line = '-'

    if (markets) {
      !!markets[0] &&
        markets[0].books.forEach(book => {
          if (book.id.indexOf(id) !== -1) {
            book.outcomes &&
              book.outcomes.forEach(out => {
                if (out.type === 'home') home = out.odds
                if (out.type === 'away') away = out.odds
              })
          }
        })

      !!markets[1] &&
        markets[1].books.forEach(book => {
          if (book.id.indexOf(id) !== -1) {
            if (book.outcomes) {
              book.outcomes.forEach(out => {
                if (out.odds.substr(0, 1) === '-') {
                  line = out.total + ' / ' + out.type.substr(0, 1).toUpperCase() + ' ' + out.odds
                }
              })
              if (line === '-' && book.outcomes.length) {
                let out = book.outcomes[0]
                line = out.total + ' / ' + out.type.substr(0, 1).toUpperCase() + ' ' + out.odds
              }
            }
          }
        })
    }

    return (
      <View>
        <Text style={screenStyles.westgateText}>{line}</Text>
        <Text style={screenStyles.westgateText}>{away}</Text>
        <Text style={screenStyles.westgateText}>{home}</Text>
      </View>
    )
  }

  render() {
    const { isLoadingStart, mlbOddsStatus, mlbOddsScoreboardStatus, mlbOdds, mlbOddsScoreboardData } = this.props
    const { isRefreshing } = this.state

    let oddsList = [],
      time,
      timezone

    timezone = GetTimezone()
    time = new Date()

    if (mlbOddsStatus === 'done' && mlbOddsScoreboardStatus === 'done') {
      mlbOdds.filter(odd => new Date(odd['scheduled']).getDate() === new Date().getDate()).forEach(odd => {
        let homeAbbr, awayAbbr
        odd['competitors'].forEach(c => {
          if (c.qualifier === 'home') homeAbbr = c.abbreviation
          if (c.qualifier === 'away') awayAbbr = c.abbreviation
        })

        const game = mlbOddsScoreboardData['league'].games.filter(
          g => g.game.home.abbr === homeAbbr && g.game.away.abbr === awayAbbr,
        )[0]
        if (game) {
          let oddsItem = {}

          let scheduled = new Date(odd['scheduled'])
          oddsItem['game'] = (
            <View>
              <Text style={screenStyles.gameSchedule}>
                {FormatDateFull(scheduled).substr(5)} @ {FormatAMPM(scheduled).toUpperCase()} {timezone}
              </Text>
              <Text style={screenStyles.gameText}>
                <Text style={screenStyles.boldFont}>{awayAbbr}</Text>
                {game.game.away.market} ({game.game.away.win}-{game.game.away.loss})
              </Text>
              <Text style={screenStyles.gameText}>
                <Text style={screenStyles.boldFont}>{homeAbbr}</Text>
                {game.game.home.market} ({game.game.home.win}-{game.game.home.loss})
              </Text>
            </View>
          )
          oddsItem['westgate'] = this.generateOdds(odd['markets'], '17084')

          oddsList.push(oddsItem)
        }
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
            <View style={screenStyles.oddsContents}>
              <Text style={screenStyles.title}>MLB Odds & Betting</Text>
              <Text style={screenStyles.textUpdated}>
                Last Updated:{' '}
                <Text style={screenStyles.textUpdatedDate}>
                  {FormatDate(time, 'mm dd, yyyy')} {FormatAMPM(time, false, true)} {timezone}
                </Text>
              </Text>
              <Text style={screenStyles.textDisclaimer}>
                Disclaimer: Odds information is provided for information purposes only. Contact your preferred licensed
                sport book for available odds and payout information.
              </Text>
              <PlayerTable titles={MLB_ODDS_MOBILE_TITLE} list={oddsList} />
            </View>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing && (!isLoadingStart || mlbOddsStatus === 'pending' || mlbOddsScoreboardStatus === 'pending')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  mlbOddsStatus: state.mlb.mlbOddsStatus,
  mlbOddsScoreboardStatus: state.mlb.mlbOddsScoreboardStatus,
  mlbOdds: state.mlb.mlbOdds,
  mlbOddsScoreboardData: state.mlb.mlbOddsScoreboardData,
})

const mapDispatchToProps = dispatch => ({
  getmlboddsRequest: (date: Date) => dispatch(MLBActions.getmlboddsRequest(date)),
  getmlboddsscoreboardRequest: (date: string) => dispatch(MLBActions.getmlboddsscoreboardRequest(date)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MLBOdds)
