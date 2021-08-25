import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FormatDate } from '../../../services'
import * as screenStyles from './day-item.styles'

interface DayItemProp {
  active?: boolean
  date?: number
  onPress?: () => void
}

export class DayItem extends React.Component<DayItemProp, {}> {
  render() {
    const { date, active, onPress } = this.props
    const d = new Date(date)

    return (
      <View>
        {!active && (
          <TouchableOpacity style={[screenStyles.ROOT]} onPress={onPress}>
            <Text style={screenStyles.month}>{FormatDate(d, 'mm')}</Text>
            <Text style={screenStyles.day}>{FormatDate(d, 'dd')}</Text>
            <Text style={screenStyles.week}>{FormatDate(d, 'ww')}</Text>
          </TouchableOpacity>
        )}
        {active && (
          <TouchableOpacity style={[screenStyles.ROOT, screenStyles.active]} onPress={onPress}>
            <Text style={screenStyles.month}>{FormatDate(d, 'mm')}</Text>
            <Text style={screenStyles.day}>{FormatDate(d, 'dd')}</Text>
            <Text style={screenStyles.week}>{FormatDate(d, 'ww')}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
