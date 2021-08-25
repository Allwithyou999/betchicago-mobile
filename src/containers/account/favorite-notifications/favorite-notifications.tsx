import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon, TopNavigation } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './favorite-notifications.styles'
import { title } from '../../carousel-pages/golf/player-detail/player-detail.styles'

export interface FavoriteNotificationsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  dispatch?: () => void
}

export interface FavoriteNotificationsScreenState {
  isBusy: boolean
  list: Array<object>
}

class FavoriteNotificationsScreen extends React.Component<
  FavoriteNotificationsScreenProps,
  FavoriteNotificationsScreenState
> {
  constructor(props) {
    super(props)
    this.state = {
      isBusy: false,
      list: [
        { title: 'Notifications', val: true },
        { title: 'BetChicago Stories Post', val: false },
        { title: 'AP Stories Post', val: false },
        { title: 'Matchup Odds Post', val: false },
        { title: 'Matchup Odds Change', val: false },
        { title: 'Game Updates', val: false },
        { title: 'injury Updates', val: false },
      ],
    }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onToggleNotification = index => value => {
    let list = this.state.list
    list[index]['val'] = value

    this.setState({ list })
  }

  render() {
    const { list } = this.state

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="Favorite Notifications" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <Text style={screenStyles.description}>
              {`You are modifying notification settings for this individual favorite. To modify all notification settings click the notifications link on the Account page.`}
            </Text>
            <View style={screenStyles.section}>
              <Text style={screenStyles.label}>PUSH NOTIFICATIONS</Text>
              {list.map((item, index) => (
                <React.Fragment key={index}>
                  <View style={screenStyles.rowItem}>
                    <Text style={screenStyles.rowText}>{item['title']}</Text>
                    <Switch
                      trackColor={{ false: null, true: Colors.active }}
                      value={item['val']}
                      onValueChange={this.onToggleNotification(index)}
                    />
                  </View>
                  {index === 0 && <View style={screenStyles.divider} />}
                </React.Fragment>
              ))}
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
)(FavoriteNotificationsScreen)
