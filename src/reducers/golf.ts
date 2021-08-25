import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { GolfTypes } from '../actions/golf'

const initialState = Immutable({
  golfTourStatus: '',
  golfLeaderboardStatus: '',
  golfScheduleStatus: '',
  golfRankingStatus: '',
  golfOddsStatus: '',
  golfPlayerStatsStatus: '',
  golfPlayerTournamentStatus: '',
  golfTourList: [],
  golfLeaderboard: [],
  golfSchedule: [],
  golfRankingList: [],
  golfOdds: [],
  golfPlayerStats: [],
  golfPlayerTournament: [],
})

// Get Leaderboard Tour list
const getgolftourlistRequest = (state, action) => state.merge({ ...state, golfTourStatus: 'pending' })
const getgolftourlistSuccess = (state, action) =>
  state.merge({ ...state, golfTourStatus: 'done', golfTourList: action.golfTourList })
const getgolftourlistFailure = (state, action) => state.merge({ ...state, golfTourStatus: 'error' })

// Get Leaderboard Data list
const getgolfleaderboardRequest = (state, action) => state.merge({ ...state, golfLeaderboardStatus: 'pending' })
const getgolfleaderboardSuccess = (state, action) =>
  state.merge({ ...state, golfLeaderboardStatus: 'done', golfLeaderboard: action.golfLeaderboard })
const getgolfleaderboardFailure = (state, action) => state.merge({ ...state, golfLeaderboardStatus: 'error' })

// Get Schedule Data list
const getgolfscheduleRequest = (state, action) => state.merge({ ...state, golfScheduleStatus: 'pending' })
const getgolfscheduleSuccess = (state, action) =>
  state.merge({ ...state, golfScheduleStatus: 'done', golfSchedule: action.golfSchedule })
const getgolfscheduleFailure = (state, action) => state.merge({ ...state, golfScheduleStatus: 'error' })

// Get World Ranking list
const getgolfrankinglistRequest = (state, action) => state.merge({ ...state, golfRankingStatus: 'pending' })
const getgolfrankinglistSuccess = (state, action) =>
  state.merge({ ...state, golfRankingStatus: 'done', golfRankingList: action.golfRankingList })
const getgolfrankinglistFailure = (state, action) => state.merge({ ...state, golfRankingStatus: 'error' })

// Get Odds list
const getgolfoddsRequest = (state, action) => state.merge({ ...state, golfOddsStatus: 'pending' })
const getgolfoddsSuccess = (state, action) =>
  state.merge({ ...state, golfOddsStatus: 'done', golfOdds: action.golfOdds })
const getgolfoddsFailure = (state, action) => state.merge({ ...state, golfOddsStatus: 'error' })

// Get Player Stats
const getgolfplayerstatsRequest = (state, action) => state.merge({ ...state, golfPlayerStatsStatus: 'pending' })
const getgolfplayerstatsSuccess = (state, action) =>
  state.merge({ ...state, golfPlayerStatsStatus: 'done', golfPlayerStats: action.golfPlayerStats })
const getgolfplayerstatsFailure = (state, action) => state.merge({ ...state, golfPlayerStatsStatus: 'error' })

// Get Player Tournament
const getgolfplayertournamentRequest = (state, action) =>
  state.merge({ ...state, golfPlayerTournamentStatus: 'pending' })
const getgolfplayertournamentSuccess = (state, action) =>
  state.merge({ ...state, golfPlayerTournamentStatus: 'done', golfPlayerTournament: action.golfPlayerTournament })
const getgolfplayertournamentFailure = (state, action) => state.merge({ ...state, golfPlayerTournamentStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Leaderboard Tour List
  [GolfTypes.GETGOLFTOURLIST_REQUEST]: getgolftourlistRequest,
  [GolfTypes.GETGOLFTOURLIST_SUCCESS]: getgolftourlistSuccess,
  [GolfTypes.GETGOLFTOURLIST_FAILURE]: getgolftourlistFailure,

  // Get Leaderboard Data List
  [GolfTypes.GETGOLFLEADERBOARD_REQUEST]: getgolfleaderboardRequest,
  [GolfTypes.GETGOLFLEADERBOARD_SUCCESS]: getgolfleaderboardSuccess,
  [GolfTypes.GETGOLFLEADERBOARD_FAILURE]: getgolfleaderboardFailure,

  // Get Schedule Data List
  [GolfTypes.GETGOLFSCHEDULE_REQUEST]: getgolfscheduleRequest,
  [GolfTypes.GETGOLFSCHEDULE_SUCCESS]: getgolfscheduleSuccess,
  [GolfTypes.GETGOLFSCHEDULE_FAILURE]: getgolfscheduleFailure,

  // Get World Rankings List
  [GolfTypes.GETGOLFRANKINGLIST_REQUEST]: getgolfrankinglistRequest,
  [GolfTypes.GETGOLFRANKINGLIST_SUCCESS]: getgolfrankinglistSuccess,
  [GolfTypes.GETGOLFRANKINGLIST_FAILURE]: getgolfrankinglistFailure,

  // Get Odds List
  [GolfTypes.GETGOLFODDS_REQUEST]: getgolfoddsRequest,
  [GolfTypes.GETGOLFODDS_SUCCESS]: getgolfoddsSuccess,
  [GolfTypes.GETGOLFODDS_FAILURE]: getgolfoddsFailure,

  // Get Player Stats
  [GolfTypes.GETGOLFPLAYERSTATS_REQUEST]: getgolfplayerstatsRequest,
  [GolfTypes.GETGOLFPLAYERSTATS_SUCCESS]: getgolfplayerstatsSuccess,
  [GolfTypes.GETGOLFPLAYERSTATS_FAILURE]: getgolfplayerstatsFailure,

  // Get Player Tournament
  [GolfTypes.GETGOLFPLAYERTOURNAMENT_REQUEST]: getgolfplayertournamentRequest,
  [GolfTypes.GETGOLFPLAYERTOURNAMENT_SUCCESS]: getgolfplayertournamentSuccess,
  [GolfTypes.GETGOLFPLAYERTOURNAMENT_FAILURE]: getgolfplayertournamentFailure,
})
