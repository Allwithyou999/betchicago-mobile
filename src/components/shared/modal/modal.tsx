import * as React from 'react'
import { Animated, Dimensions, ViewStyle } from 'react-native'

import * as styles from './modal.styles'
import { isIphoneX } from '../../../services/is-iphone-x'

export interface ModalProps {
  type?: string
  isVisible: boolean
  style?: ViewStyle
  children: React.ReactNode

  onShow?: () => void
  onHide?: () => void
}
export interface ModalState {
  isVisible: boolean
  deviceWidth: number
  deviceHeight: number
  offsetY: Animated.Value
}

export class Modal extends React.PureComponent<ModalProps, ModalState> {
  static defaultProps = {
    isVisible: false,
    type: 'bottom',

    onShow: () => {},
    onHide: () => {},
  }

  transitionLock = null
  isIPhoneX = isIphoneX()

  constructor(props: ModalProps) {
    super(props)

    const window = Dimensions.get('window')

    // We use an internal state for keeping track of the Modal visibility: this allows us to keep
    // the Modal visibile during the exit animation, even if the user has already change the
    // isVisible prop to false.
    // We store in the state the device width and height so that we can update the Modal on
    // device rotation.
    this.state = {
      isVisible: this.props.isVisible,
      deviceWidth: window.width,
      deviceHeight: window.height,
      offsetY: new Animated.Value(-window.height),
    }
  }

  static getDerivedStateFromProps(props: ModalProps, state: ModalState) {
    if (props.isVisible !== state.isVisible) {
      return { isVisible: props.isVisible }
    }
    return null
  }

  componentDidMount() {
    if (this.state.isVisible) {
      this.open()
    }
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    // On Modal open request, we slide the view up
    if (this.props.isVisible && !prevProps.isVisible) {
      this.open()
    } else if (!this.props.isVisible && prevProps.isVisible) {
      // On Modal close request, we slide the view down
      this._close()
    }
  }

  open = () => {
    if (this.transitionLock) return
    this.transitionLock = true

    // This is for reset the pan position, if not Modal get stuck
    // at the last release position when you try to open it.
    // Could certainly be improve - no idea for the moment.
    Animated.timing(this.state.offsetY, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      this.transitionLock = false
      this.props.onShow()
    })
  }

  _close = () => {
    if (this.transitionLock) return
    this.transitionLock = true

    Animated.timing(this.state.offsetY, {
      toValue: -this.state.deviceHeight,
      duration: 500,
    }).start(() => {
      this.transitionLock = false
      if (this.props.isVisible) {
        this.open()
      } else {
        this.setState({
          isVisible: false,
        })
        this.props.onHide()
      }
    })
  }

  render() {
    const { children, style, type } = this.props
    const { offsetY } = this.state

    const computedStyle =
      type === 'bottom'
        ? {
            ...styles.bottomContent,
            ...style,
            bottom: offsetY,
            paddingBottom: this.isIPhoneX ? 34 : 0,
          }
        : {
            ...styles.topContent,
            ...style,
            top: offsetY,
            paddingTop: this.isIPhoneX ? 44 : 0,
          }

    return <Animated.View style={computedStyle}>{children}</Animated.View>
  }
}

export default Modal
