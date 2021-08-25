import { Colors, Metrics } from '../../themes'

export const NFL_ODDS_RADAR =
  'https://api.sportradar.us/oddscomparison-usp1/en/us/categories/sr:category:43/outrights.json?api_key=swg4s5tc77z2wpwhmz5u3vem'

export const NFL_SCHEDULE_TITLE = [
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

export const NFL_Final_SCHEDULE_TITLE = [
  {
    field: 'teamName',
    width: '56%',
    align: 'flex-start',
  },
  {
    field: 'score',
    width: '23%',
    align: 'flex-end',
    font: 'Roboto-Light',
  },
  {
    field: 'data',
    width: '21%',
    align: 'flex-end',
  },
]

export const NFL_ODDS_TITLE = [
  {
    text: 'Matchup',
    field: 'teamName',
    width: '30%',
    align: 'flex-start',
  },
  {
    text: 'Westgate',
    field: 'westgate',
    width: '35%',
    align: 'flex-start',
    font: 'Roboto-Light',
    color: Colors.blue,
  },
  {
    text: 'W. Hill',
    field: 'hill',
    width: '35%',
    align: 'flex-start',
    font: 'Roboto-Light',
    color: Colors.active,
  },
]

export const NFL_ODDS_FUTURES_TITLE = [
  {
    text: 'Win 2019-2020 Super Bowl',
    field: 'teamName',
    width: '80%',
    align: 'flex-start',
  },
  {
    text: 'ODDS',
    field: 'odds',
    width: '20%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_AFC_EAST_TITLE = [
  {
    text: 'AFC EAST',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_AFC_NORTH_TITLE = [
  {
    text: 'AFC NORTH',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_AFC_SOUTH_TITLE = [
  {
    text: 'AFC SOUTH',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_AFC_WEST_TITLE = [
  {
    text: 'AFC WEST',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_NFC_EAST_TITLE = [
  {
    text: 'NFC EAST',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_NFC_NORTH_TITLE = [
  {
    text: 'NFC NORTH',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_NFC_SOUTH_TITLE = [
  {
    text: 'NFC SOUTH',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_STANDINGS_NFC_WEST_TITLE = [
  {
    text: 'NFC WEST',
    field: 'teamName',
    width: '34%',
    align: 'flex-start',
  },
  {
    text: 'W',
    field: 'w',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'L',
    field: 'l',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'T',
    field: 't',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'ATS',
    field: 'ats',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'O/U',
    field: 'ou',
    width: '18%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_TEAMS_BREAKDOWN = [
  {
    field: 'key',
    width: '85%',
    align: 'flex-start',
    font: 'Roboto-Light',
    color: Colors.articleSectionTextColor,
  },
  {
    field: 'value',
    width: '15%',
    align: 'flex-end',
    font: 'Roboto-Light',
    color: Colors.articleSectionTextColor,
  },
]

export const NFL_TEAMS_OFFENSIVE_LEADERS_PASSING = [
  {
    text: 'Passing',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'ATT',
    field: 'att',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'COMP',
    field: 'comp',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'INT',
    field: 'int',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_OFFENSIVE_LEADERS_RUSHING = [
  {
    text: 'Rushing',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'ATT',
    field: 'att',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'FUM',
    field: 'fum',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_OFFENSIVE_LEADERS_RECEIVING = [
  {
    text: 'Receiving',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'REC',
    field: 'rec',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TAR',
    field: 'tar',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_PLAYER_STATS_DEFENSE = [
  {
    text: 'Defense',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'TACK',
    field: 'tack',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'ASST',
    field: 'asst',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'SACK',
    field: 'sack',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'INT',
    field: 'int',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_PLAYER_STATS_RETURNS = [
  {
    text: 'Returns',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'ATT',
    field: 'att',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TDS',
    field: 'tds',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'LONG',
    field: 'long',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_PLAYER_STATS_KICKING = [
  {
    text: 'Kicking',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'FGM',
    field: 'fgm',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'FGA',
    field: 'fga',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'PCT',
    field: 'pct',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'XPM',
    field: 'xpm',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'XPA',
    field: 'xpa',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_PLAYER_STATS_PUNTING = [
  {
    text: 'Punting',
    field: 'player',
    width: '36%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'PUNTS',
    field: 'punts',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'LONG',
    field: 'long',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'NET',
    field: 'net',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_TEAMS_SCHEDULE = [
  {
    field: 'index',
    width: '10%',
    align: 'flex-start',
  },
  {
    field: 'date',
    width: '18%',
    align: 'flex-start',
  },
  {
    field: 'separator',
    width: '7%',
    align: 'flex-start',
  },
  {
    field: 'teamName',
    width: '38%',
    align: 'flex-start',
  },
  {
    field: 'time',
    width: '27%',
    align: 'flex-end',
  },
]

export const NFL_TEAMS_PLAYER = [
  {
    text: 'No.',
    field: 'no',
    width: '10%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'Player',
    field: 'player',
    width: '60%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'POS',
    field: 'pos',
    width: '15%',
    align: 'center',
    font: 'Roboto-Light',
  },
  {
    text: 'YR',
    field: 'yr',
    width: '15%',
    align: 'center',
    font: 'Roboto-Light',
  },
]

export const NFL_TEAMS_TEAM_STATS = [
  {
    text: 'Category',
    field: 'category',
    width: '56%',
    align: 'flex-start',
    font: 'Roboto-Light',
  },
  {
    text: 'CHI',
    field: 'chi',
    width: '22%',
    align: 'flex-end',
    font: 'Roboto-Light',
  },
  {
    text: 'OPP',
    field: 'opp',
    width: '22%',
    align: 'flex-end',
    font: 'Roboto-Light',
  },
]

export const NFL_STATS_TEAM_OFFENSIVE_LEADERS_TOTAL = [
  {
    text: 'Total Offense',
    field: 'player',
    width: '44%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YPG',
    field: 'ypg',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'PTS',
    field: 'pts',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'PPG',
    field: 'ppg',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_OFFENSIVE_LEADERS_PASSING = [
  {
    text: 'Passing Offense',
    field: 'player',
    width: '41%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'ATT',
    field: 'yds',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'COMP',
    field: 'comp',
    width: '13%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'INT',
    field: 'int',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_OFFENSIVE_LEADERS_RUSHING = [
  {
    text: 'Rushing Offense',
    field: 'player',
    width: '41%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YPG',
    field: 'ypg',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'FUM',
    field: 'fum',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_OFFENSIVE_LEADERS_RECEIVING = [
  {
    text: 'Receiving Offense',
    field: 'player',
    width: '41%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YPG',
    field: 'ypg',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AVG',
    field: 'avg',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'FUM',
    field: 'fum',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_DEFENSE_LEADERS_TACKLES = [
  {
    text: 'Tackles',
    field: 'player',
    width: '58%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'Solo',
    field: 'solo',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'AST',
    field: 'ast',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TTL',
    field: 'ttl',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_DEFENSE_LEADERS_SACKS = [
  {
    text: 'Sacks',
    field: 'player',
    width: '72%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'Sack',
    field: 'sack',
    width: '15%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDSL',
    field: 'ydsl',
    width: '15%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TEAM_DEFENSE_LEADERS_INTERCEPTIONS = [
  {
    text: 'Interceptions',
    field: 'player',
    width: '41%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'PD',
    field: 'pd',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'INT',
    field: 'int',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'YDS',
    field: 'yds',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'LNG',
    field: 'lng',
    width: '12%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'TD',
    field: 'td',
    width: '11%',
    font: 'Roboto-Light',
    align: 'center',
  },
]

export const NFL_STATS_TOTAL_OFFENSIVE = [
  {
    text: 'Team',
    field: 'team',
    width: '41%',
    align: 'flex-start',
    color: Colors.blue,
    font: 'Roboto-Light',
  },
  {
    text: 'YPG',
    field: 'ypg',
    width: '15%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'RUSH',
    field: 'rush',
    width: '15%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'REC',
    field: 'rec',
    width: '15%',
    font: 'Roboto-Light',
    align: 'center',
  },
  {
    text: 'PPG',
    field: 'ppg',
    width: '14%',
    font: 'Roboto-Light',
    align: 'center',
  },
]
