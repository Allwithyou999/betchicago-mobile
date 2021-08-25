import * as React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import * as screenStyles from './account-header.styles'
import { Icon } from '../..'

interface AccountHeaderProp {
  style?: object
  label?: string
  onLeftPress?: () => void
  onRightPress?: () => void
}

export class AccountHeader extends React.Component<AccountHeaderProp, {}> {
  render() {
    const { style, label, onLeftPress, onRightPress } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <TouchableOpacity style={screenStyles.leftButton} onPress={onLeftPress}>
          <Icon iconType="material" name="close" size={25} color={'#111111'} />
        </TouchableOpacity>
        <TouchableOpacity style={screenStyles.rightButton} onPress={onRightPress}>
          <Text style={screenStyles.buttonText}>{label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
