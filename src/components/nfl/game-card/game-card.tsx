import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TeamName } from '../../../components'
import * as screenStyles from './game-card.styles'

interface GameCardProp {
  style?: object
  titles?: Array<any>
  list?: Array<any>
  iconSize?: object
  type?: 'optimize' | 'extend'
  hasHeader?: boolean
  headerTitle?: string
  onSelected?: (id) => void
}

export class GameCard extends React.Component<GameCardProp, {}> {
  render() {
    const { style, list, titles, iconSize, type, onSelected, hasHeader, headerTitle } = this.props

    return (
      <View style={[screenStyles.ROOT, style]}>
        {hasHeader && (
          <View style={screenStyles.tableHeaderRow}>
            {titles.map((title, index) => (
              <View key={index} style={[{ width: title.width }, title.align && { alignItems: title.align }]}>
                <Text
                  style={[
                    screenStyles.headerCellText,
                    title.font && { fontFamily: title.font },
                    title.color && { color: title.color },
                  ]}
                >
                  {title.text === 'headerTitle' ? headerTitle : title.text}
                </Text>
              </View>
            ))}
          </View>
        )}
        {list.map((row, index) => (
          <View style={screenStyles.tableRow} key={index}>
            {titles.map((title, tindex) => (
              <View
                key={tindex}
                style={[
                  screenStyles.cell,
                  { width: title.width },
                  title.align && { alignItems: title.align },
                  type === 'extend' && { paddingVertical: 7 },
                ]}
              >
                {title.field === 'teamName' ? (
                  onSelected ? (
                    <TouchableOpacity onPress={() => onSelected(row['id'])}>
                      {!row['teamRankings'] ? (
                        <TeamName uri={row['logo']} name={row['name']} iconSize={iconSize} />
                      ) : (
                        <TeamName
                          uri={row['logo']}
                          name={row['name']}
                          ranking={row['teamRankings']}
                          iconSize={iconSize}
                        />
                      )}
                    </TouchableOpacity>
                  ) : (
                    <View>
                      {!row['teamRankings'] ? (
                        <TeamName uri={row['logo']} name={row['name']} iconSize={iconSize} />
                      ) : (
                        <TeamName
                          uri={row['logo']}
                          name={row['name']}
                          ranking={row['teamRankings']}
                          iconSize={iconSize}
                        />
                      )}
                    </View>
                  )
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
