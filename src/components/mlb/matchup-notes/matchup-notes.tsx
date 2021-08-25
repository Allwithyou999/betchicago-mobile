import * as React from 'react'
import { View, Text, Image } from 'react-native'
import * as screenStyles from './matchup-notes.styles'

interface MatchupNotesProp {
  style?: object
  type?: 'inprogress' | 'closed' | 'scheduled'
}

export class MatchupNotes extends React.Component<MatchupNotesProp, {}> {
  render() {
    const { style, type } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {type === 'scheduled' ? (
          <View>
            <View style={screenStyles.injuriesLabel}>
              <Text style={screenStyles.injuriesLabelText}>INJURIES</Text>
            </View>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>Day-to-Day: </Text>
              Marcus Betts RF
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>10-Day DL: </Text>
              Tyler Thomburg RHP, Austin Maddox RHP, Carson Smith RHP
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>15-Day DL: </Text>
              Bob Scheiffer CF
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>60-Day DL: </Text>
              Longoria SS
            </Text>
          </View>
        ) : (
          <View>
            <View style={screenStyles.injuriesLabel}>
              <Text style={screenStyles.injuriesLabelText}>NOTES</Text>
            </View>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>2B: </Text>
              Longoria 2 (16)
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>3B: </Text>
              Hermandez (2)
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>HR: </Text>
              Hermandez (6)
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>TB: </Text>
              Longoria 5; Hernandez 5; Tomlinson 2; Sandoval; McCutchen; Posey; Belt
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>RBI: </Text>
              Longoria 3 (27); Sandoval (14); Hernandez (9)
            </Text>
            <Text style={screenStyles.injuriesText}>
              <Text style={screenStyles.bold}>SB: </Text>
              Tomlinson (3)
            </Text>
          </View>
        )}
      </View>
    )
  }
}
