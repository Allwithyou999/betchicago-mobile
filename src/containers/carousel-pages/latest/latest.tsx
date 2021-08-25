import * as React from 'react'
import { View, ScrollView, Text, RefreshControl, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import Spinner from 'react-native-spinkit'
import AppActions from '../../../actions/app'
import AuthActions from '../../../actions/auth'
import { AuthState } from '../../../reducers/auth'
import { Colors } from '../../../themes'
import { NewsSlider, SectionDivider, Article, LoadMoreButton, LoadingView } from '../../../components'
import { ARTICLESPAGESIZE } from '../../../config/constants/common'
import * as screenStyles from './latest.styles'

export interface LatestScreenProps {
  navigation?: any
  headlines?: Array<string>
  sliderStatus?: string
  articlesStatus?: string
  picksSlider?: Array<object>
  articles?: Array<object>
  auth: AuthState
  getpickscarouselRequest?: (isRefresh: boolean, headlines?: Array<string>) => void
  getarticlesRequest?: (skip: number, limit: number) => void
}

export interface LatestScreenState {
  isRefreshing: boolean
  allArticles: any[]
  articleCount: number
}

class Latest extends React.Component<LatestScreenProps, LatestScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, allArticles: [], articleCount: ARTICLESPAGESIZE }
  }

  componentDidMount() {
    this.initialize()
  }

  initialize() {
    this.props.getpickscarouselRequest(false, this.props.headlines)
    this.props.getarticlesRequest(0, ARTICLESPAGESIZE)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.articles !== nextProps.articles) {
      let allArticles = this.state.allArticles
      allArticles = allArticles.concat(nextProps.articles)
      this.setState({ allArticles })
    }

    if (this.props.sliderStatus !== nextProps.sliderStatus || this.props.articlesStatus !== nextProps.articlesStatus) {
      if (this.state.isRefreshing && nextProps.sliderStatus === 'done' && nextProps.articlesStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  _onPageRefresh = () => {
    const { getarticlesRequest, getpickscarouselRequest } = this.props
    this.setState({ isRefreshing: true })
    this.setState({ allArticles: [], articleCount: ARTICLESPAGESIZE })
    getpickscarouselRequest(true)
    getarticlesRequest(0, ARTICLESPAGESIZE)
  }

  onViewArticleDetail = article => () => {
    this.props.navigation.navigate('article_detail', { article: article })
  }

  onLoadMoreArticles = () => {
    const articleCount = this.state.articleCount * 2

    this.props.getarticlesRequest(this.state.articleCount, ARTICLESPAGESIZE)
    this.setState({ articleCount })
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  render() {
    const { articlesStatus, picksSlider, sliderStatus } = this.props
    const { allArticles, isRefreshing, articleCount } = this.state

    return (
      <React.Fragment>
        <ScrollView
          style={screenStyles.ROOT}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onPageRefresh}
              colors={[Colors.active]}
              tintColor={Colors.active}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent) && articlesStatus === 'done') {
              this.onLoadMoreArticles()
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={screenStyles.scrollContents}>
            {picksSlider && <NewsSlider list={picksSlider} onPress={this.onViewArticleDetail} />}
            {allArticles.map((article, index) => (
              <View key={index}>
                <SectionDivider />
                <Article
                  onPress={this.onViewArticleDetail(article)}
                  articleId={article.id}
                  imageLink={article['image']}
                  headline={article['headline']}
                  summary={article['summary']}
                  date={moment(article['date']).fromNow()}
                />
              </View>
            ))}
            <View style={screenStyles.loadMoreView}>
              <Spinner size={40} color={Colors.active} type={'Circle'} isVisible={articlesStatus !== 'done'} />
            </View>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing && articleCount === ARTICLESPAGESIZE && (sliderStatus !== 'done' || articlesStatus !== 'done')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  sliderStatus: state.app.sliderStatus,
  articlesStatus: state.app.articlesStatus,
  picksSlider: state.app.picksSlider,
  articles: state.app.articles,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  getpickscarouselRequest: (isRefresh: boolean, headlines?: Array<string>) =>
    dispatch(AppActions.getpickscarouselRequest(isRefresh, headlines)),
  getarticlesRequest: (skip: number, limit: number) => dispatch(AppActions.getarticlesRequest(skip, limit)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Latest))
