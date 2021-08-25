import * as React from 'react'
import { View, ScrollView, Text, RefreshControl } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import moment from 'moment'
import Spinner from 'react-native-spinkit'
import NewsActions from '../../../../actions/news'
import AuthActions from '../../../../actions/auth'
import { Colors } from '../../../../themes'
import { NewsSlider, SectionDivider, Article, LoadMoreButton, LoadingView } from '../../../../components'
import { ARTICLESPAGESIZE } from '../../../../config/constants/common'
import * as screenStyles from './news.styles'
import { AuthState } from '../../../../reducers/auth'

export interface NewsScreenProps {
  navigation?: any
  name?: string
  isLoadingStart?: boolean
  headlines?: Array<string>
  sectionID?: string
  newsPinsStatus?: string
  newsStatus?: string
  newsPins: Array<object>
  news?: Array<object>
  auth: AuthState
  getnewspinsRequest?: (isRefresh: boolean, headlines?: Array<string>, id?: string) => void
  getnewsRequest?: (skip: number, limit: number, id: string) => void
}

export interface NewsScreenState {
  isRefreshing: boolean
  carousel: any[]
  allNews: any[]
  newsCount: number
}

class News extends React.Component<NewsScreenProps, NewsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false, allNews: [], carousel: null, newsCount: ARTICLESPAGESIZE }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoadingStart !== nextProps.isLoadingStart && nextProps.isLoadingStart) {
      this.initialize(false)
    }

    if (
      this.props.newsPins &&
      nextProps.newsPins &&
      this.props.newsPins[this.props.sectionID] !== nextProps.newsPins[this.props.sectionID]
    ) {
      this.setState({ carousel: nextProps.newsPins[this.props.sectionID] })
    }

    if (
      this.props.news &&
      nextProps.news &&
      this.props.news[this.props.sectionID] !== nextProps.news[this.props.sectionID]
    ) {
      let allNews = this.state.allNews
      allNews = allNews.concat(nextProps.news[this.props.sectionID])
      this.setState({ allNews })
    }

    if (this.props.newsPinsStatus !== nextProps.newsPinsStatus || this.props.newsStatus !== nextProps.newsStatus) {
      if (this.state.isRefreshing && nextProps.newsPinsStatus === 'done' && nextProps.newsStatus === 'done') {
        this.setState({ isRefreshing: false })
      }
    }
  }

  initialize(isRefresh) {
    if (this.props.sectionID) {
      this.props.getnewspinsRequest(isRefresh, this.props.headlines, this.props.sectionID)
      this.props.getnewsRequest(0, ARTICLESPAGESIZE, this.props.sectionID)
    }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    this.setState({ allNews: [], newsCount: ARTICLESPAGESIZE })
    this.initialize(true)
  }

  onViewArticleDetail = article => () => {
    this.props.navigation.navigate('article_detail', { article: article })
  }

  onLoadMoreArticles = () => {
    const newsCount = this.state.newsCount * 2

    this.props.getnewsRequest(this.state.newsCount, ARTICLESPAGESIZE, this.props.sectionID)
    this.setState({ newsCount })
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  render() {
    const { newsPinsStatus, newsStatus, isLoadingStart } = this.props
    const { carousel, allNews, isRefreshing } = this.state

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
            if (this.isCloseToBottom(nativeEvent) && newsStatus === 'done') {
              this.onLoadMoreArticles()
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={screenStyles.scrollContents}>
            {carousel && <NewsSlider type="EP" list={carousel} onPress={this.onViewArticleDetail} />}
            {allNews.map((article, index) => (
              <View key={index}>
                {!(!carousel && index === 0) && <SectionDivider />}
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
              <Spinner size={40} color={Colors.active} type={'Circle'} isVisible={newsStatus !== 'done'} />
            </View>
          </View>
        </ScrollView>
        <LoadingView
          isVisible={
            !isRefreshing &&
            this.state.newsCount === ARTICLESPAGESIZE &&
            (!isLoadingStart || newsPinsStatus !== 'done' || newsStatus !== 'done')
          }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  newsPinsStatus: state.news.newsPinsStatus,
  newsStatus: state.news.newsStatus,
  newsPins: state.news.newsPins,
  news: state.news.news,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  getnewspinsRequest: (isRefresh: boolean, headlines?: Array<string>, id?: string) =>
    dispatch(NewsActions.getnewspinsRequest(isRefresh, headlines, id)),
  getnewsRequest: (skip: number, limit: number, id: string) => dispatch(NewsActions.getnewsRequest(skip, limit, id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(News))
