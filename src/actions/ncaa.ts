import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get ncaa Schedule
  getncaascheduledataRequest: ['date'],
  getncaascheduledataSuccess: ['ncaaScheduleData'],
  getncaascheduledataFailure: null,

  // Get ncaa Standings
  getncaastandingsconfRequest: ['year'],
  getncaastandingsconfSuccess: ['ncaaStandingsConf'],
  getncaastandingsconfFailure: null,

  getncaastandingsteamsRequest: ['id', 'year'],
  getncaastandingsteamsSuccess: ['ncaaStandingsTeams'],
  getncaastandingsteamsFailure: null,

  // Get ncaa rankings
  getncaarankingsdataRequest: ['year'],
  getncaarankingsdataSuccess: ['ncaaRankingsData'],
  getncaarankingsdataFailure: null,

  // Get ncaa futures
  getncaafuturesdataRequest: ['year'],
  getncaafuturesdataSuccess: ['ncaaFuturesData'],
  getncaafuturesdataFailure: null,

  // Get ncaa Matchup
  getncaamatchupdataRequest: ['status', 'gameId', 'awayId', 'homeId'],
  getncaamatchupdataSuccess: ['ncaaMatchupData'],
  getncaamatchupdataFailure: null,

  getncaalastgamehomeRequest: ['ids'],
  getncaalastgamehomeSuccess: ['ncaaLastGameHomeData'],
  getncaalastgamehomeFailure: null,

  getncaalastgameawayRequest: ['ids'],
  getncaalastgameawaySuccess: ['ncaaLastGameAwayData'],
  getncaalastgameawayFailure: null,
})

export const NCAATypes = Types
export default Creators
