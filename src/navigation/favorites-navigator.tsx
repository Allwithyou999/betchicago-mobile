import * as React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import FavoritesScreen from '../containers/favorites'

const FavoritesNavigator = createStackNavigator(
  {
    favorites_main: {
      screen: FavoritesScreen,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'favorites_main',
    headerMode: 'none',
    navigationOptions: {},
  },
)

export default FavoritesNavigator
