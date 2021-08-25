import * as React from 'react'
import { View, Animated, Platform, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'
import * as Animatable from 'react-native-animatable'
import AuthActions from '../../../../../actions/auth'
import { NCAATeamNews, NCAATeamPlayers, NCAATeamSchedule } from '../../teams'
import { Icon, AnimatableButton, LoadingView } from '../../../../../components'
import { Colors } from '../../../../../themes'
import * as screenStyles from './teams.styles'
import { AuthState } from '../../../../../reducers/auth'
import { UpdateProfileParams } from '../../../../../config/models'

export interface NCAATeamsScreenProps extends NavigationScreenProps<{}> {
  auth: AuthState
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface NCAATeamsScreenState {
  isRefreshing: boolean
  isSetFavourite: boolean
  scrollY: AnimatedValue
}

class NCAATeams extends React.Component<NCAATeamsScreenProps, NCAATeamsScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      isSetFavourite: false,
      scrollY: new Animated.Value(0),
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
      // this.props.updateprofileRequest({
      //   favouriteTeams: {
      //     ...this.props.auth.profile.favouriteTeams,
      //     123456: {
      //       date: new Date(),
      //       isDeleted: false,
      //     },
      //   },
      // })
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
      titles: ['News', 'Schedule', 'Players'],
    }
    const HEADER_MAX_HEIGHT = 110
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 110
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
        <React.Fragment>
          <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
            <Animated.Image
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2FMichigan-Wolverines.png?alt=media`,
              }}
              style={[screenStyles.teamLogo, { transform: [{ translateY: logoTranslate }, { scale: logoScale }] }]}
            />
            <Animated.Text
              style={[screenStyles.teamName, { opacity: textOpacity }, { transform: [{ translateY: logoTranslate }] }]}
            >
              {`Michigan Wolverines`}
            </Animated.Text>
            <Animated.Text
              style={[screenStyles.teamScore, { opacity: textOpacity }, { transform: [{ translateY: logoTranslate }] }]}
            >
              #2, 17-0, 6-0(Big Ten)
            </Animated.Text>
          </Animated.View>
          <IndicatorViewPager
            style={screenStyles.indicatorViewPager}
            pagerStyle={screenStyles.whiteBg}
            indicator={this._renderMenuIndicator(mainCarouselNav)}
          >
            <View style={{ width: '100%' }}>
              <NCAATeamNews scrollY={this.state.scrollY} />
            </View>
            <View>
              <NCAATeamSchedule scrollY={this.state.scrollY} />
            </View>
            <View>
              <NCAATeamPlayers scrollY={this.state.scrollY} />
            </View>
          </IndicatorViewPager>
        </React.Fragment>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  updateprofileRequest: (profile, alert = 'Successfully updated favourite teams.', refetch = null) =>
    dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NCAATeams)
