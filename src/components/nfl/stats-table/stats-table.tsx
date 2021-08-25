import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { TeamName } from '../../../components'
import * as screenStyles from './stats-table.styles'

interface StatsTableProp {
  style?: object
  titles?: Array<any>
  list?: Array<any>
  isShowHeader?: boolean
}

export class StatsTable extends React.Component<StatsTableProp, {}> {
  render() {
    const { style, list, titles, isShowHeader } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {isShowHeader && (
          <View style={screenStyles.tabelHeaderRow}>
            {titles.map((title, index) => (
              <View style={[{ width: title.width }, title.align && { alignItems: title.align }]} key={index}>
                <Text style={[screenStyles.headerCellText, title.color && { color: title.color }]}>{title.text}</Text>
              </View>
            ))}
          </View>
        )}
        {list.map((row, index) => (
          <View style={screenStyles.tableRow} key={index}>
            {titles.map((title, tindex) => (
              <View
                key={tindex}
                style={[screenStyles.cell, { width: title.width }, title.align && { alignItems: title.align }]}
              >
                <Text
                  style={[
                    screenStyles.cellText,
                    row['bold'] && screenStyles.cellBoldText,
                    !row['bold'] && title.font && { fontFamily: title.font },
                    !row['bold'] && title.color && { color: title.color },
                  ]}
                >
                  {row[title.field]}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}
