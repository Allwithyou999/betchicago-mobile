import * as React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../containers/home'

const HomeNavigator = createStackNavigator(
  {
    home_main: {
      screen: HomeScreen,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'home_main',
    headerMode: 'none',
    navigationOptions: {},
  },
)

export default HomeNavigator
