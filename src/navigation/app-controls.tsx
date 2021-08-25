import * as React from 'react'
import { Image, Text, TouchableOpacity, View, Linking } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import { equals } from 'ramda'
import { Images } from '../themes'
import { CONTESTSSITEURL } from '../config/constants/common'
import * as screenStyles from './app-controls.styles'
import { AuthState } from '../reducers/auth'
import { connect } from 'react-redux'

interface DSTabBarProps extends NavigationScreenProps {
  auth: AuthState
}
interface DSTabBarState {}

class TabBar extends React.Component<DSTabBarProps, DSTabBarState> {
  handlePressTabs = (route: string) => {
    if (route === 'contests') {
      Linking.openURL(CONTESTSSITEURL).catch(err => console.error('An error occurred', err))
    }

    this.props.navigation.navigate(route)
  }

  handleAccountNavigation = () => {
    if (
      this.props.auth.isLoggedIn &&
      this.props.auth.timestamp &&
      new Date().getTime() - new Date(this.props.auth.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
    ) {
      this.props.navigation.navigate('account')
    } else {
      this.props.navigation.navigate('auth', { from: 'account' })
    }
  }

  render() {
    const { navigation } = this.props
    const route = navigation.state.index

    return (
      <View style={screenStyles.tabContainer}>
        <TouchableOpacity style={screenStyles.tabItem} onPress={() => this.handlePressTabs('home')}>
          <Image
            source={equals(route, 0) ? Images.TAB_ICON_HOME_ACTIVE : Images.TAB_ICON_HOME}
            style={screenStyles.tabManage}
          />
          <Text style={[screenStyles.tabText, equals(route, 0) && screenStyles.active]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.tabItem} onPress={() => this.handlePressTabs('scoreboard')}>
          <Image
            source={equals(route, 1) ? Images.TAB_ICON_SCOREBOARD_ACTIVE : Images.TAB_ICON_SCOREBOARD}
            style={screenStyles.tabManage}
          />
          <Text style={[screenStyles.tabText, equals(route, 1) && screenStyles.active]}>Scoreboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.tabItem} onPress={() => this.handlePressTabs('favorites')}>
          <Image
            source={equals(route, 2) ? Images.TAB_ICON_FAVORITES_ACTIVE : Images.TAB_ICON_FAVORITES}
            style={screenStyles.tabManage}
          />
          <Text style={[screenStyles.tabText, equals(route, 2) && screenStyles.active]}>Favorites</Text>
        </TouchableOpacity>
        {/*
          <TouchableOpacity style={screenStyles.tabItem} onPress={() => this.handlePressTabs('contests')}>
            <Image
              source={equals(route, 3) ? Images.TAB_ICON_CONTESTS_ACTIVE : Images.TAB_ICON_CONTESTS}
              style={screenStyles.tabManage}
            />
            <Text style={[screenStyles.tabText, equals(route, 3) && screenStyles.active]}>Contests</Text>
          </TouchableOpacity>
        */}
        <TouchableOpacity style={screenStyles.tabItem} onPress={this.handleAccountNavigation}>
          <Image
            source={equals(route, 4) ? Images.TAB_ICON_CONTESTS_ACTIVE : Images.TAB_ICON_CONTESTS}
            style={screenStyles.tabManage}
          />
          <Text style={[screenStyles.tabText, equals(route, 4) && screenStyles.active]}>Account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({})

const MainTabBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBar)

export { MainTabBar }
