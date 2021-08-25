import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { TopNavigation } from '../../../components/account/top-navigation/top-navigation'
import { Icon } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './home.styles'
import AuthActions from '../../../actions/auth'
import { AuthState } from '../../../reducers/auth'

export interface AccountHomeScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  logoutRequest: () => void
}

export interface AccountHomeScreenState {
  isBusy: boolean
}

class AccountHomeScreen extends React.Component<AccountHomeScreenProps, AccountHomeScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onNavigatePage = pageName => () => {
    this.props.navigation.navigate(pageName)
  }

  onSignOut = () => {
    this.props.logoutRequest()
  }

  render() {
    const { auth } = this.props
    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="Account" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <View style={screenStyles.photoView}>
              <View style={screenStyles.photo}>
                <Text style={screenStyles.photoAlt}>{`${auth.profile.firstName && auth.profile.firstName[0]}${auth
                  .profile.lastName && auth.profile.lastName[0]}`}</Text>
              </View>
              <Text style={screenStyles.userName}>{`${auth.profile.firstName} ${auth.profile.lastName}`}</Text>
              <Text style={screenStyles.userEmail}>{auth.email}</Text>
            </View>
            <View>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onNavigatePage('accountProfile')}>
                <Text style={screenStyles.itemSubject}>My Profile</Text>
                <Text style={screenStyles.itemDesc}>Name, email, profile data</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <View style={screenStyles.divider} />
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onNavigatePage('savedStories')}>
                <Text style={screenStyles.itemSubject}>Saved Stories</Text>
                <Text style={screenStyles.itemDesc}>All your saved stories in one feed</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onNavigatePage('accountFavorites')}>
                <Text style={screenStyles.itemSubject}>Favorites</Text>
                <Text style={screenStyles.itemDesc}>Manage favorite teams and players</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onNavigatePage('accounyNotifications')}>
                <Text style={screenStyles.itemSubject}>Notifications</Text>
                <Text style={screenStyles.itemDesc}>Add or modify notification settings</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <View style={screenStyles.divider} />
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onNavigatePage('accountAbout')}>
                <Text style={screenStyles.itemSubject}>About</Text>
                <Text style={screenStyles.itemDesc}>Terms, privacy policy and feedback</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <View style={screenStyles.buttons}>
                <TouchableOpacity onPress={this.onSignOut}>
                  <Text style={screenStyles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onBack}>
                  <Text style={screenStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(AuthActions.logoutRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountHomeScreen)
