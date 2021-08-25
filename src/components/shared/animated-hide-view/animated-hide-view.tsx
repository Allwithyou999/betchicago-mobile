import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import * as screenStyles from './animated-hide-view.styles'

interface AnimatedHideViewProp {
  style?: object
  visible?: boolean
  children?: React.ReactNode
}

interface AnimatedHideViewState {
  isShow?: boolean
}

export class AnimatedHideView extends React.Component<AnimatedHideViewProp, AnimatedHideViewState> {
  viewRef = null
  duration = 1000
  viewHandleRef = ref => {
    this.viewRef = ref
  }

  constructor(props) {
    super(props)
    this.state = { isShow: this.props.visible }
  }

  componentWillUpdate(nextProps) {
    this.animate()
  }

  animate = () => {
    const { visible } = this.props
    if (!visible) {
      this.viewRef.lightSpeedIn(this.duration)
    }
  }

  render() {
    const { isShow } = this.state
    const { style, visible, children } = this.props

    return (
      <Animatable.View
        style={[style, { display: visible ? 'flex' : 'none' }]}
        easing="ease-out"
        ref={this.viewHandleRef}
        onAnimationEnd={() => {
          this.setState({ isShow: visible })
        }}
      >
        {children}
      </Animatable.View>
    )
  }
}
