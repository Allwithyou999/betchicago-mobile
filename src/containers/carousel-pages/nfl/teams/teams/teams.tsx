import * as React from 'react'
import { View, Animated, Platform, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'
import * as Animatable from 'react-native-animatable'
import { NFLTeamHome, NFLTeamNews, NFLTeamPlayers, NFLTeamSchedule, NFLTeamStats } from '../../teams'
import { Icon, AnimatableButton, LoadingView } from '../../../../../components'
import NFLActions from '../../../../../actions/nfl'
import AuthActions from '../../../../../actions/auth'
import { Colors } from '../../../../../themes'
import * as screenStyles from './teams.styles'
import { AuthState } from '../../../../../reducers/auth'
import { UpdateProfileParams } from '../../../../../config/models'

export interface NFLTeamsScreenProps extends NavigationScreenProps<{}> {
  teamStatus?: string
  teamData?: object
  auth: AuthState
  getnflteamdataRequest?: (id: string) => void
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface NFLTeamsScreenState {
  delayLoading: boolean
  isRefreshing: boolean
  isSetFavourite: boolean
  scrollY: AnimatedValue
}

class NFLTeams extends React.Component<NFLTeamsScreenProps, NFLTeamsScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isSetFavourite: false,
      scrollY: new Animated.Value(0),
      delayLoading: false,
    }
    const teamID = this.props.navigation.state.params['teamID']
    this.props.getnflteamdataRequest(teamID)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.teamStatus !== nextProps.teamStatus) {
      if (nextProps.teamStatus === 'done') {
        this.setState({ delayLoading: true })
        setTimeout(() => {
          this.setState({ delayLoading: false })
        }, 2000)
      }
    }
  }

  _renderMenuIndicator = (options: any) => {
    return (
      <PagerTitleIndicator
        style={options.style}
        trackScroll
        itemTextStyle={options.itemTextStyle}
        itemStyle={options.itemStyle}
        selectedItemStyle={options.selectedItemStyle}
        selectedItemTextStyle={options.selectedItemTextStyle}
        selectedBorderStyle={options.selectedBorderStyle}
        titles={options.titles}
      />
    )
  }

  onClosePopup = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onSetFavourite = () => {
    if (
      !this.props.auth.isLoggedIn &&
      this.props.auth.timestamp &&
      new Date().getTime() - new Date(this.props.auth.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
    ) {
      // TODO: Save team to favourite
      // this.props.updateprofileRequest({ favouriteTeams: { ...this.props.auth.profile.favouriteTeams, [article.id]: { date: new Date(), isDeleted: false } } })
      this.setState({ isSetFavourite: !this.state.isSetFavourite })
    } else {
      this.props.navigation.navigate('auth')
    }
  }

  onOpenNotification = () => {}

  render() {
    const mainCarouselNav = {
      style: screenStyles.mainIndicatorContainer,
      itemTextStyle: screenStyles.mainIndicatorText,
      itemStyle: screenStyles.mainIndicator,
      selectedItemStyle: screenStyles.mainIndicatorSelected,
      selectedItemTextStyle: screenStyles.mainIndicatorSelectedText,
      selectedBorderStyle: screenStyles.selectedBorderStyleForMain,
      titles: ['Team', 'News', 'Schedule', 'Player', 'Stats'],
    }
    const HEADER_MAX_HEIGHT = 110
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 110
    const TOPBAR_HEIGHT = HEADER_MAX_HEIGHT + 44
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const textOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.4, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.3, 0],
      extrapolate: 'clamp',
    })
    const logoTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -25],
      extrapolate: 'clamp',
    })
    const logoScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.85, 0.7],
      extrapolate: 'clamp',
    })

    const { teamData, teamStatus } = this.props
    const { delayLoading } = this.state

    return (
      <Animated.View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <Animated.View style={screenStyles.topHeader}>
          <TouchableOpacity style={screenStyles.closeButton} onPress={this.onClosePopup}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <Icon iconType="material" name="close" size={30} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
          <AnimatableButton
            style={screenStyles.favouriteButton}
            rendItem={
              <Icon
                iconType="material"
                name={this.state.isSetFavourite ? 'star' : 'star-border'}
                size={30}
                color={Colors.active}
              />
            }
            type="rubberBand"
            onPress={this.onSetFavourite}
          />
          <AnimatableButton
            style={screenStyles.notificationButton}
            rendItem={<Icon iconType="material" name="notifications-none" size={30} color={Colors.white} />}
            type="swing"
            onPress={this.onOpenNotification}
          />
        </Animated.View>
        {teamStatus === 'done' &&
          teamData && (
            <React.Fragment>
              <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
                <Animated.Image
                  source={{
                    uri: teamData['logo'],
                  }}
                  style={[screenStyles.teamLogo, { transform: [{ translateY: logoTranslate }, { scale: logoScale }] }]}
                />
                <Animated.Text
                  style={[
                    screenStyles.teamName,
                    { opacity: textOpacity },
                    { transform: [{ translateY: logoTranslate }] },
                  ]}
                >
                  {teamData['name']}
                </Animated.Text>
                <Animated.Text
                  style={[
                    screenStyles.teamScore,
                    { opacity: textOpacity },
                    { transform: [{ translateY: logoTranslate }] },
                  ]}
                >
                  1-0
                </Animated.Text>
              </Animated.View>
              <IndicatorViewPager
                style={screenStyles.indicatorViewPager}
                indicator={this._renderMenuIndicator(mainCarouselNav)}
              >
                <View>
                  <NFLTeamHome scrollY={this.state.scrollY} />
                </View>
                <View>
                  <NFLTeamNews scrollY={this.state.scrollY} />
                </View>
                <View>
                  <NFLTeamSchedule scrollY={this.state.scrollY} />
                </View>
                <View>
                  <NFLTeamPlayers scrollY={this.state.scrollY} players={teamData['data']['roster']} />
                </View>
                <View>
                  <NFLTeamStats scrollY={this.state.scrollY} />
                </View>
              </IndicatorViewPager>
            </React.Fragment>
          )}
        {teamStatus === 'error' && (
          <View style={screenStyles.errorView}>
            <Text style={screenStyles.errorText}>Team information doesn't exist.</Text>
          </View>
        )}
        <LoadingView style={{ marginTop: TOPBAR_HEIGHT }} isVisible={teamStatus === 'pending' || delayLoading} />
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  teamStatus: state.nfl.teamStatus,
  teamData: state.nfl.teamData,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  getnflteamdataRequest: (id: string) => dispatch(NFLActions.getnflteamdataRequest(id)),
  updateprofileRequest: (profile, alert = 'Successfully updated favourtie teams.', refetch = null) =>
    dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NFLTeams)
