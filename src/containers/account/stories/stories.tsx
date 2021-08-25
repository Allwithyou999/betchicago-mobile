import * as React from 'react'
import { Platform, ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import Share from 'react-native-share'
import { Icon, TopNavigation, AsyncImage } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './stories.styles'
import AuthActions from '../../../actions/auth'
import { AuthState } from '../../../reducers/auth'
import { UpdateProfileParams } from '../../../config/models'

export interface SavedStoriesScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  auth: AuthState
  getsavedarticlesRequest: () => void
  updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

export interface SavedStoriesScreenState {
  isBusy: boolean
}

class SavedStoriesScreen extends React.Component<SavedStoriesScreenProps, SavedStoriesScreenState> {
  constructor(props) {
    super(props)
    this.state = { isBusy: false }
  }

  componentDidMount() {
    this.props.getsavedarticlesRequest()
  }

  onBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onOpenShareMenu = () => {
    let shareOptions = {
      title: 'BetChicago',
      message: 'Please share article.',
      url: 'https://www.betchicago.com/',
      subject: 'Share Link',
    }

    Share.open(shareOptions)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        err && console.log(err)
      })
  }

  onOpenDetails = article => () => {
    this.props.navigation.navigate('story_detail', { article: article })
  }

  onRemoveSaved = story => () => {
    const { auth, updateprofileRequest } = this.props
    const { profile } = auth

    const { [story.id]: removed, ...newSavedStories } = profile.savedArticles
    updateprofileRequest(
      { ...auth.profile, savedArticles: newSavedStories },
      'Successfully removed article',
      'ARTICLES',
    )
  }

  render() {
    const { auth } = this.props
    const { savedArticles } = auth

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <TopNavigation title="Saved Stories" onPress={this.onBack} />
        <ScrollView>
          <View style={screenStyles.scrollContents}>
            <Text style={screenStyles.description}>
              {`Your saved stories appear below in published order.\nTo remove a story from this feed, click the trash icon.`}
            </Text>
            <View>
              {savedArticles.length > 0 &&
                savedArticles.map((story, index) => (
                  <React.Fragment key={index}>
                    <View style={screenStyles.storyItem}>
                      <TouchableOpacity onPress={this.onOpenDetails(story)}>
                        <AsyncImage resizeMode="cover" style={screenStyles.storyImg} source={story['image']} />
                      </TouchableOpacity>
                      <View style={screenStyles.mainStory}>
                        <TouchableOpacity onPress={this.onOpenDetails(story)}>
                          <Text style={screenStyles.storyTitle}>{story['headline']}</Text>
                        </TouchableOpacity>
                        <View style={screenStyles.storyFooter}>
                          <Text style={screenStyles.storyDate}>
                            <Text>{moment(story['date']).fromNow()}</Text>
                            <Text>{' - '}</Text>
                            <Text style={screenStyles.boldFont}>{'bet '}</Text>
                            <Text>{'chicago'}</Text>
                          </Text>
                          <View style={screenStyles.storyIcons}>
                            <TouchableOpacity onPress={this.onOpenShareMenu}>
                              <Icon
                                style={screenStyles.socialIcon}
                                iconType="evil"
                                name="share-apple"
                                size={26}
                                color={'#0064C7'}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onRemoveSaved(story)}>
                              <Icon
                                style={screenStyles.socialIcon}
                                iconType="material"
                                name="delete"
                                size={22}
                                color={'#0064C7'}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={screenStyles.divider} />
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
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  getsavedarticlesRequest: () => dispatch(AuthActions.getsavedarticlesRequest()),
  updateprofileRequest: (profile, alert = 'Successfully updated stories.', refetch = null) =>
    dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedStoriesScreen)
