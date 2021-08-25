import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '@theme'
import { AsyncImage } from '../../../components'
import * as screenStyles from './article-brief.styles'

interface ArticleBriefProp {
  style?: object
  imageLink?: string
  headline?: string
  fullname?: string
  date?: string
  twitter?: string
  tagsColor?: string
  onPress?: () => void
}

export class ArticleBrief extends React.Component<ArticleBriefProp, {}> {
  render() {
    const { style, imageLink, headline, fullname, date, twitter, tagsColor, onPress } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {imageLink && (
          <View>
            <AsyncImage resizeMode="cover" style={screenStyles.articleImg} source={imageLink} />
          </View>
        )}
        <View style={screenStyles.articleRight}>
          <TouchableOpacity onPress={onPress}>
            <Text style={screenStyles.articleTitle}>{headline}</Text>
          </TouchableOpacity>
          <Text style={{ ...screenStyles.articleTags, color: tagsColor ? tagsColor : Colors.blue }}>
            <Text style={screenStyles.capitalFont}>{date} </Text>
            <Text>{fullname}</Text>
            {twitter && <Text style={screenStyles.seperateSymbol}> | </Text>}
            <Text>{twitter}</Text>
          </Text>
        </View>
      </View>
    )
  }
}
