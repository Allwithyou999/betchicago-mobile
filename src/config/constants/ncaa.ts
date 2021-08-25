import { Colors, Metrics } from '../../themes'

export const NCAA_SCHEDULE_TITLE = [
  {
    field: 'teamName',
    width: '56%',
    align: 'flex-start',
  },
  {
    field: 'ou',
    width: '23%',
    align: 'flex-end',
    font: 'Roboto-Light',
    color: Colors.tableHeaderCellColor,
  },
  {
    field: 'time',
    width: '21%',
    align: 'flex-end',
  },
]

export const NCAA_Final_SCHEDULE_TITLE = [
  {
    field: 'teamName',
    width: '56%',
    align: 'flex-start',
  },
  {
    field: 'score',
    width: '23%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    field: 'data',
    width: '21%',
    align: 'flex-end',
  },
]

export const NCAA_STANDINGS_TITLE = [
  {
    text: 'TEAM',
    field: 'teamName',
    width: '44%',
    align: 'flex-start',
  },
  {
    text: 'W-L',
    field: 'wl',
    width: '14%',
    align: 'center',
    font: 'Roboto-Light',
    color: Colors.popupHeaderColor,
  },
  {
    text: 'CONF',
    field: 'conf',
    width: '14%',
    align: 'center',
    font: 'Roboto-Light',
    color: Colors.popupHeaderColor,
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '14%',
    align: 'center',
    font: 'Roboto-Light',
    color: Colors.popupHeaderColor,
  },
  {
    text: 'O-U',
    field: 'ou',
    width: '14%',
    align: 'center',
    font: 'Roboto-Light',
    color: Colors.popupHeaderColor,
  },
]

export const NCAA_FUTURES_TITLE = [
  {
    text: 'TEAM',
    field: 'teamName',
    width: '84%',
    align: 'flex-start',
  },
  {
    text: 'ODDS',
    field: 'odds',
    width: '16%',
    align: 'center',
    font: 'Roboto-Light',
    color: Colors.popupHeaderColor,
  },
]

export const NCAA_TEAM_SCHEDULE_TITLE = [
  {
    text: 'Date',
    field: 'date',
    width: '15%',
    align: 'flex-start',
    padding: 4,
  },
  {
    text: 'OPP',
    field: 'opp',
    width: '25%',
    align: 'flex-start',
    color: '#0064C7',
  },
  {
    text: 'SCORE',
    field: 'score',
    width: '20%',
    align: 'flex-start',
  },

  {
    text: 'LINE',
    field: 'line',
    width: '20%',
    align: 'flex-start',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '20%',
    align: 'flex-start',
  },
]

export const NCAA_TEAM_PLAYER_TITLE1 = [
  {
    text: 'P',
    field: 'p',
    width: '5%',
    align: 'flex-start',
    padding: 4,
  },
  {
    text: 'Player',
    field: 'player',
    width: '31%',
    align: 'flex-start',
  },
  {
    text: 'PTS',
    field: 'pts',
    width: '16%',
    align: 'center',
  },
  {
    text: 'FG%',
    field: 'fg',
    width: '16%',
    align: 'center',
  },
  {
    text: '3PT%',
    field: 'pt',
    width: '16%',
    align: 'center',
  },
  {
    text: 'FT%',
    field: 'ft',
    width: '16%',
    align: 'center',
  },
]

export const NCAA_TEAM_PLAYER_TITLE2 = [
  {
    text: 'P',
    field: 'p',
    width: '5%',
    align: 'flex-start',
    padding: 4,
  },
  {
    text: 'Player',
    field: 'player',
    width: '31%',
    align: 'flex-start',
  },
  {
    text: 'REB',
    field: 'reb',
    width: '16%',
    align: 'center',
  },
  {
    text: 'AST',
    field: 'ast',
    width: '16%',
    align: 'center',
  },
  {
    text: 'STL',
    field: 'stl',
    width: '16%',
    align: 'center',
  },
  {
    text: 'TO',
    field: 'to',
    width: '16%',
    align: 'center',
  },
]

