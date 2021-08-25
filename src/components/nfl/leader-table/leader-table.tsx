import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AsyncImage } from '../../../components'
import * as screenStyles from './leader-table.styles'

interface LeaderTableProp {
  style?: object
  list?: Array<any>
  onPress?: (type) => void
}

export class LeaderTable extends React.Component<LeaderTableProp, {}> {
  render() {
    const { style, list, onPress } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {list.map((item, index) => (
          <View style={screenStyles.tableContainer} key={index}>
            <View style={screenStyles.tabelHeaderRow}>
              <View style={screenStyles.headerCellTitle}>
                <Text style={screenStyles.headerCellText}>{item['title']}</Text>
              </View>
              <View style={screenStyles.headerCellYTD}>
                <Text style={[screenStyles.headerCellText, screenStyles.alignRight]}>YTD</Text>
              </View>
            </View>
            <View style={screenStyles.mainTable}>
              <AsyncImage style={screenStyles.avatarImg} resizeMode="cover" source={item['image']} />
              <View style={screenStyles.tableContent}>
                {item.data.map((row, rindex) => (
                  <View
                    style={[screenStyles.tableRow, rindex === item.data.length - 1 && screenStyles.noBorder]}
                    key={rindex}
                  >
                    <View style={screenStyles.cellFirst}>
                      <Text style={[screenStyles.cellFirstText, rindex === 0 && screenStyles.boldText]}>{row[0]}</Text>
                    </View>
                    <View style={screenStyles.cellSecond}>
                      <Text style={[screenStyles.cellSecondText, rindex === 0 && screenStyles.boldText]}>{row[1]}</Text>
                    </View>
                    <View style={screenStyles.cellThird}>
                      <Text style={[screenStyles.cellThirdText, rindex === 0 && screenStyles.boldText]}>{row[2]}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View style={screenStyles.completeList}>
              <TouchableOpacity onPress={() => onPress(item['title'])}>
                <Text style={screenStyles.completeListText}>Complete list</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
