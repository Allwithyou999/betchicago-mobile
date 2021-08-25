import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '@theme'
import { SectionDivider, Article } from '@components'
import * as screenStyles from './team-news.styles'

export interface NFLTeamNewsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NFLTeamNewsScreenState {
  isRefreshing: boolean
}

class NFLTeamNews extends React.Component<NFLTeamNewsScreenProps, NFLTeamNewsScreenState> {
  constructor(props) {
    super(props)
    this.state = { isRefreshing: false }
  }

  _onPageRefresh = () => {
    this.setState({ isRefreshing: true })
    // Simulate fetching data from the server
    setTimeout(() => {
      this.setState({ isRefreshing: false })
    }, 5000)
  }

  render() {
    return (
      <ScrollView
        style={screenStyles.ROOT}
        scrollEventThrottle={2}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.props.scrollY } } }])}
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
          <Article
            imageLink="http://images.ctfassets.net/p0ykbbcw3bn6/158iSTKGiasYmGyas4QCKY/d3a55b5ed0cf2e97c5ebdbbab6eab12c/Dallas.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="MLB MVP odds: Javy Baez NL favorite but Yelich creeping closer"
            summary="Back on June 27, we looked at whether or not Javy Baez could put together an MVP-worthy season.  He was listed then at 80/1 odds to win the award. On Wednesday, Bovada posted him as the favorite, and his price shortened from there."
            date="2 hours ago"
          />
          <SectionDivider />
          <Article
            imageLink="http://images.ctfassets.net/p0ykbbcw3bn6/5oeuJGVuJG4MCuE80gsAU0/6288fac3ac6f59b914dcbebf9ea787ef/AP_17288135318451.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="College football Week 8 betting lines: Early bettors fading Washington"
            summary="Then-No. 7 Washington fell on Saturday in overtime and early bettors were quick to fade the Huskies laying double-digits to 5-1 Colorado in Week 8."
            date="8 hours ago"
          />
          <SectionDivider />
          <Article
            imageLink="http://images.ctfassets.net/p0ykbbcw3bn6/39iiP5M41GmQMQoiw2444O/b4872600ebe7072e0de91e7d8c1ff4f4/AP_960022999426.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="Super Bowl 53 odds update: Ravens, Steelers, Chargers move up betting board after Week 6 wins"
            summary="Three AFC contenders are among the biggest upward movers on the Super Bowl 53 oddsboard after Sunday's Week 6 action."
            date="13 hours ago"
          />
        </View>
      </ScrollView>
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
)(NFLTeamNews)
