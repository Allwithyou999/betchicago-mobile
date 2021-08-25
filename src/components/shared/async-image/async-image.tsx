import * as React from 'react'
import { Image, View } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Colors } from '@theme'
import * as screenStyles from './async-image.styles'

interface AsyncImageProp {
  source?: string
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
  style?: object
}

interface AsyncImageState {
  isLoading: boolean
}

export class AsyncImage extends React.Component<AsyncImageProp, AsyncImageState> {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  render() {
    const { source, resizeMode, style } = this.props

    return (
      <View style={screenStyles.ROOT}>
        <Image
          style={style}
          source={{ uri: source }}
          resizeMode={resizeMode}
          onLoadStart={() => this.setState({ isLoading: true })}
          onLoadEnd={() => this.setState({ isLoading: false })}
        />
        {this.state.isLoading && (
          <View style={screenStyles.overlayView}>
            <Spinner size={50} color={Colors.active} type={'ThreeBounce'} />
          </View>
        )}
      </View>
    )
  }
}
