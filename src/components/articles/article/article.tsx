import * as React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { withNavigation, NavigationInjectedProps } from 'react-navigation'
import Share from 'react-native-share'
import AuthActions from '../../../actions/auth'
import { Icon, AsyncImage } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './article.styles'
// import { AuthState } from '../../../reducers/auth'
// import { UpdateProfileParams } from '../../../config/models'

interface ArticleProp extends NavigationInjectedProps {
  articleId: string
  imageLink?: string
  headline?: string
  section?: string
  summary?: string
  date?: string
  // auth: AuthState
  onPress?: () => void
  // updateprofileRequest: (profile: UpdateProfileParams, alert?: string, refetch?: string) => void
}

class ArticleComponent extends React.Component<ArticleProp, {}> {
  onOpenShareMenu = () => {
    let shareOptions = {
      title: 'BetChicago',
      message: 'Please share article.',
      url: 'https://www.betchicago.com/',
      subject: 'Share Link',
    }

    Share.open(shareOptions)
      .then(res => {
        console.log('Share open: ===', res)
      })
      .catch(err => {
        err && console.log(err)
      })
  }

  // onSaveArticle = () => {
  //   const { auth, updateprofileRequest, articleId } = this.props

  //   if (
  //     auth.isLoggedIn &&
  //     auth.timestamp &&
  //     new Date().getTime() - new Date(auth.timestamp).getTime() < 30 * 24 * 60 * 60 * 1000
  //   ) {
  //     // TODO: save article to profile.
  //     updateprofileRequest({
  //       savedArticles: {
  //         ...auth.profile.savedArticles,
  //         [articleId]: { date: new Date().toUTCString(), isDeleted: false },
  //       },
  //     })
  //   } else {
  //     // User have not logged in. redirect to auth flow.
  //     this.props.navigation.navigate('auth')
  //   }
  // }

  render() {
    const { imageLink, headline, section, summary, date, onPress } = this.props

    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.articleItem}>
          <View>
            <TouchableOpacity onPress={onPress}>
              <AsyncImage resizeMode="cover" style={screenStyles.articleImg} source={imageLink} />
            </TouchableOpacity>
          </View>
          <View style={screenStyles.articleContents}>
            <TouchableOpacity onPress={onPress}>
              <Text style={screenStyles.articleTitle}>{headline}</Text>
            </TouchableOpacity>
            {section && <Text style={screenStyles.articleSectionName}>{section}</Text>}
            <Text style={screenStyles.articleExcerpt}>{summary}</Text>
          </View>
          {date && (
            <View style={screenStyles.articleFooter}>
              <Text style={screenStyles.articleTime}>
                <Text style={screenStyles.capitalFont}>{date}</Text>
                <Text style={screenStyles.boldFont}> - bet</Text>
                <Text>chicago</Text>
              </Text>
              <View style={screenStyles.articleSocialIcons}>
                <TouchableOpacity onPress={this.onOpenShareMenu}>
                  <Icon
                    style={screenStyles.socialIcon}
                    iconType="evil"
                    name="share-apple"
                    size={26}
                    color={Colors.active}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={this.onSaveArticle}>
                  <Icon
                    style={screenStyles.socialIcon}
                    iconType="simpleLine"
                    name="folder-alt"
                    size={18}
                    color={Colors.active}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  // updateprofileRequest: (profile, alert = 'Article have been successfully saved.', refetch = null) =>
  //   dispatch(AuthActions.updateprofileRequest(profile, alert, refetch)),
})

export const Article = withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ArticleComponent),
)
