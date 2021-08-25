import * as React from 'react'
import { View, Animated, ScrollView, Platform, TouchableOpacity, Text, Linking } from 'react-native'
import { NavigationScreenProps, NavigationActions, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import moment from 'moment'
import marked from 'marked'
import HTML from 'react-native-render-html'
import { Icon, AuthorImage } from '../../../../components'
import { Colors, Metrics } from '../../../../themes'
import * as screenStyles from './article-detail.styles'

const IMAGES_MAX_WIDTH = Metrics.screenWidth - 40
const DEFAULT_PROPS = {
  imagesMaxWidth: IMAGES_MAX_WIDTH,
  onLinkPress: (evt, href) => {
    Linking.openURL(href)
  },
  debug: true,
}

export interface ArticleDetailScreenProps extends NavigationScreenProps<{}> {
  dispatch?: () => void
}

export interface ArticleDetailScreenState {
  isImageLoading: boolean
  scrollY: AnimatedValue
}

class ArticleDetail extends React.Component<ArticleDetailScreenProps, ArticleDetailScreenState> {
  constructor(props) {
    super(props)
    this.state = { isImageLoading: true, scrollY: new Animated.Value(0) }
  }

  convertDateFormat = date => {
    let articleDateDisplay = ''
    if (date) {
      articleDateDisplay = new Date(date).toString()
      articleDateDisplay = articleDateDisplay.split('G')[0]

      if (moment) {
        let newDate = new Date(date).getTime()
        articleDateDisplay = moment(newDate).format('MMMM DD, YYYY - h:mmA ')

        let tz = new Date()
          .toLocaleString('en', { timeZoneName: 'short' })
          .split(' ')
          .pop()
        articleDateDisplay += tz.toString()
      }
    }

    return articleDateDisplay
  }

  onClosePopup = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const article = this.props.navigation.state.params['article']
    const { isImageLoading, scrollY } = this.state

    let noAuthorText = 'Associated Press'

    const HEADER_MAX_HEIGHT = 250
    const HEADER_MIN_HEIGHT = 0
    const HEADER_SCROLL_DISTANCE = 250
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const headerColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)'],
      extrapolate: 'clamp',
    })

    const detailsHTML = marked(article['content'])

    return (
      <View style={screenStyles.ROOT}>
        <Animated.View style={[screenStyles.topHeader, { backgroundColor: headerColor }]}>
          <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
          <TouchableOpacity style={screenStyles.closeButton} onPress={this.onClosePopup}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              {isImageLoading ? (
                <Icon iconType="material" name="close" size={30} color={Colors.black} />
              ) : (
                <Icon style={screenStyles.closeIcon} iconType="material" name="close" size={30} color={Colors.white} />
              )}
            </Animatable.View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[screenStyles.topBanner, { height: headerHeight }]}>
          <Animated.Image
            source={{ uri: article['image'] }}
            style={[screenStyles.articleImg]}
            onLoadStart={() => this.setState({ isImageLoading: true })}
            onLoadEnd={() => this.setState({ isImageLoading: false })}
          />
        </Animated.View>
        <ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
        >
          <View style={screenStyles.scrollContents}>
            <View style={screenStyles.articleContent}>
              <Animated.View style={screenStyles.articleNameBack}>
                <Text style={screenStyles.articleName}>{article['headline']}</Text>
                <Text style={screenStyles.articleDate}>{this.convertDateFormat(article['date'])}</Text>
              </Animated.View>
              <View style={screenStyles.mainContent}>
                {article['author'] ? (
                  <View style={screenStyles.authorInfo}>
                    <AuthorImage source={article['authorImage']} />
                    <View style={screenStyles.authorText}>
                      <Text style={screenStyles.textBold}>{article['author']}</Text>
                      {article['authorTitle'] !== '' && <Text>{article['authorTitle']}</Text>}
                    </View>
                  </View>
                ) : (
                  <View style={screenStyles.authorInfo}>
                    <View style={screenStyles.authorText}>
                      <Text style={screenStyles.textBold}>{noAuthorText}</Text>
                    </View>
                  </View>
                )}
                <HTML
                  {...DEFAULT_PROPS}
                  html={detailsHTML}
                  {...{
                    tagsStyles: {
                      p: {
                        fontSize: 17,
                        lineHeight: 23,
                        fontFamily: 'Roboto-light',
                        marginVertical: 15,
                      },
                    },
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleDetail)
