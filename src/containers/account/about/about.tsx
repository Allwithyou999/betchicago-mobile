import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, Linking, NativeModules } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { TopNavigation } from '../../../components/account/top-navigation/top-navigation'
import { Icon } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './about.styles'
import { PopupService } from '../../../services/popup'
import { sendEmail } from '../../../services/send-email'

export interface AccountAboutScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface AccountAboutScreenState {
  isBusy: boolean
}

class AccountAboutScreen extends React.Component<AccountAboutScreenProps, AccountAboutScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onShowContent = type => () => {
    this.props.navigation.navigate('aboutTerms', { type: type })
  }

  onSendRequest = type => () => {
    this.props.navigation.navigate('requestFeature', { type: type })
  }

  onSendFeedBack = (email: string, subject: string) => () => {
    sendEmail(email, subject).then(
      () => {
        PopupService.show('Thank you for your feedback')
      },
      err => PopupService.show('Cannot process your request'),
    )
  }

  render() {
    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="About" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <View style={screenStyles.topBanner}>
              <Text style={screenStyles.subject}>
                <Text style={screenStyles.bold}>bet</Text> chicago
              </Text>
              <Text style={screenStyles.desc}>
                Bet Chicago’s mission is to provide Illinois sports fans with the most up-to-date and reliable
                information on sports, stats, trends and betting information available.
              </Text>
            </View>
            <View>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onShowContent('Terms')}>
                <Text style={screenStyles.rowText}>Terms of Use</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onShowContent('Privacy')}>
                <Text style={screenStyles.rowText}>Privacy Policy</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onShowContent('Copyright')}>
                <Text style={screenStyles.rowText}>Copyright</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
            </View>
            <View style={screenStyles.feedback}>
              <Text style={screenStyles.label}>Feedback</Text>
              <TouchableOpacity
                style={screenStyles.rowItem}
                onPress={this.onSendFeedBack('nicki@betchicago.com', 'Bug Report')}
              >
                <Text style={screenStyles.rowText}>Report A Bug</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity style={screenStyles.rowItem} onPress={this.onSendRequest('Request Feature')}>
                <Text style={screenStyles.rowText}>Request A Feature</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={screenStyles.rowItem}
                onPress={this.onSendFeedBack('nicki@betchicago.com', 'FeedBack')}
              >
                <Text style={screenStyles.rowText}>Give Feedback</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={screenStyles.rowItem}
                onPress={this.onSendFeedBack('editorial@betchicago.com', 'News Tip')}
              >
                <Text style={screenStyles.rowText}>Send News Tip</Text>
                <Icon
                  iconType="font"
                  name="chevron-right"
                  size={17}
                  color={'#D1D1D6'}
                  style={screenStyles.arrowRight}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={screenStyles.versionInfo}>Version 2.0.0 (build 1.0.0)</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
)(AccountAboutScreen)
