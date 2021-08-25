import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as screenStyles from './total-line-table.styles'

interface TotalLineTableProp {
  style?: object
  color?: string
  showBottomLine?: boolean
  showTotalValue?: boolean
  titles?: Array<any>
  list?: any
}

export class TotalLineTable extends React.Component<TotalLineTableProp, {}> {
  getCells(row, title) {
    if (typeof row[title.field] !== 'object') {
      return (
        <Text
          style={[
            screenStyles.cell,
            {
              fontWeight: title.weight,
              textAlign: title.align || 'left',
            },
          ]}
        >
          {row[title.field]}
        </Text>
      )
    } else {
      return <View style={screenStyles.cell}>{row[title.field]}</View>
    }
  }

  render() {
    const { style, color, showBottomLine, showTotalValue, titles, list } = this.props

    return list ? (
      <View style={[screenStyles.ROOT, style]}>
        <View style={[screenStyles.tableRow, screenStyles.tableHeaderRow, { backgroundColor: color }]}>
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
                title.link ? (
                  <TouchableOpacity key={tindex} style={{ width: title.width }}>
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
        {(showBottomLine || showTotalValue) && (
          <View style={screenStyles.totalRow}>
            {showTotalValue &&
              titles.map((title, index) => {
                let cellValue

                if (index === 0) {
                  cellValue = 'Totals'
                } else if (index === titles.length - 1) {
                  cellValue = ''
                } else {
                  let total = 0

                  list.map(row => {
                    if (typeof row[title.field] !== 'object') {
                      total += parseFloat(row[title.field])
                    }
                  })
                  cellValue = Number.isInteger(total) ? total.toString() : total.toFixed(2).toString()
                }

                return (
                  <View key={index} style={{ width: title.width }}>
                    <Text style={{ ...screenStyles.footerCell, textAlign: title.align || 'left' }}>{cellValue}</Text>
                  </View>
                )
              })}
          </View>
        )}
      </View>
    ) : (
      <React.Fragment />
    )
  }
}
