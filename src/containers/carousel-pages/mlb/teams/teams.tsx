import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, Animated, Platform, TouchableOpacity, Image } from 'react-native'
import { NavigationScreenProps, NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { Icon, Article, LoadingView } from '../../../../components'
import MLBActions from '../../../../actions/mlb'
import { Colors } from '../../../../themes'
import * as screenStyles from './teams.styles'

export interface MLBTeamsProps extends NavigationScreenProps<{}> {
  mlbTeamsArticleStatus?: string
  mlbTeamsArticle?: any
  getmlbteamsarticleRequest?: (tag: string, length: number) => void
}

export interface MLBTeamsState {
  isRefreshing: boolean
  slug: string
  slugs: any
}

class MLBTeams extends React.Component<MLBTeamsProps, MLBTeamsState> {
  constructor(props) {
    super(props)

    const slug = this.props.navigation.state.params['slug']
    const slugs = this.props.navigation.state.params['slugs']
    this.state = { isRefreshing: false, slug, slugs }
  }

  componentDidMount() {
    this.initialize()
  }

  initialize() {
    const { slug } = this.state
    let tag = slug.toLowerCase().replace(/[[\]\-{}"'()*+? .\\^$|]/g, '')
    let pageLen = 20
    this.props.getmlbteamsarticleRequest(tag, pageLen)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mlbTeamsArticleStatus !== nextProps.mlbTeamsArticleStatus) {
      if (this.state.isRefreshing && nextProps.mlbTeamsArticleStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.initialize()
  }

  onClosePopup = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  onViewArticleDetail = article => () => {
    this.props.navigation.navigate('article_detail', { article: article })
  }

  render() {
    const { mlbTeamsArticle, mlbTeamsArticleStatus } = this.props
    const { isRefreshing, slug, slugs } = this.state

    let team = {
      name: slugs.slug[slug].name,
      market: slugs.slug[slug].market,
      id: slugs.slug[slug].id,
      logo: slugs.images.logo_60 + slug + '.png?alt=media',
      background: slugs.images.background + slug + '-away.png?alt=media',
      color: slugs.slug[slug]['bg-color'],
    }

    return (
      <View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        <Animated.View style={screenStyles.topHeader}>
          <TouchableOpacity style={screenStyles.closeButton} onPress={this.onClosePopup}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <Icon iconType="material" name="close" size={30} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
        </Animated.View>
        <View style={[screenStyles.topBanner, { backgroundColor: team.color }]}>
          <Image resizeMode={'contain'} source={{ uri: team.background }} style={screenStyles.bannerImg} />
          <Text style={screenStyles.title}>
            {team.market.toUpperCase()} {team.name.toUpperCase()}
          </Text>
        </View>
        <View style={screenStyles.mainContent}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onPageRefresh}
                colors={[Colors.active]}
                tintColor={Colors.active}
              />
            }
          >
            <View style={screenStyles.scrollContents}>
              <View>
                {mlbTeamsArticle.map((article: any, index: number) => (
                  <Article
                    key={index}
                    onPress={this.onViewArticleDetail(article)}
                    articleId={article.id}
                    imageLink={article.imageLink}
                    headline={article.headline}
                    summary={
                      article.summary
                        ? article.summary
                            .split(' ')
                            .splice(0, 50)
                            .join(' ') + '...'
                        : ''
                    }
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <LoadingView isVisible={!isRefreshing && mlbTeamsArticleStatus === 'pending'} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  mlbTeamsArticleStatus: state.mlb.mlbTeamsArticleStatus,
  mlbTeamsArticle: state.mlb.mlbTeamsArticle,
})

const mapDispatchToProps = dispatch => ({
  getmlbteamsarticleRequest: (tag: string, length: number) =>
    dispatch(MLBActions.getmlbteamsarticleRequest(tag, length)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MLBTeams)
