import * as React from 'react'
import { Image, View } from 'react-native'
import { Icon } from '../../../components'
import { Colors } from '../../../themes'
import * as screenStyles from './auther-image.styles'

interface AuthorImageProp {
  source?: string
  style?: object
}

export class AuthorImage extends React.Component<AuthorImageProp, {}> {
  render() {
    const { source, style } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {!source || source === '' ? (
          <Icon iconType="fontAwesome5" name="user" size={26} color={Colors.white} />
        ) : (
          <Image style={screenStyles.image} source={{ uri: source }} resizeMode="cover" />
        )}
      </View>
    )
  }
}
