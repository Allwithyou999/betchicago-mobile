//Table Header Definitions
export const LEADERBOARD_ROUND_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '12%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '33%',
    link: 'link',
  },
  {
    text: 'R1',
    field: 'r1',
    width: '10%',
  },
  {
    text: 'R2',
    field: 'r2',
    width: '10%',
  },
  {
    text: 'R3',
    field: 'r3',
    width: '10%',
  },
  {
    text: 'R4',
    field: 'r4',
    width: '10%',
  },
  {
    text: 'TO PAR',
    field: 'par',
    width: '15%',
    align: 'right',
  },
]

export const LEADERBOARD_SUMMARY_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '10%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '42%',
    link: 'link',
  },
  {
    text: 'TO PAR',
    field: 'par',
    width: '16%',
    align: 'center',
  },
  {
    text: 'Thru',
    field: 'thru',
    width: '16%',
    align: 'center',
  },
  {
    text: 'Round',
    field: 'round',
    width: '16%',
    align: 'center',
  },
]

export const LEADERBOARD_FINAL_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '12%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '33%',
    link: 'link',
  },
  {
    text: 'Final',
    field: 'final',
    width: '12%',
  },
  {
    text: 'Earnings',
    field: 'earning',
    width: '29%',
    align: 'right',
  },
  {
    text: 'FEDEX',
    field: 'fedex',
    width: '14%',
    align: 'right',
  },
]

export const PLAYER_TOP_TITLE = [
  {
    text: 'rank',
    field: 'rank',
    width: '15%',
    weight: '400',
  },
  {
    text: 'Earnings',
    field: 'earning',
    width: '35%',
    weight: '400',
  },
  {
    text: 'Events',
    field: 'events',
    width: '20%',
    align: 'center',
    weight: '400',
  },
  {
    text: 'Wins',
    field: 'wins',
    width: '15%',
    align: 'center',
    weight: '400',
  },
  {
    text: 'Top 10',
    field: 'top10',
    width: '15%',
    align: 'center',
    weight: '400',
  },
]

export const PLAYER_BOTTOM_TITLE = [
  {
    text: 'Ave score',
    field: 'avgScore',
    width: '25%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'Ave Drive',
    field: 'avgDrive',
    width: '25%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'Accuracy',
    field: 'accuracy',
    width: '25%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'Greens',
    field: 'greens',
    width: '25%',
    weight: '400',
    align: 'center',
  },
]

export const PLAYER_SCORE_TITLE = [
  {
    text: 'R1',
    field: 'r1',
    width: '10%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'R2',
    field: 'r2',
    width: '10%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'R3',
    field: 'r3',
    width: '10%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'R4',
    field: 'r4',
    width: '10%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'TO PAR',
    field: 'par',
    width: '25%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'POS',
    field: 'pos',
    width: '20%',
    weight: '400',
    align: 'center',
  },
  {
    text: 'WIN',
    field: 'win',
    width: '15%',
    weight: '400',
    align: 'right',
  },
]

export const PLAYER_MONEY_LEADER_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '10%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '60%',
    link: 'link',
  },
  {
    text: 'Earnings',
    field: 'earnings',
    width: '30%',
    align: 'right',
  },
]

export const PLAYER_FEDEX_POINT_LEADER_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '10%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '60%',
    link: 'link',
  },
  {
    text: 'points',
    field: 'points',
    width: '30%',
    align: 'right',
  },
]

export const RANKING_TITLE = [
  {
    text: 'POS',
    field: 'pos',
    width: '15%',
  },
  {
    text: 'PLAYER',
    field: 'name',
    width: '49%',
    link: 'link',
  },
  {
    text: 'EVENTS',
    field: 'events',
    width: '16%',
    align: 'center',
  },
  {
    text: 'POINTS',
    field: 'points',
    width: '20%',
    align: 'right',
  },
]

export const ODDS_TITLE = [
  {
    text: 'Player',
    field: 'name',
    width: '50%',
    color: 'rgb(9, 108, 190)',
  },
  {
    text: 'Odds',
    field: 'odds',
    width: '50%',
    align: 'right',
    component: true,
  },
]

export const ODDS_HOME_TITLE = [
  {
    text: 'Player',
    field: 'name',
    width: 'calc(100% - 80px)',
  },
  {
    text: 'Odds',
    field: 'odds',
    width: '80px',
    align: 'right',
  },
]

export const PLAYER_TEATIME_TITLE = [
  {
    text: 'Player Pairing',
    field: 'players',
    width: 'calc(100% - 100px)',
  },
  {
    text: 'TEE TIME (CT)',
    field: 'teetime',
    width: '100px',
    align: 'right',
  },
]

export const SCHEDULE_TITLE = [
  {
    text: 'Date',
    field: 'date',
    width: '20%',
  },
  {
    text: 'Event',
    field: 'name',
    width: '65%',
    weight: '400',
  },
  {
    text: 'Data',
    field: 'linkText',
    width: '15%',
    align: 'right',
    link: 'link',
  },
]

export const GOLF_RANKING_PLAYER_SESSION1 = [
  {
    text: 'Rank',
    field: 'rank',
    width: '15%',
    align: 'center',
  },
  {
    text: 'Earnings',
    field: 'earnings',
    width: '37%',
    align: 'center',
  },
  {
    text: 'Events',
    field: 'events',
    width: '17%',
    align: 'center',
  },
  {
    text: 'Wins',
    field: 'wins',
    width: '15%',
    align: 'center',
  },
  {
    text: 'Top 10',
    field: 'top10',
    width: '16%',
    align: 'center',
  },
]

export const GOLF_RANKING_PLAYER_SESSION2 = [
  {
    text: 'AVE SCORE',
    field: 'avescore',
    width: '25%',
    align: 'center',
  },
  {
    text: 'AVE DRIVE',
    field: 'avedrive',
    width: '25%',
    align: 'center',
  },
  {
    text: 'ACCURACY',
    field: 'accuracy',
    width: '25%',
    align: 'center',
  },
  {
    text: 'GREENS',
    field: 'greens',
    width: '25%',
    align: 'center',
  },
]

export const GOLF_RANKING_PLAYER_CHAMPIONSHIP = [
  {
    text: 'R1',
    field: 'r1',
    width: '12%',
    align: 'center',
  },
  {
    text: 'R2',
    field: 'r2',
    width: '12%',
    align: 'center',
  },
  {
    text: 'R3',
    field: 'r3',
    width: '12%',
    align: 'center',
  },
  {
    text: 'R4',
    field: 'r4',
    width: '12%',
    align: 'center',
  },
  {
    text: 'TO PAR',
    field: 'par',
    width: '18%',
    align: 'center',
  },
  {
    text: 'POS',
    field: 'pos',
    width: '17%',
    align: 'center',
  },
  {
    text: 'WIN',
    field: 'win',
    width: '17%',
    align: 'center',
  },
]
