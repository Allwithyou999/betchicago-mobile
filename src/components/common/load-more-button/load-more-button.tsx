import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Colors } from '@theme'
import * as screenStyles from './load-more-button.styles'

interface LoadMoreButtonProp {
  style?: object
  isLoading?: boolean
  onPress?: () => void
}

export class LoadMoreButton extends React.Component<LoadMoreButtonProp, {}> {
  render() {
    const { style, isLoading, onPress } = this.props

    return (
      <View>
        {isLoading ? (
          <View style={style}>
            <Spinner size={40} color={Colors.active} type={'Circle'} isVisible={isLoading} />
          </View>
        ) : (
          <TouchableOpacity style={[screenStyles.ROOT, style]} onPress={onPress}>
            <Text style={screenStyles.buttonName}>Load more</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
