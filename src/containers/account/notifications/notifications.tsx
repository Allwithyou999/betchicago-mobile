import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon, TopNavigation } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './notifications.styles'
import { AuthState } from '../../../reducers/auth'
import AuthActions from '../../../actions/auth'
import { UpdateProfileParams } from '../../../config/models'

export interface AccounyNotificationsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface AccounyNotificationsScreenState {
  emailUpdates: {
    bcNewsLetter: boolean
    contestUpdates: boolean
    eventUpdates: boolean
    morningScoreBoard: boolean
  }
  notifications: {
    apStories: boolean
    bcStories: boolean
    breakingNews: boolean
    contestUpdates: boolean
    gameUpdates: boolean
    injuryUpdates: boolean
    oddsChange: boolean
    oddsPost: boolean
    pushNotifications: boolean
  }
}

class AccounyNotificationsScreen extends React.Component<
  AccounyNotificationsScreenProps,
  AccounyNotificationsScreenState
> {
  timeout: number = null
  state: AccounyNotificationsScreenState = {
    emailUpdates: this.props.auth.profile.emailUpdates,
    notifications: this.props.auth.profile.notifications,
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  updateNotificationSettings = (primaryKey: keyof AccounyNotificationsScreenState, secondaryKey: string) => (
    value: boolean,
  ) => {
    this.setState({ [primaryKey]: { ...this.state[primaryKey], [secondaryKey]: value } } as any)
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(this.updateSettings, 5000)
  }

  updateSettings = () => {
    this.props.updateprofileRequest({ ...this.props.auth.profile, ...this.state })
  }

  renderSwitch = (
    title: string,
    value: boolean,
    primaryKey: 'notifications' | 'emailUpdates',
    secondaryKey: string,
  ) => (
    <View key={`${primaryKey}.${secondaryKey}`} style={screenStyles.rowItem}>
      <Text style={screenStyles.rowText}>{title}</Text>
      <Switch
        // trackColor={{ false: null, true: Colors.active }}
        value={value}
        onValueChange={this.updateNotificationSettings(primaryKey, secondaryKey)}
      />
    </View>
  )

  render() {
    const { emailUpdates, notifications } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="Notifications" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <Text style={screenStyles.description}>
              {`Use the settings below to control how we communicate with you and what information your receive.`}
            </Text>
            <View style={screenStyles.section}>
              <Text style={screenStyles.label}>PUSH NOTIFICATIONS</Text>
              {this.renderSwitch(
                'Notifications',
                notifications.pushNotifications,
                'notifications',
                'pushNotifications',
              )}
              {this.renderSwitch('Breaking News', notifications.breakingNews, 'notifications', 'breakingNews')}
              {this.renderSwitch('Contest Updates', notifications.contestUpdates, 'notifications', 'contestUpdates')}
              <View style={screenStyles.divider} />
              <Text style={screenStyles.label}>EMAIL UPDATES</Text>
              {this.renderSwitch(
                'Morning Scroeboard',
                emailUpdates.morningScoreBoard,
                'emailUpdates',
                'morningScoreBoard',
              )}
              {this.renderSwitch('BC Newsletter', emailUpdates.bcNewsLetter, 'emailUpdates', 'bcNewsLetter')}
              {this.renderSwitch('Contest Updates', emailUpdates.contestUpdates, 'emailUpdates', 'contestUpdates')}
              {this.renderSwitch('Live Event Updates', emailUpdates.eventUpdates, 'emailUpdates', 'eventUpdates')}
            </View>
            <Text style={screenStyles.description}>
              {`*All active users will receive email updates regarding account changes, updates to terms or policies and other business related messages.`}
            </Text>
            <View style={screenStyles.section}>
              <Text style={screenStyles.label}>DEFAULT FAVORITE NOTIFICATIONS</Text>
              {this.renderSwitch('BetChicago Stories Post', notifications.bcStories, 'notifications', 'bcStories')}
              {this.renderSwitch('AP Stories Post', notifications.apStories, 'notifications', 'apStories')}
              {this.renderSwitch('Matchup Odds Post', notifications.oddsPost, 'notifications', 'oddsPost')}
              {this.renderSwitch('Matchup Odds Change', notifications.oddsChange, 'notifications', 'oddsChange')}
              {this.renderSwitch('Game Updates', notifications.gameUpdates, 'notifications', 'gameUpdates')}
              {this.renderSwitch('Injury Updates', notifications.injuryUpdates, 'notifications', 'injuryUpdates')}
            </View>
            <Text style={screenStyles.description}>
              {`*Use the settings above to set default alerts when you request alerts on your favorite teams, players or matchups. Individual alerts for favorites can be set from the Account > Favorites page.`}
            </Text>
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
  updateprofileRequest: profile => dispatch(AuthActions.updateprofileRequest(profile, null)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccounyNotificationsScreen)
