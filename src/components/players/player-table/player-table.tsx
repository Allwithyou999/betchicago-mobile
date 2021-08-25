import * as React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as screenStyles from './player-table.styles'

interface PlayerTableProp {
  style?: object
  titles?: Array<any>
  list?: Array<any>
  headerBackground?: boolean
  tableSmall?: boolean
  onPress?: (val: string) => void
}

export class PlayerTable extends React.Component<PlayerTableProp, {}> {
  static defaultProps: PlayerTableProp = {
    onPress: (val: string) => {},
  }

  getCells(row, title) {
    if (typeof row[title.field] !== 'object') {
      return (
        <Text
          style={[
            screenStyles.cell,
            this.props.tableSmall && screenStyles.smallCell,
            (title.active || row[title.link]) && screenStyles.cellActive,
            title.withIcon && screenStyles.withIconCell,
            {
              fontWeight: title.weight,
              textAlign: title.align || 'left',
            },
            title.color && { color: title.color },
          ]}
        >
          {row[title.field]}
        </Text>
      )
    } else {
      return (
        <View
          style={[
            screenStyles.cellView,
            (title.active || row[title.link]) && screenStyles.cellViewActive,
            title.withIcon && screenStyles.withIconCellView,
          ]}
        >
          {row[title.field]}
        </View>
      )
    }
  }
  render() {
    const { style, titles, list, onPress, headerBackground } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View
          style={[
            screenStyles.tableRow,
            screenStyles.tableHeaderRow,
            headerBackground && screenStyles.tableColorHeaderRow,
          ]}
        >
          {titles.map((title, index) => (
            <View key={index} style={{ width: title.width }}>
              <Text style={{ ...screenStyles.headerCell, textAlign: title.align || 'left' }}>{title.text}</Text>
            </View>
          ))}
        </View>
        {list.map((row, index) => (
          <View style={[screenStyles.tableRow, index % 2 == 1 && screenStyles.tableRowOdd]} key={index}>
            {titles.map(
              (title, tindex) =>
                row[title.link] ? (
                  <TouchableOpacity
                    key={tindex}
                    style={{ width: title.width }}
                    onPress={() => onPress(row[title.link])}
                  >
                    {this.getCells(row, title)}
                  </TouchableOpacity>
                ) : (
                  <View key={tindex} style={{ width: title.width }}>
                    {this.getCells(row, title)}
                  </View>
                ),
            )}
          </View>
        ))}
      </View>
    )
  }
}