export const NCAA_MATCHUP_LAST10_TITLE1 = [
  {
    text: 'Date',
    field: 'date',
    width: '15%',
    align: 'flex-start',
  },
  {
    text: 'OPP',
    field: 'opp',
    width: '25%',
    align: 'flex-start',
  },
  {
    text: 'SCORE',
    field: 'score',
    width: '21%',
    align: 'flex-start',
  },
  {
    text: 'LINE',
    field: 'line',
    width: '19%',
    align: 'flex-start',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '20%',
    align: 'flex-start',
  },
]

export const NCAA_MATCHUP_LAST10_TITLE2 = [
  {
    text: 'Date',
    field: 'date',
    width: '15%',
    align: 'flex-start',
  },
  {
    text: 'OPP',
    field: 'opp',
    width: '25%',
    align: 'flex-start',
  },
  {
    text: 'FG',
    field: 'fg',
    width: '20%',
    align: 'flex-start',
  },
  {
    text: 'OFG',
    field: 'ofg',
    width: '20%',
    align: 'flex-start',
  },
  {
    text: 'REB',
    field: 'reb',
    width: '20%',
    align: 'flex-start',
  },
]

export const NCAA_STARTING_LINEUP_TITLE = [
  {
    text: 'PLAYER',
    field: 'player',
    width: '35%',
    align: 'flex-start',
  },
  {
    text: 'FG%',
    field: 'fg',
    width: '12%',
    align: 'flex-start',
  },
  {
    text: '3PT%',
    field: 'pt',
    width: '12%',
    align: 'flex-start',
  },
  {
    text: 'FT%',
    field: 'ft',
    width: '12%',
    align: 'flex-start',
  },
  {
    text: 'AST/G',
    field: 'astg',
    width: '14%',
    align: 'flex-start',
  },
  {
    text: 'REB/G',
    field: 'rebg',
    width: '15%',
    align: 'flex-start',
  },
]

export const NCAA_MATCHUP_TEAMS_SCORING_TITLE = [
  {
    text: 'Team',
    field: 'team',
    width: '55%',
    align: 'flex-start',
    bold: true,
  },
  {
    text: '1',
    field: 'first',
    width: '11%',
    align: 'center',
  },
  {
    text: '2',
    field: 'second',
    width: '11%',
    align: 'center',
  },
  {
    text: 'OT',
    field: 'ot',
    width: '11%',
    align: 'center',
  },
  {
    text: 'F',
    field: 'f',
    width: '11%',
    bold: true,
    align: 'center',
  },
]

export const NCAA_MATCHUP_PLAYER_STATS_TITLE1 = [
  {
    text: 'P',
    field: 'p',
    width: '10%',
    align: 'flex-start',
  },
  {
    text: 'Player',
    field: 'player',
    width: '36%',
    align: 'flex-start',
  },
  {
    text: 'PTS',
    field: 'pts',
    width: '12%',
    align: 'flex-start',
  },
  {
    text: 'FG',
    field: 'fg',
    width: '14%',
    align: 'flex-start',
  },
  {
    text: 'pt',
    field: 'pt',
    width: '14%',
    align: 'flex-start',
  },
  {
    text: 'FT',
    field: 'ft',
    width: '14%',
    align: 'flex-start',
  },
]

export const NCAA_MATCHUP_PLAYER_STATS_TITLE2 = [
  {
    text: 'P',
    field: 'p',
    width: '10%',
    align: 'flex-start',
  },
  {
    text: 'Player',
    field: 'player',
    width: '36%',
    align: 'flex-start',
  },
  {
    text: 'REB',
    field: 'reb',
    width: '11%',
    align: 'flex-start',
  },
  {
    text: 'OREB',
    field: 'oreb',
    width: '12%',
    align: 'flex-start',
  },
  {
    text: 'AST',
    field: 'ast',
    width: '11%',
    align: 'flex-start',
  },
  {
    text: 'STL',
    field: 'stl',
    width: '10%',
    align: 'flex-start',
  },
  {
    text: 'TO',
    field: 'to',
    width: '11%',
    align: 'flex-start',
  },
]
