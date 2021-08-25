import { createStackNavigator } from 'react-navigation'
import AuthScreen from '../containers/auth/auth'
import LoginScreen from '../containers/auth/login'
import RegisterScreen from '../containers/auth/register'
import ForgotPasswordScreen from '../containers/auth/forgot-password'
import { TransitionConfiguration } from './app-navigation'

const AuthNavigation = createStackNavigator(
  {
    auth: { screen: AuthScreen },
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen },
    forgot: { screen: ForgotPasswordScreen },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'auth',
    mode: 'modal',
    navigationOptions: {},
  },
)

export default AuthNavigation
