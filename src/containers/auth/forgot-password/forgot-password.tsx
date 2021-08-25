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
import * as screenStyles from './forgot-password.styles'
import { AuthState } from '../../../reducers/auth'

export interface ForgotPasswordScreenProps extends NavigationInjectedProps {
  auth: AuthState
  forgotpasswordRequest: (email: string) => void
}

export interface ForgotPasswordScreenState {
  email: string
}

class ForgotPasswordScreen extends React.Component<ForgotPasswordScreenProps, ForgotPasswordScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  updateEmail = (value: string) => this.setState({ email: value })

  onSubmit = () => {
    const { email } = this.state
    this.props.forgotpasswordRequest(email)
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
            <TouchableOpacity style={screenStyles.btnForgot} onPress={this.onSubmit}>
              <Text style={screenStyles.txtForgot}>Submit</Text>
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
  forgotpasswordRequest: (email: string) => dispatch(AuthActions.forgotpasswordRequest(email)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordScreen)
