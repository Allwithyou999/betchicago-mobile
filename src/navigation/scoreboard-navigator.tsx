import * as React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Icons from 'react-native-vector-icons/FontAwesome'
import ScoreboardScreen from '../containers/scoreboard'

const FavoritesNavigator = createStackNavigator(
  {
    scoreboard_main: {
      screen: ScoreboardScreen,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'scoreboard_main',
    headerMode: 'none',
    navigationOptions: {},
  },
)

export default FavoritesNavigator
