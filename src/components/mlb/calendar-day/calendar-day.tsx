import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon, DayItem } from '../../../components'
import { Colors } from '@theme'
import * as screenStyles from './calendar-day.styles'

interface CalendarDayProp {
  style?: object
  onChangeDate?: () => void
}

interface CalendarDayState {
  offset: number
  current: number
}

export class CalendarDay extends React.Component<CalendarDayProp, CalendarDayState> {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      current: 2,
    }
  }

  changeOffset = i => {
    this.setState({
      offset: this.state.offset + i,
      current: this.state.current - i,
    })
  }

  changeCurrent = current => {
    this.setState({ current })
  }

  generateDates = () => {
    const { offset, current } = this.state

    const dates = []
    for (let i = 0; i < 5; i++) {
      dates.push(
        <DayItem
          key={i}
          date={new Date().setDate(new Date().getDate() + i - 2 + offset)}
          onPress={() => this.changeCurrent(i)}
          active={current === i}
        />,
      )
    }
    return dates
  }

  render() {
    const { style } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <TouchableOpacity style={screenStyles.leftArrow} onPress={() => this.changeOffset(-1)}>
          <Icon iconType="font" name="chevron-left" size={13} color={Colors.white} />
        </TouchableOpacity>
        <View style={screenStyles.calendar}>{this.generateDates()}</View>
        <TouchableOpacity style={screenStyles.rightArrow} onPress={() => this.changeOffset(1)}>
          <Icon iconType="font" name="chevron-right" size={13} color={Colors.white} />
        </TouchableOpacity>
      </View>
    )
  }
}
