import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'

import * as styles from './popup.styles'
import { Modal } from '../modal'
import { FlexView } from '../flex-view'
import { Text } from '../text'
import { Icon } from '../icon'
import { Colors } from '../../../themes'

export interface PopupProps {}
export interface PopupState {
  text: string
  isVisible: boolean
}

export class Popup extends React.Component<PopupProps, PopupState> {
  state: PopupState = {
    text: '',
    isVisible: false,
  }

  open = (text: string) => {
    this.setState({ text, isVisible: true })
  }

  close = () => {
    this.setState({ isVisible: false })
  }

  render() {
    return (
      <Modal isVisible={this.state.isVisible}>
        <FlexView width="100%" flexDirection="row" alignItems="center" padding={20}>
          <Text size="regular" color="white" text={this.state.text} />

          <TouchableOpacity style={styles.closeBtn} onPress={this.close}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <Icon iconType="material" name="close" size={24} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
        </FlexView>
      </Modal>
    )
  }
}
