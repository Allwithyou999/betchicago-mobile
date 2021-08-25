import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as screenStyles from './round-table.styles'

interface RoundTableProp {
  style?: object
  titles?: Array<any>
  list?: any
}

export class RoundTable extends React.Component<RoundTableProp, {}> {
  render() {
    const { style, titles, list } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.tabelHeaderRow}>
          {titles.map((title, index) => (
            <View
              style={[
                { width: title.width },
                title.align && { alignItems: title.align },
                index === titles.length - 1 && screenStyles.leftBorder,
              ]}
              key={index}
            >
              <Text style={[screenStyles.headerCellText, title.color && { color: title.color }]}>{title.text}</Text>
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
                  tindex === titles.length - 1 && screenStyles.leftBorder,
                  index === 0 && { paddingTop: 10 },
                  index === list.length - 1 && { paddingBottom: 10 },
                ]}
              >
                <Text
                  style={[
                    screenStyles.cellText,
                    title.font && { fontFamily: title.font },
                    title.color && { color: title.color },
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
