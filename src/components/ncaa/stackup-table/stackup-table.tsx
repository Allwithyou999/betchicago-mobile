import * as React from 'react'
import { View, Text, Image } from 'react-native'
import * as screenStyles from './stackup-table.styles'

interface StackupTableProp {
  style?: object
  away?: any
  home?: any
}

export class StackupTable extends React.Component<StackupTableProp, {}> {
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
            <Text style={screenStyles.headerCellText}>Stack Up</Text>
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
            <Text style={screenStyles.headerCellText}>{away.record}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Record</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.record}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ats}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>ATS Record</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ats}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ou}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>O-U Record</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ou}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.har}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Home/Away Record</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.har}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.ppg}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Points Per Game</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.ppg}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(away.fgp)}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Field Goal %</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(home.fgp)}</Text>
          </View>
        </View>

        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(away.ofgp)}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>OPP Field Goal %</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(home.ofgp)}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(away.ftp)}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Free Throw %</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{this.percentformat(home.ftp)}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.pa}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Points Allowed</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.pa}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.rebound}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Rebounding</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.rebound}</Text>
          </View>
        </View>
        <View style={screenStyles.tableRow}>
          <View style={screenStyles.leftCell}>
            <Text style={screenStyles.headerCellText}>{away.turnovers}</Text>
          </View>
          <View style={screenStyles.centerCell}>
            <Text style={screenStyles.cellText}>Turnovers</Text>
          </View>
          <View style={screenStyles.rightCell}>
            <Text style={screenStyles.headerCellText}>{home.turnovers}</Text>
          </View>
        </View>
      </View>
    )
  }
}
