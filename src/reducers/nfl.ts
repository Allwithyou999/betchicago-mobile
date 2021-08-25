import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { NFLTypes } from '../actions/nfl'

const initialState = Immutable({
  scheduleStatus: '', // done, pending, error
  standingsStatus: '', // done, pending, error
  oddsStatus: '',
  scheduleData: [],
  standingsData: [],
})

// Get Schedule data
const getscheduledataRequest = (state, action) => state.merge({ ...state, scheduleStatus: 'pending' })
const getscheduledataSuccess = (state, action) =>
  state.merge({ ...state, scheduleStatus: 'done', scheduleData: action.scheduleData })
const getscheduledataFailure = (state, action) => state.merge({ ...state, scheduleStatus: 'error' })

// Get Standings data
const getstandingsdataRequest = (state, action) => state.merge({ ...state, standingsStatus: 'pending' })
const getstandingsdataSuccess = (state, action) =>
  state.merge({ ...state, standingsStatus: 'done', standingsData: action.standingsData })
const getstandingsdataFailure = (state, action) => state.merge({ ...state, standingsStatus: 'error' })

// Get Odds data
const getnflfutureoddsReqeust = (state, action) => state.merge({ ...state, oddsStatus: 'pending' })
const getnflfutureoddsSuccess = (state, action) =>
  state.merge({ ...state, oddsStatus: 'done', oddsData: action.standingsData })
const getnflfutureoddsFailure = (state, action) => state.merge({ ...state, oddsStatus: 'error' })

// Get NFL Team data
const getnflteamdataRequest = (state, action) => state.merge({ ...state, teamStatus: 'pending' })
const getnflteamdataSuccess = (state, action) =>
  state.merge({ ...state, teamStatus: 'done', teamData: action.teamData })
const getnflteamdataFailure = (state, action) => state.merge({ ...state, teamStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Schedule data
  [NFLTypes.GETSCHEDULEDATA_REQUEST]: getscheduledataRequest,
  [NFLTypes.GETSCHEDULEDATA_SUCCESS]: getscheduledataSuccess,
  [NFLTypes.GETSCHEDULEDATA_FAILURE]: getscheduledataFailure,

  // Get Standings data
  [NFLTypes.GETSTANDINGSDATA_REQUEST]: getstandingsdataRequest,
  [NFLTypes.GETSTANDINGSDATA_SUCCESS]: getstandingsdataSuccess,
  [NFLTypes.GETSTANDINGSDATA_FAILURE]: getstandingsdataFailure,

  // Get NFL Team data
  [NFLTypes.GETNFLTEAMDATA_REQUEST]: getnflteamdataRequest,
  [NFLTypes.GETNFLTEAMDATA_SUCCESS]: getnflteamdataSuccess,
  [NFLTypes.GETNFLTEAMDATA_FAILURE]: getnflteamdataFailure,
})
