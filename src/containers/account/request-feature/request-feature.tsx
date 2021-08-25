import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Icon, AccountHeader, AsyncImage } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './request-feature.styles'
import { PopupService } from '../../../services/popup'
import { sendEmail } from '../../../services/send-email'

export interface RequestFeatureScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface RequestFeatureScreenState {
  isBusy: boolean
  type: string
  email: string
  body: string
  fullName: string
}

class RequestFeatureScreen extends React.Component<RequestFeatureScreenProps, RequestFeatureScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isBusy: false,
      type: this.props.navigation.state.params['type'],
      email: '',
      body: '',
      fullName: '',
    }
  }

  updateForm = (key: 'email' | 'body' | 'fullName') => (value: string) => {
    this.setState({ [key]: value } as any)
  }

  onSend = () => {
    const { fullName, email, body } = this.state
    const message = `${body}
    
    ${fullName}
    ${email}`
    sendEmail('nicki@betchicago.com', 'Request Feature', message).then(
      () => {
        setTimeout(() => PopupService.show('Thank you for your feedback'), 1000)
      },
      err => PopupService.show('Cannot process your request'),
    )
  }

  onCancel = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { type, fullName, email, body } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <AccountHeader label="SEND" onLeftPress={this.onCancel} onRightPress={this.onSend} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <Text style={screenStyles.pageSubject}>Request Feature</Text>
            <View style={screenStyles.form}>
              <View style={screenStyles.field}>
                <Text style={screenStyles.label}>Name</Text>
                <TextInput
                  placeholder={'Enter Full Name'}
                  style={screenStyles.textValue}
                  value={fullName}
                  onChangeText={this.updateForm('fullName')}
                />
              </View>
              <View style={screenStyles.field}>
                <Text style={screenStyles.label}>
                  Email <Text style={screenStyles.italicText}>(optional, required for response)</Text>
                </Text>
                <TextInput
                  placeholder={'Email Address'}
                  style={screenStyles.textValue}
                  value={email}
                  onChangeText={this.updateForm('email')}
                />
              </View>
              <View style={[screenStyles.field, screenStyles.noBorder]}>
                <Text style={screenStyles.label}>Message</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={5}
                  placeholder={type === 'Request Feature' ? 'Describe Feature...' : 'Feedback'}
                  style={screenStyles.textValue}
                  value={body}
                  onChangeText={this.updateForm('body')}
                />
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
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestFeatureScreen)
