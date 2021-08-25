import * as React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import HomeNavigator from './home-navigator'
// import ScoreboardNavigator from './scoreboard-navigator'
// import FavoritesNavigator from './favorites-navigator'
// import AccountNavigator from './account-navigator'
// import AuthNavigation from './auth-navigation'
// import { MainTabBar } from './app-controls'
import LaunchScreen from '../containers/landing/launch'
import ArticleDetail from '../containers/carousel-pages/common/article-detail'
// import NFLTeams from '../containers/carousel-pages/nfl/teams/teams'
// import GolfPlayerDetail from '../containers/carousel-pages/golf/player-detail'
// import NCAATeams from '../containers/carousel-pages/ncaa/teams/teams'
// import NCAAMatchup from '../containers/carousel-pages/ncaa/matchup'
// import MLBMatchup from '../containers/carousel-pages/mlb/matchup'
// import MLBTeams from '../containers/carousel-pages/mlb/teams'
// import NBAMatchup from '../containers/carousel-pages/nba/matchup'

const MyTransitionSpec = {
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
}

const ViewTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1]

  const translateX = position.interpolate({
    inputRange,
    outputRange: [50, 0, 0, 0],
  })

  return { transform: [{ translateX }] }
}

const ModalTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1]

  const translateX = 0
  const translateY = position.interpolate({
    inputRange,
    outputRange: [50, 0, 0, 0],
  })

  return {
    transform: [{ translateX }, { translateY }],
  }
}

const FadeTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1]

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1, 0],
  })

  return { opacity }
}

export const TransitionConfiguration = () => {
  return {
    // Define scene interpolation, eq. custom transition
    transitionSpec: MyTransitionSpec,
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps
      const { index, route } = scene
      const params = route.params || {}
      const transition = params.transition || 'default'

      return {
        viewTransition: ViewTransition(index, position),
        modalTransition: ModalTransition(index, position),
        fadeTransition: FadeTransition(index, position),
        default: ViewTransition(index, position),
      }[transition]
    },
  }
}

// const Main = createBottomTabNavigator(
//   {
//     home: {
//       screen: HomeNavigator,
//       navigationOptions: {},
//     },
//     scoreboard: {
//       screen: ScoreboardNavigator,
//       navigationOptions: {},
//     },
//     favorites: {
//       screen: FavoritesNavigator,
//       navigationOptions: {},
//     },
//   },
//   {
//     initialRouteName: 'home',
//     animationEnabled: false,
//     backBehavior: 'none',
//     lazy: true,
//     swipeEnabled: false,
//     tabBarComponent: ({ navigation }) => <MainTabBar navigation={navigation} />,
//     tabBarOptions: {},
//     tabBarPosition: 'bottom',
//   },
// )

const MainStack = createStackNavigator(
  {
    main: {
      screen: HomeNavigator,
    },
    // nfl_teams: {
    //   screen: NFLTeams,
    // },
    article_detail: {
      screen: ArticleDetail,
    },
    // golf_player: {
    //   screen: GolfPlayerDetail,
    // },
    // ncaa_teams: {
    //   screen: NCAATeams,
    // },
    // ncaa_matchup: {
    //   screen: NCAAMatchup,
    // },
    // mlb_matchup: {
    //   screen: MLBMatchup,
    // },
    // mlb_teams: {
    //   screen: MLBTeams,
    // },
    // nba_matchup: {
    //   screen: NBAMatchup,
    // },
  },
  {
    initialRouteName: 'main',
    mode: 'modal',
    headerMode: 'none',
  },
)

const AppNavigation = createStackNavigator(
  {
    landing: {
      screen: LaunchScreen,
      navigationOptions: {},
    },
    mainStack: {
      screen: MainStack,
      navigationOptions: {},
    },
    // account: {
    //   screen: AccountNavigator,
    //   navigationOptions: {},
    // },
    // auth: {
    //   screen: AuthNavigation,
    //   navigationOptions: {},
    // },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'landing',
    mode: 'card',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: TransitionConfiguration,
  },
)

export default AppNavigation
