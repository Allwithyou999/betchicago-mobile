import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment-timezone'
import { GetWeekName } from '../../../services'
import * as screenStyles from './rankings-table.styles'

interface RankingsTableProp {
  style?: object
  list?: Array<any>
  onPress?: (type) => void
}

export class RankingsTable extends React.Component<RankingsTableProp, {}> {
  getCSTDate = date => {
    let updated = moment(date)
      .tz('America/Chicago')
      .format()
    let dateStrArr = updated.split('T')[0].split('-')
    let timeStrArr = updated.split('T')[1].split(':')

    let updatedStr = `${GetWeekName(
      moment(date)
        .tz('America/Chicago')
        .day(),
    )}, ${moment(dateStrArr[1], 'MM').format('MMM')} ${dateStrArr[2]}, ${
      timeStrArr[0] > 12 ? timeStrArr[0] - 12 : timeStrArr[0]
    }:${timeStrArr[1]}${timeStrArr[0] > 11 ? 'PM' : 'AM'} CT`
    return updatedStr
  }

  render() {
    const { style, list, onPress } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {list.map((item, index) => (
          <View style={screenStyles.tableRow} key={index}>
            <View style={screenStyles.lineWrapper}>
              <Text style={screenStyles.orderNumber}>{`${index + 1}.`}</Text>
              <Image
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2F${item.market.replace(
                    / /g,
                    '-',
                  )}-${item.name.replace(/ /g, '-')}.png?alt=media`,
                }}
                style={screenStyles.teamIcon}
              />
              <Text style={screenStyles.teamName}>{item.market}</Text>
              <Text style={screenStyles.wlText}>{`(${item.wins}-${item.losses})`}</Text>
            </View>
            {item.nextGame && (
              <React.Fragment>
                <View style={screenStyles.lineWrapper}>
                  <Text style={screenStyles.nextLable}>{`Next: `}</Text>
                  <Text style={screenStyles.nextTeam}>{`${
                    item.nextGame.home.id === item.id ? 'vs ' + item.nextGame.away.name : '@' + item.nextGame.home.name
                  }`}</Text>
                </View>
                <View style={screenStyles.lineWrapper}>
                  <Text style={screenStyles.time}>{`${this.getCSTDate(item.nextGame.scheduled)}`}</Text>
                </View>
              </React.Fragment>
            )}
          </View>
        ))}
      </View>
    )
  }
}
