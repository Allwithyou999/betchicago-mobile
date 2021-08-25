import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FormatAMPM } from '../../../services'
import * as screenStyles from './score-item.styles'

interface ScoreItemProp {
  style?: object
  type?: 'detail' | 'simple'
  game?: any
  // onMoreOddsPress?: (val) => void
  onGameCoveragePress?: (awayScore, homeScore) => void
}

export class ScoreItem extends React.Component<ScoreItemProp, {}> {
  creatScore = (scores, position?) => {
    const sc = []
    for (let i = 0; i < 9; i++) {
      sc.push(
        <View
          key={i}
          style={[
            screenStyles.tableCell,
            scores[i] === 'X' && screenStyles.tableActiveCell,
            position === 'bottom' && screenStyles.bottom,
          ]}
        >
          <Text style={screenStyles.scoreTableCellText}>{scores[i] === 'X' ? '-' : scores[i]}</Text>
        </View>,
      )
    }
    return sc
  }

  generateRunners = (runners: any) => {
    let p1: boolean, p2: boolean, p3: boolean
    runners &&
      runners.forEach(runner => {
        if (runner.starting_base === 1) p1 = true
        else if (runner.starting_base === 2) p2 = true
        else if (runner.starting_base === 3) p3 = true
      })
    return [
      <View style={{ ...screenStyles.square, backgroundColor: p2 ? '#111' : '#C8C8C8' }} key="p2" />,
      <View style={{ ...screenStyles.square, backgroundColor: p1 ? '#111' : '#C8C8C8' }} key="p1" />,
      <View style={{ ...screenStyles.square, backgroundColor: p3 ? '#111' : '#C8C8C8' }} key="p3" />,
    ]
  }

  generateOuts = count => {
    let result = []
    for (let i = 0; i < 3; i++) {
      result.push(
        <View
          style={{
            ...screenStyles.square,
            ...screenStyles.dot,
            backgroundColor: i < count ? '#111' : '#C8C8C8',
          }}
          key={`out-${i}`}
        />,
      )
    }
    return result
  }

  // onMoreOddsPress = val => {
  //   this.props.onMoreOddsPress && this.props.onMoreOddsPress(val)
  // }

  onGameCoveragePress = (awayScore, homeScore) => {
    this.props.onGameCoveragePress && this.props.onGameCoveragePress(awayScore, homeScore)
  }

