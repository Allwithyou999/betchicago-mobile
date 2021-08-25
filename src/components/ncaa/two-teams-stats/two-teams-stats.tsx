import * as React from 'react'
import { View, Text, Image } from 'react-native'
import * as screenStyles from './two-teams-stats.styles'

interface TwoTeamsStatsProp {
  style?: object
  away?: any
  home?: any
}

export class TwoTeamsStats extends React.Component<TwoTeamsStatsProp, {}> {
  percentformat = number => {
    return (number * 100).toFixed(1)
  }

  render() {
    const { style, away, home } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.tabelHeaderRow}>
          <View style={screenStyles.leftCell}>
            <Image
              source={{
                uri: away.icon,
              }}
              style={screenStyles.logoIcon}
            />
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.headerCellText}>Team Stats</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Image
              source={{
                uri: home.icon,
              }}
              style={screenStyles.logoIcon}
            />
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.fg}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Field Goals</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.fg}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.tp}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>3 Pointers</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.tp}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ft}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Free Throws</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ft}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ass}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Assists</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ass}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.reb}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Rebounds</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.reb}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.or}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Off. Rebounds</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.or}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.blo}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Blocks</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.blo}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ste}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Steals</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ste}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.tur}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Turnovers</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.tur}</Text>
          </View>
        </View>
      </View>
    )
  }
}
