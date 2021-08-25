import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager'
import { SliderItem } from '../../../components'
import * as screenStyles from './news-slider.styles'

interface NewsSliderProp {
  list?: Array<any>
  type?: 'EP' | 'UC'
  onPress?: (article) => () => void
}

export class NewsSlider extends React.Component<NewsSliderProp, {}> {
  static defaultProps: NewsSliderProp = {
    onPress: article => () => {},
  }

  _renderIndicator() {
    return (
      <PagerDotIndicator
        style={screenStyles.sliderPager}
        pageCount={this.props.list.length}
        dotStyle={screenStyles.dotStyle}
        selectedDotStyle={screenStyles.selectedDotStyle}
      />
    )
  }

  render() {
    const { list, type, onPress } = this.props

    return (
      <View style={[screenStyles.ROOT, type === 'UC' ? screenStyles.ucHeight : screenStyles.epHeight]}>
        {type === 'UC' ? (
          <Text style={screenStyles.sliderTitleUC}>PLAY FREE! Upcoming Contests</Text>
        ) : (
          <Text style={screenStyles.sliderTitleEP}>Editor's Picks</Text>
        )}
        <IndicatorViewPager
          style={screenStyles.sliders}
          indicator={this._renderIndicator()}
          autoPlayEnable
          autoPlayInterval={5000}
        >
          {list.map((item, index) => (
            <View key={index}>
              <TouchableOpacity onPress={onPress(item)}>
                <SliderItem type={type} imageLink={item.image} headline={item.headline} />
              </TouchableOpacity>
            </View>
          ))}
        </IndicatorViewPager>
      </View>
    )
  }
}
