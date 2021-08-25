import * as React from 'react'
import { View, Animated, TouchableOpacity, Text, findNodeHandle } from 'react-native'
import moment from 'moment-timezone'
import { FormatDate, FormatAMPM } from '../../../services'
import { Colors, Metrics } from '../../../themes'
import * as screenStyles from './swipe-menu.styles'

interface SwipeMenuProp {
  style?: object
  titles?: Array<string>
  active?: string
  type?: 'date' | 'none'
  background?: string
  onChanged?: (index) => void
  onScrollMenu?: (event) => void
}

interface SwipeMenuState {
  activeNumber?: string
}

export class SwipeMenu extends React.Component<SwipeMenuProp, SwipeMenuState> {
  scrollViewRef = null
  itemRef = []

  constructor(props) {
    super(props)
    let activeNumber = this.props.active ? this.props.active : ''
    this.state = { activeNumber: activeNumber }
  }

  componentDidMount() {
    setTimeout(() => {
      let index = this.props.titles.indexOf(this.state.activeNumber)
      this.onMoveActiveToCenter(index)
    }, 500)
  }

  onPress = (date, index) => {
    this.setState({ activeNumber: date })
    this.props.onChanged && this.props.onChanged(date)
    this.onMoveActiveToCenter(index)
  }

  onMoveActiveToCenter = index => {
    if (!this.itemRef[index]) return

    let diffX = 0
    this.itemRef[index].measureLayout(
      findNodeHandle(this.scrollViewRef),
      (x: number, y: number, width: number, height: number) => {
        if (index < this.props.titles.length - 2) {
          diffX = x - Metrics.screenWidth / 2 + width / 2
          this.scrollViewRef.getNode().scrollTo({ x: diffX, animated: true })
        }
      },
      (error: any) => {
        console.log('Swipe menu scroll error:', error)
      },
    )

    // this.itemRef[index].measure((fx, fy, width, height, px, py) => {
    //   if (index < this.props.titles.length - 2) {
    //     diffX = fx - Metrics.screenWidth / 2 + width / 2
    //     this.scrollViewRef.getNode().scrollTo({ x: diffX, animated: true })
    //   }
    // })
  }

  render() {
    const { style, titles, type, background, onScrollMenu } = this.props
    const { activeNumber } = this.state

    return (
      <View style={[screenStyles.ROOT, style, background && { backgroundColor: background }]}>
        <Animated.ScrollView
          ref={ref => (this.scrollViewRef = ref)}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollMenu}
          scrollEventThrottle={16}
        >
          {titles.map((item, index) => (
            <TouchableOpacity
              key={index}
              ref={ref => (this.itemRef[index] = ref)}
              style={screenStyles.menuItem}
              onPress={() => this.onPress(item, index)}
            >
              {type === 'date' && (
                <React.Fragment>
                  <View>
                    <Text style={[screenStyles.menuItemText1, item === activeNumber && screenStyles.active]}>
                      {/* {item} - {FormatDate(new Date(item), 'mm dd')} */}
                      {moment(item)
                        .tz('America/Chicago')
                        .format('MMM DD')}
                    </Text>
                  </View>
                  <View>
                    <Text style={[screenStyles.menuItemText2, item === activeNumber && screenStyles.active2]}>
                      {moment(item)
                        .tz('America/Chicago')
                        .format('ddd')}
                    </Text>
                  </View>
                </React.Fragment>
              )}
              {!type && (
                <Text style={[screenStyles.menuItemText, item === activeNumber && screenStyles.active]}>{item}</Text>
              )}
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    )
  }
}
