import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AsyncImage } from '../../../components'
import * as screenStyles from './slider-item.styles'

interface SliderItemProp {
  imageLink?: string
  headline?: string
  type?: 'EP' | 'UC'
}

export class SliderItem extends React.Component<SliderItemProp, {}> {
  render() {
    const { imageLink, headline, type } = this.props

    return (
      <View style={screenStyles.sliderItem}>
        <AsyncImage
          resizeMode="cover"
          style={type === 'UC' ? screenStyles.sliderUCImg : screenStyles.sliderEPImg}
          source={imageLink}
        />
        <Text style={screenStyles.sliderComment} numberOfLines={3} ellipsizeMode="tail">
          {headline}
        </Text>
      </View>
    )
  }
}
