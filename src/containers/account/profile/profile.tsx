import * as React from 'react'
import {
  Platform,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput as RNTextInput,
  Alert,
} from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import { AccountHeader, Icon } from '../../../components'
import { TextInput } from '../../../components/shared/text-input'
import { Colors, GlobalStyle } from '../../../themes'
import * as screenStyles from './profile.styles'
import { AuthState } from '../../../reducers/auth'
import AuthActions from '../../../actions/auth'
import { getFormatedDateString, validateEmail, validatePassword } from '../../../services'
import { UpdateProfileParams } from '../../../config/models'

export interface AccountProfileScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface AccountProfileScreenState {
  isBusy: boolean
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  dob: string
}

class AccountProfileScreen extends React.Component<AccountProfileScreenProps, AccountProfileScreenState> {
  inputs: React.RefObject<RNTextInput>[] = []
  constructor(props: AccountProfileScreenProps) {
    super(props)
    this.state = {
      isBusy: false,
      firstName: props.auth.profile.firstName || '',
      lastName: props.auth.profile.lastName || '',
      email: props.auth.email || '',
      password: '',
      confirmPassword: '',
      dob: moment(props.auth.profile.dob).format('MM/DD/YYYY'),
    }
  }

  updateForm = (key: string) => (value: string) => this.setState({ [key]: value } as any)

  updateDOB = (value: string) => this.setState({ dob: getFormatedDateString(this.state.dob, value) })

  saveRef = (key: string) => {
    this.inputs[key] = React.createRef<RNTextInput>()
    return this.inputs[key]
  }

  focusInput = (key: string) => () => {
    this.inputs[key].current.focus()
  }

  onSave = () => {
    const { firstName, lastName, email, password, confirmPassword, dob } = this.state
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
    this.props.updateprofileRequest({ firstName, lastName, email, password, dob: moment(dob).format('YYYY-MM-DD') })
  }

  onCancel = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  deleteAccount = () => {
    this.props.updateprofileRequest({ isActive: false, deleteDate: moment().format('YYYY-MM-DD') })
  }

  render() {
    const { firstName, lastName, password, confirmPassword, email, dob } = this.state
    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <AccountHeader label="Save" onLeftPress={this.onCancel} onRightPress={this.onSave} />
        <KeyboardAvoidingView style={GlobalStyle.container} behavior="padding">
          <ScrollView style={GlobalStyle.container} contentContainerStyle={screenStyles.scrollContents}>
            <Text style={screenStyles.pageSubject}>Edit My Profile</Text>
            <View style={screenStyles.form}>
              <TextInput
                label="FIRST NAME"
                labelColor="#878787"
                placeholder={'John'}
                placeholderTextColor="#CDCDCD"
                blurOnSubmit={false}
                returnKeyType="next"
                reference={this.saveRef('firstName')}
                onSubmitEditing={this.focusInput('lastName')}
                onChangeText={this.updateForm('firstName')}
                value={firstName}
                containerStyle={screenStyles.field}
              />
              <TextInput
                label="LAST NAME"
                labelColor="#878787"
                placeholder={'Smith'}
                placeholderTextColor="#CDCDCD"
                blurOnSubmit={false}
                returnKeyType="next"
                reference={this.saveRef('lastName')}
                onSubmitEditing={this.focusInput('email')}
                onChangeText={this.updateForm('lastName')}
                value={lastName}
                containerStyle={screenStyles.field}
              />
              <TextInput
                label="EMAIL"
                labelColor="#878787"
                placeholder={'name@youremail.com'}
                placeholderTextColor="#CDCDCD"
                errorText={email.length !== 0 && !validateEmail(email) ? 'Invalid email' : null}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                reference={this.saveRef('email')}
                onSubmitEditing={this.focusInput('password')}
                onChangeText={this.updateForm('email')}
                containerStyle={screenStyles.field}
                value={email}
              />
              <TextInput
                label="PASSWORD"
                labelColor="#878787"
                placeholder={'******'}
                placeholderTextColor="#CDCDCD"
                errorText={password.length < 6 ? 'Must be at least 6 letters.' : null}
                returnKeyType="next"
                reference={this.saveRef('password')}
                onSubmitEditing={this.focusInput('confirmPassword')}
                onChangeText={this.updateForm('password')}
                containerStyle={screenStyles.field}
                secureTextEntry
              />
              <TextInput
                label="CONFIRM PASSWORD"
                labelColor="#878787"
                placeholder={'******'}
                placeholderTextColor="#CDCDCD"
                errorText={password !== confirmPassword ? 'Password does not match.' : null}
                returnKeyType="next"
                reference={this.saveRef('confirmPassword')}
                onSubmitEditing={this.focusInput('dob')}
                onChangeText={this.updateForm('confirmPassword')}
                containerStyle={screenStyles.field}
                secureTextEntry
              />
              <TextInput
                label="BIRTHDATE"
                labelColor="#878787"
                placeholder={'MM/DD/YYYY'}
                placeholderTextColor="#CDCDCD"
                keyboardType="numeric"
                value={dob}
                returnKeyType="done"
                reference={this.saveRef('dob')}
                containerStyle={screenStyles.field}
                onChangeText={this.updateDOB}
              />
            </View>
            <TouchableOpacity style={screenStyles.rowItem}>
              <Text style={screenStyles.rowText}>Upload Profile Image</Text>
              <Icon iconType="font" name="chevron-right" size={17} color={'#D1D1D6'} style={screenStyles.arrowRight} />
            </TouchableOpacity>
            <TouchableOpacity style={screenStyles.rowItem} onPress={this.deleteAccount}>
              <Text style={screenStyles.rowText}>Delete My Account</Text>
              <Icon iconType="font" name="chevron-right" size={17} color={'#D1D1D6'} style={screenStyles.arrowRight} />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  updateprofileRequest: (profile, alert = 'Successfully updated profile.', refetch = null) =>
    dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountProfileScreen)
