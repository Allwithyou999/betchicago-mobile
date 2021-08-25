import * as React from 'react'
import { Platform, View, Animated } from 'react-native'
import { NavigationScreenProps, withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { IndicatorViewPager, PagerTitleIndicator } from 'rn-viewpager'
import {
  Latest,
  News,
  // MLBOdds,
  // MLBSchedule,
  // MLBScoreboard,
  // MLBStandings,
  // GolfLeaderboard,
  // GolfOdds,
  // GolfRankings,
  // GolfSchedule,
  // NFLOdds,
  // NFLSchedule,
  // NFLStandings,
  // NFLStats,
  // NCAASchedule,
  // NCAAStandings,
  // NCAARankings,
  // NCAAFutures,
  // NBAScores,
  // NBASchedule,
  // NBAStandings,
  // NBAStats,
} from '../carousel-pages'
import AppActions from '../../actions/app'
import { LoadingView } from '../../components'
import * as screenStyles from './home.styles'

export interface HomeScreenProps extends NavigationScreenProps<{}> {
  status: string
  page: string
  navItemList: Array<string>
  getnavbarRequest?: () => void
  navigateToPage: (page: string) => void
}

export interface HomeScreenState {
  delayLoading: boolean
  pagesLoadState: Array<any>
  golfScoreboardId: string
}

class Add extends React.Component<HomeScreenProps, HomeScreenState> {
  homeViewPager: any = null
  golfViewPager: any = null

  constructor(props) {
    super(props)
    this.state = { pagesLoadState: [], delayLoading: false, golfScoreboardId: '' }
  }

  componentWillReceiveProps(nextProps: HomeScreenProps) {
    if (this.props.navItemList !== nextProps.navItemList && nextProps.navItemList) {
      const pagesLoadState = []

      nextProps.navItemList.map((item, index) => {
        // if (item['name'] === 'NFL') {
        //   pagesLoadState[index] = [false, false, false, false, false]
        // } else if (item['name'] === 'NCAA BB') {
        //   pagesLoadState[index] = [false, false, false, false, false]
        // } else if (item['name'] === 'NBA') {
        //   pagesLoadState[index] = [false, false, false, false]
        // } else if (item['subMenu'].length > 0) {
        //   pagesLoadState[index] = []
        //   item['subMenu'].map((subitem, tindex) => {
        //     pagesLoadState[index].push(false)
        //   })
        // } else {
        pagesLoadState.push(false)
        //}
      })

      this.setState({ pagesLoadState })
    }

    if (this.props.status !== nextProps.status) {
      if (nextProps.status === 'done') {
        this.setState({ delayLoading: true })
        setTimeout(() => {
          this.setState({ delayLoading: false })
        }, 3000)
      }
    }

    if (this.props.page !== nextProps.page && nextProps.page) {
      this.onNavigateToPage(nextProps.page)
      this.props.navigateToPage('')
    }
  }

  componentDidMount() {
    this.props.getnavbarRequest()
  }

  onMainPageSelected = e => {
    const pagesLoadState = Array.from(this.state.pagesLoadState)

    if (Array.isArray(pagesLoadState[e.position])) {
      pagesLoadState[e.position][0] = true
    } else {
      pagesLoadState[e.position] = true
    }

    this.setState({ pagesLoadState })
  }

  // onSubPageSelected = mainNavIndex => e => {
  //   const pagesLoadState = Array.from(this.state.pagesLoadState)
  //   pagesLoadState[mainNavIndex][e.position] = true
  //   this.setState({ pagesLoadState })
  // }

  renderMainTitleIndicator = (type: string, titles?: any) => {
    let options = {}

    if (type === 'main') {
      const mainNavBar = []

      this.props.navItemList.map((item, index) => {
        mainNavBar.push(item['name'])
      })
      options = {
        style: screenStyles.mainIndicatorContainer,
        itemTextStyle: screenStyles.mainIndicatorText,
        itemStyle: screenStyles.mainIndicator,
        selectedItemStyle: screenStyles.mainIndicatorSelected,
        selectedItemTextStyle: screenStyles.mainIndicatorSelectedText,
        selectedBorderStyle: screenStyles.selectedBorderStyleForMain,
        titles: mainNavBar,
      }
    } else {
      options = {
        style: screenStyles.subIndicatorContainer,
        itemTextStyle: screenStyles.subIndicatorText,
        itemStyle: screenStyles.subIndicator,
        selectedItemStyle: screenStyles.subIndicatorSelected,
        selectedItemTextStyle: screenStyles.subIndicatorSelectedText,
        selectedBorderStyle: screenStyles.selectedBorderStyleForSub,
        titles: titles,
      }
    }

    return (
      <PagerTitleIndicator
        style={options['style']}
        trackScroll
        itemTextStyle={options['itemTextStyle']}
        itemStyle={options['itemStyle']}
        selectedItemStyle={options['selectedItemStyle']}
        selectedItemTextStyle={options['selectedItemTextStyle']}
        selectedBorderStyle={options['selectedBorderStyle']}
        titles={options['titles']}
      />
    )
  }

  // onNavigateGolfLeaderboard = (id: string) => {
  //   const pagerIndex = 1
  //   this.golfViewPager.setPage(pagerIndex)
  //   this.setState({ golfScoreboardId: id })
  // }

  onNavigateToPage = (pageName: string) => {
    let pageIndex = 0

    this.props.navItemList.map((item, index) => {
      if (item['name'] === pageName) {
        pageIndex = index
      }
    })
    this.homeViewPager.setPage(pageIndex)
  }

  render() {
    const { status, navItemList } = this.props
    const { pagesLoadState, delayLoading } = this.state

    return (
      <Animated.View style={screenStyles.ROOT}>
        <View>{Platform.OS === 'ios' && <View style={screenStyles.statusBar} />}</View>
        {status === 'done' && (
          <IndicatorViewPager
            ref={viewPager => {
              this.homeViewPager = viewPager
            }}
            style={screenStyles.indicatorViewPager}
            indicator={this.renderMainTitleIndicator('main')}
            onPageSelected={this.onMainPageSelected}
          >
            {navItemList.map((item, index) => {
              if (item['name'] === 'Latest') {
                return (
                  <View key={index}>
                    <Latest headlines={item['headline']} />
                  </View>
                )
              }
              // else if (item['name'] === 'NFL') {
              //   const subMenuNames = ['News', 'Schedule', 'Odds', 'Standings']

              //   return (
              //     <View key={index}>
              //       <IndicatorViewPager
              //         style={screenStyles.indicatorViewPager}
              //         indicator={this.renderMainTitleIndicator('sub', subMenuNames)}
              //         scrollEnabled={false}
              //         onPageSelected={this.onSubPageSelected(index)}
              //       >
              //         <View>
              //           <News
              //             name={item['name']}
              //             isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][0] : false}
              //             headlines={item['headline'] ? item['headline'] : ''}
              //             sectionID={item['id']}
              //           />
              //         </View>
              //         <View>
              //           <NFLSchedule isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][1] : false} />
              //         </View>
              //         <View>
              //           <NFLOdds isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][2] : false} />
              //         </View>
              //         <View>
              //           <NFLStandings isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][3] : false} />
              //         </View>
              //         {/* <View>
              //           <NFLStats isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][4] : false} />
              //         </View> */}
              //       </IndicatorViewPager>
              //     </View>
              //   )
              // } else if (item['name'] === 'MLB') {
              //   const subMenuNames = item['subMenu'].map(obj => obj.name)

              //   return (
              //     <View key={index}>
              //       <IndicatorViewPager
              //         style={screenStyles.indicatorViewPager}
              //         indicator={this.renderMainTitleIndicator('sub', subMenuNames)}
              //         scrollEnabled={false}
              //         onPageSelected={this.onSubPageSelected(index)}
              //       >
              //         {item['subMenu'].map((subitem, tindex) => (
              //           <View key={tindex}>
              //             {subitem.name === 'News' && (
              //               <News
              //                 name={item['name']}
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][0] : false}
              //                 headlines={item['headline']}
              //                 sectionID={item['id']}
              //               />
              //             )}
              //             {subitem.name === 'Scoreboard' && (
              //               <MLBScoreboard
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //             {subitem.name === 'Schedule' && (
              //               <MLBSchedule
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //             {subitem.name === 'Standings' && (
              //               <MLBStandings
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //             {subitem.name === 'Odds' && (
              //               <MLBOdds
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //           </View>
              //         ))}
              //       </IndicatorViewPager>
              //     </View>
              //   )
              // } else if (item['name'] === 'Golf') {
              //   const subMenuNames = item['subMenu'].map(obj => obj.name)

              //   return (
              //     <View key={index}>
              //       <IndicatorViewPager
              //         ref={viewPager => {
              //           this.golfViewPager = viewPager
              //         }}
              //         style={screenStyles.indicatorViewPager}
              //         indicator={this.renderMainTitleIndicator('sub', subMenuNames)}
              //         scrollEnabled={false}
              //         onPageSelected={this.onSubPageSelected(index)}
              //       >
              //         {item['subMenu'].map((subitem, tindex) => (
              //           <View key={tindex}>
              //             {subitem.name === 'News' && (
              //               <News
              //                 name={item['name']}
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //                 headlines={item['headline']}
              //                 sectionID={item['id']}
              //               />
              //             )}
              //             {subitem.name === 'Leaderboard' && (
              //               <GolfLeaderboard
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //                 receivedID={golfScoreboardId}
              //               />
              //             )}
              //             {subitem.name === 'Schedule' && (
              //               <GolfSchedule
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //                 onPress={this.onNavigateGolfLeaderboard}
              //               />
              //             )}
              //             {subitem.name === 'World Rankings' && (
              //               <GolfRankings
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //             {subitem.name === 'Odds' && (
              //               <GolfOdds
              //                 isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][tindex] : false}
              //               />
              //             )}
              //           </View>
              //         ))}
              //       </IndicatorViewPager>
              //     </View>
              //   )
              // } else if (item['name'] === 'NCAA BB') {
              //   const subMenuNames = ['News', 'Schedule', 'Standings', 'Rankings', 'Futures']

              //   return (
              //     <View key={index}>
              //       <IndicatorViewPager
              //         style={screenStyles.indicatorViewPager}
              //         indicator={this.renderMainTitleIndicator('sub', subMenuNames)}
              //         scrollEnabled={false}
              //         onPageSelected={this.onSubPageSelected(index)}
              //       >
              //         <View>
              //           <News
              //             name={item['name']}
              //             isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][0] : false}
              //             headlines={item['headline']}
              //             sectionID={item['id']}
              //           />
              //         </View>
              //         <View>
              //           <NCAASchedule isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][1] : false} />
              //         </View>
              //         <View>
              //           <NCAAStandings isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][2] : false} />
              //         </View>
              //         <View>
              //           <NCAARankings isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][3] : false} />
              //         </View>
              //         <View>
              //           <NCAAFutures isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][4] : false} />
              //         </View>
              //       </IndicatorViewPager>
              //     </View>
              //   )
              // } else if (item['name'] === 'NBA') {
              //   const subMenuNames = ['News', 'Scores', 'Schedule', 'Standings']

              //   return (
              //     <View key={index}>
              //       <IndicatorViewPager
              //         style={screenStyles.indicatorViewPager}
              //         indicator={this.renderMainTitleIndicator('sub', subMenuNames)}
              //         scrollEnabled={false}
              //         onPageSelected={this.onSubPageSelected(index)}
              //       >
              //         <View>
              //           <News
              //             name={item['name']}
              //             isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][0] : false}
              //             headlines={item['headline']}
              //             sectionID={item['id']}
              //           />
              //         </View>
              //         <View>
              //           <NBAScores isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][1] : false} />
              //         </View>
              //         <View>
              //           <NBASchedule isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][2] : false} />
              //         </View>
              //         <View>
              //           <NBAStandings isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index][3] : false} />
              //         </View>
              //       </IndicatorViewPager>
              //     </View>
              //   )
              // }
              else {
                return (
                  <View key={index}>
                    <News
                      name={item['name']}
                      isLoadingStart={pagesLoadState.length > 0 ? pagesLoadState[index] : false}
                      // headlines={item['headline'] ? item['headline'] : null}
                      sectionID={item['id']}
                    />
                  </View>
                )
              }
            })}
          </IndicatorViewPager>
        )}
        <LoadingView isVisible={!navItemList || status !== 'done' || delayLoading} />
      </Animated.View>
    )
  }
}

const mapStateToProps = state => ({
  status: state.app.status,
  page: state.app.page,
  navItemList: state.app.navItemList,
})

const mapDispatchToProps = dispatch => ({
  getnavbarRequest: () => dispatch(AppActions.getnavbarRequest()),
  navigateToPage: (page: string) => dispatch(AppActions.navigateToPage(page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Add))
