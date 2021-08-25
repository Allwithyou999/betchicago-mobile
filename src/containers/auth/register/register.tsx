import * as React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  TextInput as RNTextInput,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import moment from 'moment'
import CheckBox from 'react-native-check-box'
import { Icon } from '../../../components'
import { TextInput, FlexView, LoadingView } from '../../../components/shared'
import AuthActions from '../../../actions/auth'
import { Colors, GlobalStyle } from '../../../themes'
import * as screenStyles from './register.styles'
import { getFormatedDateString, validateEmail, validatePassword } from '../../../services'

export interface RegisterScreenProps extends NavigationInjectedProps {
  status: string
  registerRequest: (email: string, password: string, payload) => void
}

export interface RegisterScreenState {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  dob: string
  notificationEnabled: boolean
  agreeTermsAndConditions: boolean
}

class RegisterScreen extends React.Component<RegisterScreenProps, RegisterScreenState> {
  inputs: { [key: string]: React.RefObject<RNTextInput> } = {}
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    notificationEnabled: false,
    agreeTermsAndConditions: false,
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  saveRef = (key: string) => {
    this.inputs[key] = React.createRef<RNTextInput>()
    return this.inputs[key]
  }

  focusInput = (key: string) => () => {
    this.inputs[key].current.focus()
  }

  onRegister = () => {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dob,
      notificationEnabled,
      agreeTermsAndConditions,
    } = this.state

    if (firstName.length < 2) {
      return Alert.alert('First Name must be at least 2 letters.')
    }
    if (lastName.length < 2) {
      return Alert.alert('Last Name must be at least 2 letters.')
    }
    if (!validateEmail(email)) {
      return Alert.alert('Email is not valid.')
    }
    if (password.length > 0 && !validatePassword(password)) {
      return Alert.alert('Password is not valid.')
    }
    if (password !== confirmPassword) {
      return Alert.alert('Password does not match.')
    }
    if (!moment(dob).isValid()) {
      return Alert.alert('Date of Brith is not valid')
    }
    if (!agreeTermsAndConditions) {
      return Alert.alert('You have to accept the BetChicago Terms of Usage and Privacy Policy.')
    }

    this.props.registerRequest(email, password, {
      firstName,
      lastName,
      dob: moment(dob).format('YYYY-MM-DD'),
      notificationEnabled,
    })
  }

  updateForm = (key: string) => (value: string) => this.setState({ [key]: value } as any)

  updateDOB = (value: string) => {
    const { dob } = this.state
    this.setState({ dob: getFormatedDateString(dob, value) })
  }

  toggleNotificationEnabled = () => this.setState({ notificationEnabled: !this.state.notificationEnabled })

  toggleAgreeTermsAndConditions = () => this.setState({ agreeTermsAndConditions: !this.state.agreeTermsAndConditions })

  render() {
    const { email, password, confirmPassword, dob, notificationEnabled, agreeTermsAndConditions } = this.state

    return (
      <SafeAreaView style={GlobalStyle.ROOT}>
        <StatusBar barStyle="light-content" />
        <View style={GlobalStyle.topNav}>
          <View style={screenStyles.closeButton}>
            <TouchableOpacity onPress={this.goBack}>
              <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                <Icon iconType="material" name="close" size={24} color={Colors.white} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
          <Text style={screenStyles.navText}>Register</Text>
          <TouchableOpacity
            style={screenStyles.btnRegister}
            onPress={this.onRegister}
            disabled={this.props.status === 'loading'}
          >
            <Text style={screenStyles.btnText}>NEXT</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={screenStyles.formArea} behavior="padding">
          <LoadingView isVisible={this.props.status === 'loading'} />
          <ScrollView style={GlobalStyle.container} contentContainerStyle={GlobalStyle.scrollContent}>
            <FlexView height={20} />
            <TextInput
              label="FIRST NAME"
              placeholder={'John'}
              placeholderTextColor="#CDCDCD"
              blurOnSubmit={false}
              returnKeyType="next"
              reference={this.saveRef('firstName')}
              onSubmitEditing={this.focusInput('lastName')}
              onChangeText={this.updateForm('firstName')}
            />
            <TextInput
              label="LAST NAME"
              placeholder={'Smith'}
              placeholderTextColor="#CDCDCD"
              blurOnSubmit={false}
              returnKeyType="next"
              reference={this.saveRef('lastName')}
              onSubmitEditing={this.focusInput('email')}
              onChangeText={this.updateForm('lastName')}
            />
            <TextInput
              label="EMAIL"
              placeholder={'name@youremail.com'}
              placeholderTextColor="#CDCDCD"
              errorText={email.length !== 0 && !validateEmail(email) ? 'Invalid email' : null}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              reference={this.saveRef('email')}
              onSubmitEditing={this.focusInput('password')}
              onChangeText={this.updateForm('email')}
            />
            <TextInput
              label="PASSWORD"
              placeholder={'******'}
              placeholderTextColor="#CDCDCD"
              errorText={password.length < 6 ? 'Must be at least 6 letters.' : null}
              returnKeyType="next"
              reference={this.saveRef('password')}
              onSubmitEditing={this.focusInput('confirmPassword')}
              onChangeText={this.updateForm('password')}
              secureTextEntry
            />
            <TextInput
              label="CONFIRM PASSWORD"
              placeholder={'******'}
              placeholderTextColor="#CDCDCD"
              errorText={password !== confirmPassword ? 'Password does not match.' : null}
              returnKeyType="next"
              reference={this.saveRef('confirmPassword')}
              onSubmitEditing={this.focusInput('dob')}
              onChangeText={this.updateForm('confirmPassword')}
              secureTextEntry
            />
            <TextInput
              label="BIRTHDATE"
              placeholder={'MM/DD/YYYY'}
              placeholderTextColor="#CDCDCD"
              keyboardType="numeric"
              value={dob}
              returnKeyType="done"
              reference={this.saveRef('dob')}
              onChangeText={this.updateDOB}
            />
            <FlexView flexDirection="row" marginTop={20}>
              <CheckBox
                style={{ width: 20, marginRight: 15 }}
                onClick={this.toggleNotificationEnabled}
                isChecked={notificationEnabled}
              />
              <Text style={{ flex: 1 }}>
                Receive the BetChicago newsletter on upcoming matchups, free contests and live events.
              </Text>
            </FlexView>
            <FlexView flexDirection="row" marginTop={20} marginBottom={20}>
              <CheckBox
                style={{ width: 20, marginRight: 15 }}
                onClick={this.toggleAgreeTermsAndConditions}
                isChecked={agreeTermsAndConditions}
              />
              <Text style={{ flex: 1 }}>
                By registering you agree to the BetChicago Terms of Usage and Privacy Policy. You agree to receive
                updates to related to your account and services you request. Your information will not be selled or
                shared with third parties.
              </Text>
            </FlexView>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  status: state.auth.status,
})

const mapDispatchToProps = dispatch => ({
  registerRequest: (email: string, password: string, payload) =>
    dispatch(AuthActions.registerRequest(email, password, payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen)
