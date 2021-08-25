import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { merge } from 'ramda'
import { NBATypes } from '../actions/nba'

const initialState = Immutable({
  nbaScheduleStatus: '', // done, pending, error
  nbaSummaryStatus: '', // done, pending, error
  nbaStandingsStatus: '', // done, pending, error
  nbaMatchupGameStatus: '',
  nbaMatchupTeamsStatus: '',
  nbaScheduleData: [],
  nbaSummaryData: [],
  nbaStandingsData: [],
  nbaMatchupGame: [],
  nbaMatchupTeams: [],
})

// Get Schedule data
const getnbascheduleRequest = (state, action) => state.merge({ ...state, nbaScheduleStatus: 'pending' })
const getnbascheduleSuccess = (state, action) => {
  const nbaScheduleData = merge(state.nbaScheduleData, action.nbaScheduleData)
  return state.merge({ ...state, nbaScheduleStatus: 'done', nbaScheduleData })
}
const getnbascheduleFailure = (state, action) => state.merge({ ...state, nbaScheduleStatus: 'error' })

// Get Summary data
const getnbasummaryRequest = (state, action) => state.merge({ ...state, nbaSummaryStatus: 'pending' })
const getnbasummarySuccess = (state, action) =>
  state.merge({ ...state, nbaSummaryStatus: 'done', nbaSummaryData: action.nbaSummaryData })
const getnbasummaryFailure = (state, action) => state.merge({ ...state, nbaSummaryStatus: 'error' })

// Get Standings data
const getnbastandingsRequest = (state, action) => state.merge({ ...state, nbaStandingsStatus: 'pending' })
const getnbastandingsSuccess = (state, action) =>
  state.merge({ ...state, nbaStandingsStatus: 'done', nbaStandingsData: action.nbaStandingsData })
const getnbastandingsFailure = (state, action) => state.merge({ ...state, nbaStandingsStatus: 'error' })

// Get Matchup Game from ID
const getnbamatchupgameRequest = (state, action) => state.merge({ ...state, nbaMatchupGameStatus: 'pending' })
const getnbamatchupgameSuccess = (state, action) =>
  state.merge({ ...state, nbaMatchupGameStatus: 'done', nbaMatchupGame: action.nbaMatchupGame })
const getnbamatchupgameFailure = (state, action) => state.merge({ ...state, nbaMatchupGameStatus: 'error' })

// Get Teams data in Matchup Game
const getnbamatchupteamsRequest = (state, action) => state.merge({ ...state, nbaMatchupTeamsStatus: 'pending' })
const getnbamatchupteamsSuccess = (state, action) =>
  state.merge({ ...state, nbaMatchupTeamsStatus: 'done', nbaMatchupTeams: action.nbaMatchupTeams })
const getnbamatchupteamsFailure = (state, action) => state.merge({ ...state, nbaMatchupTeamsStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Schedule data
  [NBATypes.GETNBASCHEDULE_REQUEST]: getnbascheduleRequest,
  [NBATypes.GETNBASCHEDULE_SUCCESS]: getnbascheduleSuccess,
  [NBATypes.GETNBASCHEDULE_FAILURE]: getnbascheduleFailure,

  // Get Summary data
  [NBATypes.GETNBASUMMARY_REQUEST]: getnbasummaryRequest,
  [NBATypes.GETNBASUMMARY_SUCCESS]: getnbasummarySuccess,
  [NBATypes.GETNBASUMMARY_FAILURE]: getnbasummaryFailure,

  // Get Standings data
  [NBATypes.GETNBASTANDINGS_REQUEST]: getnbastandingsRequest,
  [NBATypes.GETNBASTANDINGS_SUCCESS]: getnbastandingsSuccess,
  [NBATypes.GETNBASTANDINGS_FAILURE]: getnbastandingsFailure,

  // Get Matchup Game
  [NBATypes.GETNBAMATCHUPGAME_REQUEST]: getnbamatchupgameRequest,
  [NBATypes.GETNBAMATCHUPGAME_SUCCESS]: getnbamatchupgameSuccess,
  [NBATypes.GETNBAMATCHUPGAME_FAILURE]: getnbamatchupgameFailure,

  // Get Teams data
  [NBATypes.GETNBAMATCHUPTEAMS_REQUEST]: getnbamatchupteamsRequest,
  [NBATypes.GETNBAMATCHUPTEAMS_SUCCESS]: getnbamatchupteamsSuccess,
  [NBATypes.GETNBAMATCHUPTEAMS_FAILURE]: getnbamatchupteamsFailure,
})
