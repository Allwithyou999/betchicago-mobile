import * as React from 'react'
import { View, ScrollView, RefreshControl, Text, Animated } from 'react-native'
import { NavigationScreenProps, AnimatedValue } from 'react-navigation'
import { connect } from 'react-redux'
import { Colors } from '../../../../../themes'
import { SectionDivider, GameCard, Article } from '../../../../../components'
import { FormatDate } from '../../../../../services'
import { NFL_SCHEDULE_TITLE } from '.././../../../../config/constants/nfl'
import * as screenStyles from './team-news.styles'

export interface NCAATeamNewsScreenProps extends NavigationScreenProps<{}> {
  status: boolean
  scrollY?: AnimatedValue
  dispatch?: () => void
}

export interface NCAATeamNewsScreenState {
  isRefreshing: boolean
}

class NCAATeamNews extends React.Component<NCAATeamNewsScreenProps, NCAATeamNewsScreenState> {
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
    const date = new Date()
    const scheduleList = [
      {
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2FDuke-Blue-Devils.png?alt=media',
        name: 'Duke',
        ou: 'O/U: 48',
        time: '7:20pm',
      },
      {
        logo:
          'https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2FMichigan-Wolverines.png?alt=media',
        name: 'Michigan',
        ou: '-4',
        time: '7:21pm',
      },
    ]

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
          <View style={screenStyles.section}>
            <Text style={screenStyles.sectionTitle}>Next Game - {FormatDate(date, 'WW, MMM dd')}</Text>
            <GameCard
              style={screenStyles.gameCard}
              titles={NFL_SCHEDULE_TITLE}
              list={scheduleList}
              type="extend"
              iconSize={{ width: 28, height: 28 }}
            />
          </View>
          <SectionDivider />
          <Article
            articleId={'123456'}
            imageLink="https://images.ctfassets.net/p0ykbbcw3bn6/5uByUj5Vr5WPvupdRWDiQB/8b0d917695f368c193d684a1d96dc74f/AP_19004052798759.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="Northwestern at Michigan betting"
            summary="The Michigan Wolverines have narrowly covered the spread in each of their last three conference games against middling and bottom-feeding Big Ten teams like lowa, Indiana and Illinois. Now, they're 12.5-point favorites against Northwestern at home on"
            date="3 hours ago"
          />
          <SectionDivider />
          <Article
            articleId={'123456'}
            imageLink="https://images.ctfassets.net/p0ykbbcw3bn6/3ICjHk357vo2HECL2ju0aD/fd4acfc79f28a4daf4895216a33fae2e/AP_19040706467806.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="Saturday college basketball betting recap: Michigan gets revenge on Wisconsin to highlight loaded slate"
            summary="A loaded slate of college basketball -- with 21 of the top 25 teams in actions -- means plenty to highlight. Here is a betting recap from across the country on Saturday."
            date="8 hours ago"
          />
          <SectionDivider />
          <Article
            articleId={'123456'}
            imageLink="https://images.ctfassets.net/p0ykbbcw3bn6/7z6rVesugAApUA3aYe1TMO/b0116b43d0f39036a7a51dc6ed3e4b76/AP_19019699199982.jpg?h=300&w=400&fm=jpg&fit=fill"
            headline="Big Ten betting odds, lines, predictions: Michigan favored in revenge spot vs. Wisconsin"
            summary="The Badgers have won six consecutive games straight up and against the spread, including that 64-54 win over Michigan, while the Wolverines have dropped three of their past six ATS with two outright losses."
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
)(NCAATeamNews)
