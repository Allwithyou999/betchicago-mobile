import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as screenStyles from './full-odds-table.styles'

interface FullOddsTableProp {
  style?: object
  color?: string
  subject?: string
  titles?: Array<any>
  list?: any
}

export class FullOddsTable extends React.Component<FullOddsTableProp, {}> {
  render() {
    const { style, color, subject, titles, list } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={{ backgroundColor: color }}>
          <Text style={screenStyles.subject}>{subject}</Text>
        </View>
        <View style={[screenStyles.tableRow, screenStyles.tableHeaderRow]}>
          {titles.map((title, index) => (
            <View key={index} style={{ width: title.width }}>
              <Text style={[screenStyles.headerCell, { textAlign: title.align ? title.align : 'center' }]}>
                {title.text}
              </Text>
            </View>
          ))}
        </View>
        {list.map((row, index) => (
          <View style={screenStyles.tableRow} key={index}>
            {titles.map((title, tindex) => (
              <View key={tindex} style={{ width: title.width }}>
                <Text
                  style={[
                    screenStyles.cell,
                    {
                      fontWeight: title.fontWeight ? title.fontWeight : 'normal',
                      textAlign: title.align ? title.align : 'center',
                    },
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
