import * as React from 'react'
import { View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { connect } from 'react-redux'
import AuthActions from '../../../actions/auth'
import { AuthState } from '../../../reducers/auth'
import { LoadingView } from '@components'
import * as screenStyles from './launch.styles'

export interface LaunchScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  loginRequest: (email: string, password: string) => void
}

export interface LaunchScreenState {
  isBusy: boolean
}

class Launch extends React.Component<LaunchScreenProps, LaunchScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: true }
  }

  componentDidMount = () => {
    const { auth } = this.props
    console.log(auth)
    if (auth.isLoggedIn && this.props.auth.timestamp && auth.email.length > 1 && auth.password.length > 1) {
      this.props.loginRequest(auth.email, auth.password)
    }

    setTimeout(() => {
      this.props.navigation.navigate('mainStack')
    }, 1000)
  }

  render() {
    const { isBusy } = this.state
    return (
      <View style={screenStyles.ROOT}>
        <LoadingView isVisible={isBusy} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  loginRequest: (email: string, password: string) => dispatch(AuthActions.loginRequest(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Launch)
