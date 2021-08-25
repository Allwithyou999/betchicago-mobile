import * as React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  TextInput,
  Alert,
  Text,
  KeyboardAvoidingView,
  Image,
  StatusBar,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { Icon, LoadingView } from '../../../components'
import AuthActions from '../../../actions/auth'
import * as images from '../../../config/constants/images'
import { Colors } from '../../../themes'
import * as screenStyles from './login.styles'
import { AuthState } from '../../../reducers/auth'

export interface LoginScreenProps extends NavigationInjectedProps {
  auth: AuthState
  loginRequest: (email: string, password: string) => void
}

export interface LoginScreenState {
  email: string
  password: string
}

class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  goToForgot = () => {
    this.props.navigation.navigate('forgot')
  }

  updateEmail = (value: string) => this.setState({ email: value })
  updatePassword = (value: string) => this.setState({ password: value })

  onLogin = () => {
    const { email, password } = this.state
    this.props.loginRequest(email, password)
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
        <KeyboardAvoidingView style={screenStyles.container} behavior="padding">
          <ScrollView style={screenStyles.container} contentContainerStyle={screenStyles.scrollContents}>
            <Image source={images.logo_circle} style={screenStyles.logoCircle} />

            <View style={screenStyles.field}>
              <Text style={screenStyles.label}>EMAIL</Text>
              <TextInput
                placeholder={'name@youremail.com'}
                placeholderTextColor="#818181"
                style={screenStyles.textValue}
                onChangeText={this.updateEmail}
              />
            </View>
            <View style={screenStyles.field}>
              <Text style={screenStyles.label}>PASSWORD</Text>
              <TextInput
                placeholder={'******'}
                placeholderTextColor="#818181"
                style={screenStyles.textValue}
                onChangeText={this.updatePassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={screenStyles.btnLogin} onPress={this.onLogin}>
              <Text style={screenStyles.txtLogin}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={screenStyles.btnForgot} onPress={this.goToForgot}>
              <Text style={screenStyles.txtForgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: (email: string, password: string) => dispatch(AuthActions.loginRequest(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
