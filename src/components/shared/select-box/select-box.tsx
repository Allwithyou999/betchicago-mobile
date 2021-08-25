import * as React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from '../../../components'
import { Colors } from '@theme'
import * as screenStyles from './select-box.styles'

interface SelectBoxProp {
  title?: string
  style?: object
  onPress?: () => void
}

export class SelectBox extends React.Component<SelectBoxProp, {}> {
  render() {
    const { title, style, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <View style={screenStyles.boxContainer}>
          <Text style={screenStyles.boxText}>{title}</Text>
          <Icon
            style={screenStyles.downArrow}
            iconType="ionic"
            name="ios-arrow-down"
            size={12}
            color={Colors.selectBoxTextColor}
          />
        </View>
      </TouchableOpacity>
    )
  }
}
