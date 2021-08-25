import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as screenStyles from './leaderboard-title.styles'
import { Colors } from '@theme'
import { Icon } from '../../../components'

interface LeaderboardTitleProp {
  title?: string
  location?: string
  date?: string
  onPress?: () => void
}

export class LeaderboardTitle extends React.Component<LeaderboardTitleProp, {}> {
  render() {
    const { title, location, date, onPress } = this.props

    return (
      <View style={screenStyles.ROOT}>
        <View style={screenStyles.titleContainer}>
          <View style={screenStyles.leftSection}>
            <Text style={screenStyles.title}>{title}</Text>
            <Text style={screenStyles.location}>{location}</Text>
            <Text style={screenStyles.location}>{date}</Text>
          </View>
          <TouchableOpacity style={screenStyles.rightSection} onPress={onPress}>
            <Icon iconType="entypo" name="dots-three-horizontal" size={26} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
