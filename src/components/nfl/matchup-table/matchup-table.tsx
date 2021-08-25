import * as React from 'react'
import { View, Text, Image } from 'react-native'
import { GameCard } from '../../../components'
import * as screenStyles from './matchup-table.styles'

interface MatchupTableProp {
  style?: object
  list?: Array<any>
  titles?: Array<any>
  onSelected?: (index) => void
}

export class MatchupTable extends React.Component<MatchupTableProp, {}> {
  render() {
    const { style, list, titles, onSelected } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.tabelHeaderRow}>
          {titles.map((title, index) => (
            <View style={{ width: title.width }} key={index}>
              <Text style={[screenStyles.headerCellText, title.color && { color: title.color }]}>{title.text}</Text>
            </View>
          ))}
        </View>
        {list.map((row, index) => (
          <View style={screenStyles.tableRow} key={index}>
            <Text style={screenStyles.dateText}>{row['date']}</Text>
            <GameCard style={screenStyles.gameCard} titles={titles} list={row['data']} onSelected={onSelected} />
          </View>
        ))}
      </View>
    )
  }
}
