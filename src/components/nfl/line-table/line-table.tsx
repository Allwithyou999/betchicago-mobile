import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { TeamName } from '../../../components'
import * as screenStyles from './line-table.styles'

interface LineTableProp {
  style?: object
  titles?: Array<any>
  list?: Array<any>
  type?: 'optimize' | 'extend'
  numberOfLines?: number
}

export class LineTable extends React.Component<LineTableProp, {}> {
  render() {
    const { style, list, titles, type, numberOfLines } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.tabelHeaderRow}>
          {titles.map((title, index) => (
            <View style={[{ width: title.width }, title.align && { alignItems: title.align }]} key={index}>
              <Text style={screenStyles.headerCellText}>{title.text}</Text>
            </View>
          ))}
        </View>
        {list.map((row, index) => (
          <View style={screenStyles.tableRow} key={index}>
            {titles.map((title, tindex) => (
              <View
                key={tindex}
                style={[
                  screenStyles.cell,
                  { width: title.width },
                  title.align && { alignItems: title.align },
                  title.padding && { paddingVertical: title.padding },
                  type === 'extend' && { padding: 4 },
                ]}
              >
                <Text
                  style={[
                    screenStyles.cellText,
                    title.font && { fontFamily: title.font },
                    title.color && { color: title.color },
                    title.bold && { fontWeight: 'bold' },
                    type === 'extend' && { fontSize: 14 },
                  ]}
                  numberOfLines={numberOfLines ? numberOfLines : 0}
                  ellipsizeMode="tail"
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
