import * as React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  Image,
  StatusBar,
} from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import * as images from '../../../config/constants/images'
import { Icon, TopNavigation, AsyncImage } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './auth.styles'

export interface AuthScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface AuthScreenState {
  email: string
  password: string
}

class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
  goToLogin = () => {
    this.props.navigation.navigate('login')
  }

  goToRegister = () => {
    this.props.navigation.navigate('register')
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <SafeAreaView style={screenStyles.ROOT}>
        <StatusBar barStyle="light-content" />
        <TouchableOpacity style={screenStyles.closeButton} onPress={this.goBack}>
          <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
            <Icon iconType="material" name="close" size={24} color={Colors.white} />
          </Animatable.View>
        </TouchableOpacity>
        <ScrollView style={screenStyles.container} contentContainerStyle={screenStyles.scrollContents}>
          <Image source={images.logo_circle} style={screenStyles.logoCircle} />
          <Image source={images.logo} style={screenStyles.logoText} />
          <Text style={screenStyles.textDescription}>
            Register now to enjoy advanced tools and features including favorites, custom notifications and in-game
            alerts.
          </Text>
          <TouchableOpacity style={screenStyles.btnRegister} onPress={this.goToRegister}>
            <Text style={screenStyles.txtRegister}>Regsiter Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={screenStyles.btnLogin} onPress={this.goToLogin}>
            <Text style={screenStyles.txtLogin}>Login</Text>
          </TouchableOpacity>
          <View style={screenStyles.bottomArea}>
            <Text style={screenStyles.txtBottom}>Nevermind... </Text>
            <TouchableOpacity style={screenStyles.btnBack} onPress={this.goBack}>
              <Text style={screenStyles.txtBottom}>Back to Sports Coverage ></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthScreen)
