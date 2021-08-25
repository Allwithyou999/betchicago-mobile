import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as screenStyles from './record-table.styles'

interface RecordTableProp {
  style?: object
  color?: string
  subject?: string
  titles?: Array<any>
  list?: any
}

export class RecordTable extends React.Component<RecordTableProp, {}> {
  render() {
    const { style, color, subject, titles, list } = this.props

    return list ? (
      <View style={[screenStyles.ROOT, style]}>
        <View style={{ backgroundColor: color }}>
          <Text style={screenStyles.subject}>{subject}</Text>
        </View>
        <View style={[screenStyles.tableRow, screenStyles.tableHeaderRow]}>
          {titles.map((title, index) => (
            <View key={index} style={{ width: title.width }}>
              <Text style={[screenStyles.headerCell, { textAlign: title.align || 'left' }]}>{title.text}</Text>
            </View>
          ))}
        </View>
        <View style={screenStyles.tableRow}>
          {titles.map((title, index) => (
            <View key={index} style={{ width: title.width }}>
              <Text
                style={[
                  screenStyles.cell,
                  { fontWeight: title.fontWeight ? title.fontWeight : 'normal', textAlign: title.align || 'left' },
                ]}
              >
                {list[title.field]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    ) : (
      <React.Fragment />
    )
  }
}
