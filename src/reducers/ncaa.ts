import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { merge } from 'ramda'
import { NCAATypes } from '../actions/ncaa'

const initialState = Immutable({
  ncaaScheduleStatus: '', // done, pending, error
  ncaaScheduleData: [],

  ncaaStandingsConfStatus: '', // done, pending, error
  ncaaStandingsConf: [],

  ncaaStandingsTeamsStatus: '', // done, pending, error
  ncaaStandingsTeams: [],

  ncaaRankingsStatus: '', // done, pending, error
  ncaaRankingsData: [],

  ncaaFuturesStatus: '', // done, pending, error
  ncaaFuturesData: [],

  ncaaMatchupStatus: '', // done, pending, error
  ncaaMatchupData: [],

  ncaaLastGameHomeStatus: '', // done, pending, error
  ncaaLastGameHomeData: [],

  ncaaLastGameAwayStatus: '', // done, pending, error
  ncaaLastGameAwayData: [],
})

// Get Schedule data
const getncaascheduledataRequest = (state, action) => state.merge({ ...state, ncaaScheduleStatus: 'pending' })
const getncaascheduledataSuccess = (state, action) => {
  const ncaaScheduleData = merge(state.ncaaScheduleData, action.ncaaScheduleData)
  return state.merge({ ...state, ncaaScheduleStatus: 'done', ncaaScheduleData })
}
const getncaascheduledataFailure = (state, action) => state.merge({ ...state, ncaaScheduleStatus: 'error' })

// Get Standings data
const getncaastandingsconfRequest = (state, action) => state.merge({ ...state, ncaaStandingsConfStatus: 'pending' })
const getncaastandingsconfSuccess = (state, action) =>
  state.merge({ ...state, ncaaStandingsConfStatus: 'done', ncaaStandingsConf: action.ncaaStandingsConf })
const getncaastandingsconfFailure = (state, action) => state.merge({ ...state, ncaaStandingsConfStatus: 'error' })

const getncaastandingsteamsRequest = (state, action) => state.merge({ ...state, ncaaStandingsTeamsStatus: 'pending' })
const getncaastandingsteamsSuccess = (state, action) =>
  state.merge({ ...state, ncaaStandingsTeamsStatus: 'done', ncaaStandingsTeams: action.ncaaStandingsTeams })
const getncaastandingsteamsFailure = (state, action) => state.merge({ ...state, ncaaStandingsTeamsStatus: 'error' })

// Get Rankings data
const getncaarankingsdataRequest = (state, action) => state.merge({ ...state, ncaaRankingsStatus: 'pending' })
const getncaarankingsdataSuccess = (state, action) =>
  state.merge({ ...state, ncaaRankingsStatus: 'done', ncaaRankingsData: action.ncaaRankingsData })
const getncaarankingsdataFailure = (state, action) => state.merge({ ...state, ncaaRankingsStatus: 'error' })

// Get Futures data
const getncaafuturesdataRequest = (state, action) => state.merge({ ...state, ncaaFuturesStatus: 'pending' })
const getncaafuturesdataSuccess = (state, action) =>
  state.merge({ ...state, ncaaFuturesStatus: 'done', ncaaFuturesData: action.ncaaFuturesData })
const getncaafuturesdataFailure = (state, action) => state.merge({ ...state, ncaaFuturesStatus: 'error' })

// Get Matchup data
const getncaamatchupdataRequest = (state, action) => state.merge({ ...state, ncaaMatchupStatus: 'pending' })
const getncaamatchupdataSuccess = (state, action) =>
  state.merge({ ...state, ncaaMatchupStatus: 'done', ncaaMatchupData: action.ncaaMatchupData })
const getncaamatchupdataFailure = (state, action) => state.merge({ ...state, ncaaMatchupStatus: 'error' })

const getncaalastgamehomeRequest = (state, action) => state.merge({ ...state, ncaaLastGameHomeStatus: 'pending' })
const getncaalastgamehomeSuccess = (state, action) =>
  state.merge({ ...state, ncaaLastGameHomeStatus: 'done', ncaaLastGameHomeData: action.ncaaLastGameHomeData })
const getncaalastgamehomeFailure = (state, action) => state.merge({ ...state, ncaaLastGameHomeStatus: 'error' })

const getncaalastgameawayRequest = (state, action) => state.merge({ ...state, ncaaLastGameAwayStatus: 'pending' })
const getncaalastgameawaySuccess = (state, action) =>
  state.merge({ ...state, ncaaLastGameAwayStatus: 'done', ncaaLastGameAwayData: action.ncaaLastGameAwayData })
const getncaalastgameawayFailure = (state, action) => state.merge({ ...state, ncaaLastGameAwayStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Schedule data
  [NCAATypes.GETNCAASCHEDULEDATA_REQUEST]: getncaascheduledataRequest,
  [NCAATypes.GETNCAASCHEDULEDATA_SUCCESS]: getncaascheduledataSuccess,
  [NCAATypes.GETNCAASCHEDULEDATA_FAILURE]: getncaascheduledataFailure,

  // Get Standings data -- Conference, Teams
  [NCAATypes.GETNCAASTANDINGSCONF_REQUEST]: getncaastandingsconfRequest,
  [NCAATypes.GETNCAASTANDINGSCONF_SUCCESS]: getncaastandingsconfSuccess,
  [NCAATypes.GETNCAASTANDINGSCONF_FAILURE]: getncaastandingsconfFailure,

  [NCAATypes.GETNCAASTANDINGSTEAMS_REQUEST]: getncaastandingsteamsRequest,
  [NCAATypes.GETNCAASTANDINGSTEAMS_SUCCESS]: getncaastandingsteamsSuccess,
  [NCAATypes.GETNCAASTANDINGSTEAMS_FAILURE]: getncaastandingsteamsFailure,

  // Get Rankings data
  [NCAATypes.GETNCAARANKINGSDATA_REQUEST]: getncaarankingsdataRequest,
  [NCAATypes.GETNCAARANKINGSDATA_SUCCESS]: getncaarankingsdataSuccess,
  [NCAATypes.GETNCAARANKINGSDATA_FAILURE]: getncaarankingsdataFailure,

  // Get Futures data
  [NCAATypes.GETNCAAFUTURESDATA_REQUEST]: getncaafuturesdataRequest,
  [NCAATypes.GETNCAAFUTURESDATA_SUCCESS]: getncaafuturesdataSuccess,
  [NCAATypes.GETNCAAFUTURESDATA_FAILURE]: getncaafuturesdataFailure,

  // Get Matchup data
  [NCAATypes.GETNCAAMATCHUPDATA_REQUEST]: getncaamatchupdataRequest,
  [NCAATypes.GETNCAAMATCHUPDATA_SUCCESS]: getncaamatchupdataSuccess,
  [NCAATypes.GETNCAAMATCHUPDATA_FAILURE]: getncaamatchupdataFailure,

  [NCAATypes.GETNCAALASTGAMEHOME_REQUEST]: getncaalastgamehomeRequest,
  [NCAATypes.GETNCAALASTGAMEHOME_SUCCESS]: getncaalastgamehomeSuccess,
  [NCAATypes.GETNCAALASTGAMEHOME_FAILURE]: getncaalastgamehomeFailure,

  [NCAATypes.GETNCAALASTGAMEAWAY_REQUEST]: getncaalastgameawayRequest,
  [NCAATypes.GETNCAALASTGAMEAWAY_SUCCESS]: getncaalastgameawaySuccess,
  [NCAATypes.GETNCAALASTGAMEAWAY_FAILURE]: getncaalastgameawayFailure,
})
