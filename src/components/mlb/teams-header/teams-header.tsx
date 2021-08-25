import * as React from 'react'
import { View, Text, Image } from 'react-native'
import * as screenStyles from './teams-header.styles'

interface TeamsHeaderProp {
  style?: object
  teamInfo?: object
}

export class TeamsHeader extends React.Component<TeamsHeaderProp, {}> {
  render() {
    const { style, teamInfo } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {teamInfo && (
          <View style={screenStyles.teamBack}>
            {teamInfo['away_color'] && (
              <View style={[screenStyles.awayBack, { backgroundColor: teamInfo['away_color'] }]}>
                <Image resizeMode="cover" style={screenStyles.awayBackImg} source={{ uri: teamInfo['away_bg'] }} />
              </View>
            )}
            {teamInfo['home_color'] && (
              <View style={[screenStyles.homeBack, { backgroundColor: teamInfo['home_color'] }]}>
                <Image resizeMode="cover" style={screenStyles.homeBackImg} source={{ uri: teamInfo['home_bg'] }} />
              </View>
            )}
          </View>
        )}
        <Text style={screenStyles.mark}>AT</Text>
      </View>
    )
  }
}
