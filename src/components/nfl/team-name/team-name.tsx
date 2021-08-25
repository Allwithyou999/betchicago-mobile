import * as React from 'react'
import { View, Image, Text } from 'react-native'
import Spinner from 'react-native-spinkit'
import { Colors } from '../../../themes'
import * as screenStyles from './team-name.styles'

interface TeamNameProp {
  style?: object
  uri?: string
  name?: string
  ranking?: string
  iconSize?: object
}

export class TeamName extends React.Component<TeamNameProp, {}> {
  render() {
    const { style, uri, name, iconSize, ranking } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <Image
          source={{ uri: uri }}
          style={[
            screenStyles.teamIcon,
            iconSize &&
              iconSize['width'] && {
                width: iconSize['width'],
              },
            iconSize &&
              iconSize['height'] && {
                height: iconSize['height'],
              },
          ]}
        />
        <View style={screenStyles.teamNameWrapper}>
          {!!ranking && <Text style={screenStyles.teamRankings}>{ranking}</Text>}
          <Text style={screenStyles.teamName}>{name}</Text>
        </View>
      </View>
    )
  }
}
