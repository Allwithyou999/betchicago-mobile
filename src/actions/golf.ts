import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get Leaderboard Tour list
  getgolftourlistRequest: ['year', 'id'],
  getgolftourlistSuccess: ['golfTourList'],
  getgolftourlistFailure: null,

  // Get Leaderboard list
  getgolfleaderboardRequest: ['id', 'year'],
  getgolfleaderboardSuccess: ['golfLeaderboard'],
  getgolfleaderboardFailure: null,

  // Get Schedule list
  getgolfscheduleRequest: ['year'],
  getgolfscheduleSuccess: ['golfSchedule'],
  getgolfscheduleFailure: null,

  // Get World Ranking list
  getgolfrankinglistRequest: ['year'],
  getgolfrankinglistSuccess: ['golfRankingList'],
  getgolfrankinglistFailure: null,

  // Get Odds list
  getgolfoddsRequest: [],
  getgolfoddsSuccess: ['golfOdds'],
  getgolfoddsFailure: null,

  // Get Player Stats
  getgolfplayerstatsRequest: ['id', 'year'],
  getgolfplayerstatsSuccess: ['golfPlayerStats'],
  getgolfplayerstatsFailure: null,

  // Get Player Tournament
  getgolfplayertournamentRequest: ['id', 'year'],
  getgolfplayertournamentSuccess: ['golfPlayerTournament'],
  getgolfplayertournamentFailure: null,
})

export const GolfTypes = Types
export default Creators
