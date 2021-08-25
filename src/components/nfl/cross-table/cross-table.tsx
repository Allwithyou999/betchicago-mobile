import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TeamName } from '../../../components'
import * as screenStyles from './cross-table.styles'

interface CrossTableProp {
  style?: object
  titles?: Array<any>
  list?: Array<any>
  iconSize?: object
  onSelected?: (index) => void
}

export class CrossTable extends React.Component<CrossTableProp, {}> {
  static defaultProps: CrossTableProp = {
    onSelected: index => {},
  }

  render() {
    const { style, list, titles, iconSize, onSelected } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.tabelHeaderRow}>
          {titles.map((title, index) => (
            <View style={[{ width: title.width }, title.align && { alignItems: title.align }]} key={index}>
              <Text style={[screenStyles.headerCellText, title.color && { color: title.color }]}>{title.text}</Text>
            </View>
          ))}
        </View>
        {list.map((row, index) => (
          <View style={[screenStyles.tableRow, index % 2 == 1 && screenStyles.tableRowOdd]} key={index}>
            {titles.map((title, tindex) => (
              <View
                key={tindex}
                style={[screenStyles.cell, { width: title.width }, title.align && { alignItems: title.align }]}
              >
                {title.field === 'teamName' ? (
                  <TouchableOpacity style={screenStyles.teamName} onPress={() => onSelected(row['id'])}>
                    <TeamName uri={row['icon']} name={row['name']} iconSize={iconSize} />
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={[
                      screenStyles.cellText,
                      title.font && { fontFamily: title.font },
                      title.color && { color: title.color },
                    ]}
                  >
                    {row[title.field]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  }
}
