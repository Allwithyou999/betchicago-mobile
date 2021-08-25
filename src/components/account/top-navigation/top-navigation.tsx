import * as React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import * as screenStyles from './top-navigation.styles'
import { Icon } from '../..'

interface TopNavigationProp {
  style?: object
  title?: string
  onPress?: () => void
}

export class TopNavigation extends React.Component<TopNavigationProp, {}> {
  render() {
    const { style, title, onPress } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <TouchableOpacity style={screenStyles.leftButton} onPress={onPress}>
          <Icon iconType="feather" name="chevron-left" size={35} color={'#0064C7'} />
        </TouchableOpacity>
        <Text style={screenStyles.title}>{title}</Text>
      </View>
    )
  }
}
