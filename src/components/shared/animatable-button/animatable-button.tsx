import * as React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'

interface AnimatableButtonProp {
  style?: object
  rendItem?: object
  type?: 'rubberBand' | 'swing' | 'shake' | 'tada' | 'wobble'
  onPress?: () => void
}

export class AnimatableButton extends React.Component<AnimatableButtonProp, {}> {
  buttonRef = null
  duration = 800
  buttonHandleRef = ref => {
    this.buttonRef = ref
  }

  onPress = () => {
    if (this.props.type === 'rubberBand') {
      this.buttonRef.rubberBand(this.duration)
    } else if (this.props.type === 'swing') {
      this.buttonRef.swing(this.duration)
    } else if (this.props.type === 'shake') {
      this.buttonRef.shake(this.duration)
    } else if (this.props.type === 'tada') {
      this.buttonRef.tada(this.duration)
    } else if (this.props.type === 'wobble') {
      this.buttonRef.wobble(this.duration)
    } else {
      this.buttonRef.bounce(this.duration)
    }

    this.props.onPress && this.props.onPress()
  }

  render() {
    const { style, rendItem } = this.props

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <Animatable.View style={style} easing="ease-out" iterationCount={1} ref={this.buttonHandleRef}>
          {rendItem}
        </Animatable.View>
      </TouchableWithoutFeedback>
    )
  }
}
