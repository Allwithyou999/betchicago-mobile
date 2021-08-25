import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import { Icon, TopNavigation } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './favorites.styles'
import AuthActions from '../../../actions/auth'
import { AuthState } from '../../../reducers/auth'
import { UpdateProfileParams } from '../../../config/models'

export interface SavedStoriesScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface SavedStoriesScreenState {
  isBusy: boolean
}

class SavedStoriesScreen extends React.Component<SavedStoriesScreenProps, SavedStoriesScreenState> {
  constructor(props) {
    super(props)
    this.state = {
      isBusy: false,
    }
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onToggleTeamFavourite = teamId => () => {
    const { [teamId]: removed, ...rest } = this.props.auth.profile.favouriteTeams
    this.props.updateprofileRequest({ favouriteTeams: rest })
  }

  onTogglePlayerFavourite = playerId => () => {
    const { [playerId]: removed, ...rest } = this.props.auth.profile.favouritePlayers
    this.props.updateprofileRequest({ favouritePlayers: rest })
  }

  onGoToNotifications = type => () => {
    this.props.navigation.navigate('favoriteNotifications', { type: type })
  }

  render() {
    const { auth } = this.props
    const { favouritePlayers, favouriteTeams } = auth.profile

    const players = favouritePlayers || {}
    const teams = favouriteTeams || {}

    // const matchUps = [
    //   { id: '31', homeTeam: 'IND', awayTeam: 'MICH', date: '01/18' },
    //   { id: '32', homeTeam: 'ME', awayTeam: 'NO', date: '02/16' },
    //   { id: '33', homeTeam: 'Blackhawks', awayTeam: 'Blues', date: '02/18' },
    // ]

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="Favorites" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <Text style={screenStyles.description}>
              {`To remove a team from favorites, click the star icon. To add, modify or stop alerts, click the bell icon.`}
            </Text>
            <View style={screenStyles.section}>
              <Text style={screenStyles.label}>TEAMS</Text>
              {Object.keys(teams).map((teamId, index) => (
                <View key={teamId} style={screenStyles.rowItem}>
                  <Text style={screenStyles.rowText}>{teams[teamId].name}</Text>
                  <TouchableOpacity style={screenStyles.starIcon} onPress={this.onToggleTeamFavourite(teamId)}>
                    <Icon iconType="material" name={'star'} size={25} color={Colors.active} />
                  </TouchableOpacity>
                  <TouchableOpacity style={screenStyles.bellIcon} onPress={this.onGoToNotifications(teamId)}>
                    <Icon
                      iconType="material"
                      name={teams[teamId].notifications.apStories ? 'notifications' : 'notifications-none'}
                      size={25}
                      color={teams[teamId].notifications.apStories ? Colors.active : '#777777'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              {Object.keys(teams).length === 0 && (
                <Text style={screenStyles.label}>Click the star icon on team profile to add to your favorites</Text>
              )}

              <Text style={screenStyles.label}>PLAYERS</Text>
              {Object.keys(players).map((playerId, index) => (
                <View key={index} style={screenStyles.rowItem}>
                  <Text style={screenStyles.rowText}>{players[playerId].name}</Text>
                  <TouchableOpacity style={screenStyles.starIcon} onPress={this.onTogglePlayerFavourite(playerId)}>
                    <Icon iconType="material" name="star" size={25} color={Colors.active} />
                  </TouchableOpacity>
                  <TouchableOpacity style={screenStyles.bellIcon} onPress={this.onGoToNotifications(playerId)}>
                    <Icon
                      iconType="material"
                      name={players[playerId].notifications.apStories ? 'notifications' : 'notifications-none'}
                      size={25}
                      color={players[playerId].notifications.apStories ? Colors.active : '#777777'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              {Object.keys(players).length === 0 && (
                <Text style={screenStyles.label}>Click the star icon on player profile to add to your favorites</Text>
              )}

              <Text style={screenStyles.label}>MATCHUPS</Text>
              {/* {matchUps.map((obj, index) => (
                <View key={index} style={screenStyles.rowItem}>
                  <Text style={screenStyles.rowTextDate}>{obj.date}</Text>
                  <Text style={screenStyles.rowText}>{`${obj.awayTeam} @ ${obj.homeTeam}`}</Text>
                  <TouchableOpacity style={screenStyles.starIcon} onPress={this.onToggleNotification(obj.id)}>
                    <Icon
                      iconType="material"
                      name={isSetFavourite[obj.id] ? 'star' : 'star-border'}
                      size={25}
                      color={Colors.active}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={screenStyles.bellIcon} onPress={this.onGoToNotifications(obj.id)}>
                    <Icon
                      iconType="material"
                      name={isSetNotification[obj.id] ? 'notifications' : 'notifications-none'}
                      size={25}
                      color={isSetNotification[obj.id] ? Colors.active : '#777777'}
                    />
                  </TouchableOpacity>
                </View>
              ))} */}
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
  updateprofileRequest: (profile, alert = 'Successfully updated favourites') =>
    dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedStoriesScreen)