  render() {
    const { style, type, game } = this.props

    let team1 = {
      name: 'CIN',
      color: '#C71430',
      ml: '-106',
      score: [0, 0, 0, 0, 10],
      total: {
        r: 11,
      },
      active: false,
    }

    let team2 = {
      name: 'COL',
      color: '#333465',
      ml: '+120',
      score: [11, 0, 0, 0, 0],
      total: {
        r: 11,
      },
      active: false,
    }

    let oddType = '-',
      oddValue = '-',
      inningText = '',
      rescheduled = false

    if (game) {
      const { home, away } = game

      if (game.odd) {
        const markets = game.odd.markets || []

        let id = '17084' // be default it's westgate

        !!markets[1] &&
          markets[1].books.forEach(book => {
            if (book.id.indexOf(id) !== -1 && !!book.outcomes) {
              book.outcomes.forEach(out => {
                if (out.odds.substr(0, 1) === '-') {
                  oddType = out.type.substr(0, 1).toUpperCase()
                  oddValue = out.total
                }
              })
              if (oddType === '-' && book.outcomes.length) {
                let out = book.outcomes[0]
                oddType = out.type.substr(0, 1).toUpperCase()
                oddValue = out.total
              }
            }
          })
      }

      let homeMl = '--'
      let awayMl = '--'

      if (game.odd) {
        const markets = game.odd.markets || []
        let id = '17084' // be default it's westgate

        !!markets[0] &&
          markets[0].books.forEach(book => {
            if (book.id.indexOf(id) !== -1 && !!book.outcomes) {
              book.outcomes.forEach(out => {
                if (out.type === 'home') {
                  homeMl = out.odds
                } else {
                  awayMl = out.odds
                }
              })
            }
          })
      }

      team1 = {
        name: home.abbr,
        color: game.home_color,
        ml: homeMl,
        score: home.scoring ? home.scoring.map(score => score.runs) : [],
        total: {
          r: home.runs,
        },
        active: false,
      }

      team2 = {
        name: away.abbr,
        color: game.away_color,
        ml: awayMl,
        score: away.scoring ? away.scoring.map(score => score.runs) : [],
        total: {
          r: away.runs,
        },
        active: false,
      }

      if (game.outcome) {
        inningText = game.outcome.current_inning_half === 'B' ? 'BOT ' : 'TOP '
        inningText += game.outcome.current_inning
        if (inningText === 'BOT 0') {
          inningText = 'TOP 1'
        }

        if (game.status === 'scheduled' && game.rescheduled) {
          rescheduled = true
        }
      }
    }

    let awayTScore, homeTScore
    if (game.status === 'scheduled') {
      awayTScore = parseInt(team2.ml) < 0 ? team2.ml : oddValue
      homeTScore = parseInt(team2.ml) < 0 ? oddValue : team1.ml
    } else {
      awayTScore = team2.total.r
      homeTScore = team1.total.r
    }

    return (
      <View style={[screenStyles.ROOT, style]}>
        <View style={screenStyles.scoreTable}>
          <View style={screenStyles.scoreTableHeader}>
            <View style={screenStyles.scoreTableHeaderFirstCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>ML</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>1</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>2</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>3</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>4</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>5</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>6</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>7</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>8</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>9</Text>
            </View>
            <View style={screenStyles.scoreTableHeaderCell}>
              <Text style={screenStyles.scoreTableHeaderCellText}>R</Text>
            </View>
          </View>
          <View style={{ ...screenStyles.scoreTableRow, borderLeftColor: team2.color }}>
            <View style={screenStyles.teamTitle}>
              <Text style={screenStyles.teamName}>{team2['name']}</Text>
              <Text style={screenStyles.teamML}>{team2['ml']}</Text>
            </View>
            {this.creatScore(team2['score'])}
            <View style={screenStyles.tableCell}>
              <Text style={screenStyles.scoreTableCellText}>{team2['total'].r}</Text>
            </View>
          </View>
          <View style={{ ...screenStyles.scoreTableRow, borderLeftColor: team1.color }}>
            <View style={[screenStyles.teamTitle, screenStyles.bottom]}>
              <Text style={screenStyles.teamName}>{team1['name']}</Text>
              <Text style={screenStyles.teamML}>{team1['ml']}</Text>
            </View>
            {this.creatScore(team1['score'], 'bottom')}
            <View style={[screenStyles.tableCell, screenStyles.bottom]}>
              <Text style={screenStyles.scoreTableCellText}>{team1['total'].r}</Text>
            </View>
          </View>
        </View>
        <View style={screenStyles.TextLine}>
          {!!game.outcome && (
            <View style={screenStyles.textInner}>
              {rescheduled && (
                <View style={screenStyles.textValue}>
                  <Text style={screenStyles.normalText}>{FormatAMPM(new Date(game.scheduled)).toUpperCase()}</Text>
                </View>
              )}
              <View style={screenStyles.textLabel}>
                <Text style={screenStyles.boldText}>{inningText}</Text>
              </View>
              <View style={screenStyles.squareBox}>{this.generateRunners(game.outcome.runners)}</View>
              <View style={screenStyles.dots}>
                {game.outcome.count ? this.generateOuts(game.outcome.count.outs) : this.generateOuts(0)}
              </View>
              {!!game.outcome.hitter && (
                <View style={screenStyles.textInner}>
                  <View style={screenStyles.textLabel}>
                    <Text style={screenStyles.boldText}>B:</Text>
                  </View>
                  <View style={screenStyles.textValue}>
                    <Text style={screenStyles.normalText}>
                      {game.outcome.hitter.first_name.substr(0, 1) + '. ' + game.outcome.hitter.last_name}
                    </Text>
                  </View>
                </View>
              )}
              {!!game.outcome.pitcher && (
                <View style={screenStyles.textInner}>
                  <View style={screenStyles.textLabel}>
                    <Text style={screenStyles.boldText}>P:</Text>
                  </View>
                  <View style={screenStyles.textValue}>
                    <Text style={screenStyles.normalText}>
                      {game.outcome.pitcher.first_name.substr(0, 1) + '. ' + game.outcome.pitcher.last_name}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
          {game.status === 'closed' &&
            game.pitching && (
              <View style={screenStyles.textInner}>
                <View style={screenStyles.textLabel}>
                  <Text style={screenStyles.boldText}>W:</Text>
                </View>
                <View style={screenStyles.textValue}>
                  <Text style={screenStyles.normalText}>
                    {game.pitching.win.first_name.substr(0, 1) + '. ' + game.pitching.win.last_name} (
                    {game.pitching.win.win}-{game.pitching.win.loss})
                  </Text>
                </View>
                <View style={screenStyles.textLabel}>
                  <Text style={screenStyles.boldText}>L:</Text>
                </View>
                <View style={screenStyles.textValue}>
                  <Text style={screenStyles.normalText}>
                    {game.pitching.loss.first_name.substr(0, 1) + '. ' + game.pitching.loss.last_name} (
                    {game.pitching.loss.win}-{game.pitching.loss.loss})
                  </Text>
                </View>
              </View>
            )}
          {game.status === 'scheduled' &&
            !rescheduled && (
              <View style={screenStyles.textInner}>
                <View style={screenStyles.textValue}>
                  <Text style={screenStyles.normalText}>{FormatAMPM(new Date(game.scheduled)).toUpperCase()}</Text>
                </View>
                {!!game.away.probable_pitcher && (
                  <View style={screenStyles.textValue}>
                    <Text style={screenStyles.normalText}>
                      {game.away.probable_pitcher.first_name.substr(0, 1) + '. ' + game.away.probable_pitcher.last_name}{' '}
                      ({game.away.probable_pitcher.win}-{game.away.probable_pitcher.loss})
                    </Text>
                  </View>
                )}
                {!!game.home.probable_pitcher && (
                  <View style={screenStyles.textValue}>
                    <Text style={screenStyles.normalText}>
                      {game.home.probable_pitcher.first_name.substr(0, 1) + '. ' + game.home.probable_pitcher.last_name}{' '}
                      ({game.home.probable_pitcher.win}-{game.home.probable_pitcher.loss})
                    </Text>
                  </View>
                )}
              </View>
            )}
          <View style={screenStyles.textInner}>
            <View style={screenStyles.textLabel}>
              <Text style={screenStyles.boldText}>O/U</Text>
            </View>
            <View>
              <Text style={screenStyles.highlightText}>{oddValue}</Text>
            </View>
          </View>
        </View>
        {type !== 'simple' && (
          <View style={screenStyles.scoreLink}>
            {/* <TouchableOpacity onPress={() => this.onMoreOddsPress('')}>
              <Text style={screenStyles.scoreLinkText}>MORE ODDS</Text>
            </TouchableOpacity>
            <Text> | </Text> */}
            <TouchableOpacity onPress={() => this.onGameCoveragePress(awayTScore, homeTScore)}>
              <Text style={screenStyles.scoreLinkText}>GAME COVERAGE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}
