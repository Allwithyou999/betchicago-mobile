import * as React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Colors } from '@theme'
import * as screenStyles from './loading-view.styles'

interface LoadingViewProp {
  style?: object
  isVisible?: boolean
}

export class LoadingView extends React.Component<LoadingViewProp, {}> {
  render() {
    const { style, isVisible } = this.props

    return (
      <View style={isVisible && [screenStyles.ROOT, style]}>
        {isVisible && (
          <View style={screenStyles.overlay}>
            <Spinner size={100} color={Colors.active} type={'ThreeBounce'} isVisible={this.props.isVisible} />
          </View>
        )}
      </View>
    )
  }
}
