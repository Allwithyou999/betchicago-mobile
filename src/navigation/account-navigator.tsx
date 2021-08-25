import * as React from 'react'
import { createStackNavigator } from 'react-navigation'
import AccountHome from '../containers/account/home'
import AccountProfile from '../containers/account/profile'
import SavedStories from '../containers/account/stories'
import AccountAbout from '../containers/account/about'
import AboutTerms from '../containers/account/terms'
import RequestFeature from '../containers/account/request-feature'
import AccountFavorites from '../containers/account/favorites'
import FavoriteNotifications from '../containers/account/favorite-notifications'
import AccounyNotifications from '../containers/account/notifications'
import ArticleDetail from '../containers/carousel-pages/common/article-detail'

const AccountNavigator = createStackNavigator(
  {
    accountHome: {
      screen: AccountHome,
      navigationOptions: {},
    },
    accountProfile: {
      screen: AccountProfile,
      navigationOptions: {},
    },
    savedStories: {
      screen: SavedStories,
      navigationOptions: {},
    },
    accountAbout: {
      screen: AccountAbout,
      navigationOptions: {},
    },
    aboutTerms: {
      screen: AboutTerms,
      navigationOptions: {},
    },
    requestFeature: {
      screen: RequestFeature,
      navigationOptions: {},
    },
    accountFavorites: {
      screen: AccountFavorites,
      navigationOptions: {},
    },
    favoriteNotifications: {
      screen: FavoriteNotifications,
      navigationOptions: {},
    },
    accounyNotifications: {
      screen: AccounyNotifications,
      navigationOptions: {},
    },
    story_detail: {
      screen: ArticleDetail,
    },
  },
  {
    initialRouteName: 'accountHome',
    headerMode: 'none',
    navigationOptions: {},
  },
)

export default AccountNavigator
