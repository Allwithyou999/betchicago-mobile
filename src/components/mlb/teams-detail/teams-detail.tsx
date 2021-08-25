import * as React from 'react'
import { View, Text, Image } from 'react-native'
import * as screenStyles from './teams-detail.styles'

interface TeamsDetailProp {
  style?: object
  teamInfo?: object
  awayColor: string
  homeColor: string
}

export class TeamsDetail extends React.Component<TeamsDetailProp, {}> {
  render() {
    const { style, awayColor, homeColor, teamInfo } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.leftItem}>
          <Text style={[screenStyles.subject, { backgroundColor: awayColor }]}>Pitching</Text>
          <Text style={screenStyles.name}>
            R. Procello <Text style={screenStyles.score}> (1-0)</Text>
          </Text>
          <Text style={screenStyles.status}>5 IP, 1 ER, 1 K</Text>
        </View>
        <View style={screenStyles.rightItem}>
          <Text style={[screenStyles.subject, { backgroundColor: homeColor }]}>Batting</Text>
          <Text style={screenStyles.name}>
            C. Sabathia <Text style={screenStyles.score}> (0-1)</Text>
          </Text>
          <Text style={screenStyles.status}>3 IP, 3 ER, 1 K</Text>
        </View>
      </View>
    )
  }
}
