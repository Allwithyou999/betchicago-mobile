import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { merge } from 'ramda'
import { MLBTypes } from '../actions/mlb'

const initialState = Immutable({
  mlbScoreboardDataStatus: '', // done, pending, error
  mlbScoreboardOddsStatus: '', // done, pending, error
  mlbMatchupDataStatus: '', // done, pending, error
  mlbAwayTeamStatsStatus: '', // done, pending, error
  mlbHomeTeamStatsStatus: '', // done, pending, error
  mlbTeamSlugsStatus: '', // done, pending, error
  mlbScheduleDataStatus: '', // done, pending, error
  mlbStandingsStatus: '', // done, pending, error
  mlbOddsStatus: '', // done, pending, error
  mlbOddsScoreboardStatus: '', // done, pending, error
  mlbTeamsArticleStatus: '', // done, pending, error
  mlbScoreboardData: [],
  mlbScoreboardOdds: [],
  mlbMatchupData: [],
  mlbAwayTeamStats: [],
  mlbHomeTeamStats: [],
  mlbSlugs: [],
  mlbScheduleData: [],
  mlbStandingsData: [],
  mlbOdds: [],
  mlbOddsScoreboardData: [],
  mlbTeamsArticle: [],
})

// Get Scoreboard Data
const getmlbscoreboarddataRequest = (state, action) => state.merge({ ...state, mlbScoreboardDataStatus: 'pending' })
const getmlbscoreboarddataSuccess = (state, action) => {
  const mlbScoreboardData = merge(state.mlbScoreboardData, action.mlbScoreboardData)
  return state.merge({ ...state, mlbScoreboardDataStatus: 'done', mlbScoreboardData })
}
const getmlbscoreboarddataFailure = (state, action) => state.merge({ ...state, mlbScoreboardDataStatus: 'error' })

// Get Scoreboard Odds Data
const getmlbscoreboardoddsRequest = (state, action) => state.merge({ ...state, mlbScoreboardOddsStatus: 'pending' })
const getmlbscoreboardoddsSuccess = (state, action) => {
  const mlbScoreboardOdds = merge(state.mlbScoreboardOdds, action.mlbScoreboardOdds)
  return state.merge({ ...state, mlbScoreboardOddsStatus: 'done', mlbScoreboardOdds })
}
const getmlbscoreboardoddsFailure = (state, action) => state.merge({ ...state, mlbScoreboardOddsStatus: 'error' })

// Get Matchup Data
const getmlbmatchupdataRequest = (state, action) => state.merge({ ...state, mlbMatchupDataStatus: 'pending' })
const getmlbmatchupdataSuccess = (state, action) =>
  state.merge({ ...state, mlbMatchupDataStatus: 'done', mlbMatchupData: action.mlbMatchupData })
const getmlbmatchupdataFailure = (state, action) => state.merge({ ...state, mlbMatchupDataStatus: 'error' })

// Get Matchup away team stats
const getmlbawayteamstatsRequest = (state, action) => state.merge({ ...state, mlbAwayTeamStatsStatus: 'pending' })
const getmlbawayteamstatsSuccess = (state, action) =>
  state.merge({ ...state, mlbAwayTeamStatsStatus: 'done', mlbAwayTeamStats: action.mlbAwayTeamStats })
const getmlbawayteamstatsFailure = (state, action) => state.merge({ ...state, mlbAwayTeamStatsStatus: 'error' })

// Get Matchup home team stats
const getmlbhometeamstatsRequest = (state, action) => state.merge({ ...state, mlbHomeTeamStatsStatus: 'pending' })
const getmlbhometeamstatsSuccess = (state, action) =>
  state.merge({ ...state, mlbHomeTeamStatsStatus: 'done', mlbHomeTeamStats: action.mlbHomeTeamStats })
const getmlbhometeamstatsFailure = (state, action) => state.merge({ ...state, mlbHomeTeamStatsStatus: 'error' })

// Get Team Slugs ---- all
const getmlbteamslugsRequest = (state, action) => state.merge({ ...state, mlbTeamSlugsStatus: 'pending' })
const getmlbteamslugsSuccess = (state, action) =>
  state.merge({ ...state, mlbTeamSlugsStatus: 'done', mlbSlugs: action.mlbSlugs })
const getmlbteamslugsFailure = (state, action) => state.merge({ ...state, mlbTeamSlugsStatus: 'error' })

// Get Schedule Data
const getmlbscheduledataRequest = (state, action) => state.merge({ ...state, mlbScheduleDataStatus: 'pending' })
const getmlbscheduledataSuccess = (state, action) =>
  state.merge({ ...state, mlbScheduleDataStatus: 'done', mlbScheduleData: action.mlbScheduleData })
const getmlbscheduledataFailure = (state, action) => state.merge({ ...state, mlbScheduleDataStatus: 'error' })

// Get Standings Data
const getmlbstandingsRequest = (state, action) => state.merge({ ...state, mlbStandingsStatus: 'pending' })
const getmlbstandingsSuccess = (state, action) =>
  state.merge({ ...state, mlbStandingsStatus: 'done', mlbStandingsData: action.mlbStandingsData })
const getmlbstandingsFailure = (state, action) => state.merge({ ...state, mlbStandingsStatus: 'error' })

// Get Odds Data
const getmlboddsRequest = (state, action) => state.merge({ ...state, mlbOddsStatus: 'pending' })
const getmlboddsSuccess = (state, action) => state.merge({ ...state, mlbOddsStatus: 'done', mlbOdds: action.mlbOdds })
const getmlboddsFailure = (state, action) => state.merge({ ...state, mlbOddsStatus: 'error' })

// Get Odds Scoreboard Data
const getmlboddsscoreboardRequest = (state, action) => state.merge({ ...state, mlbOddsScoreboardStatus: 'pending' })
const getmlboddsscoreboardSuccess = (state, action) =>
  state.merge({ ...state, mlbOddsScoreboardStatus: 'done', mlbOddsScoreboardData: action.mlbOddsScoreboardData })
const getmlboddsscoreboardFailure = (state, action) => state.merge({ ...state, mlbOddsScoreboardStatus: 'error' })

// Get Teams AP Article
const getmlbteamsarticleRequest = (state, action) => state.merge({ ...state, mlbTeamsArticleStatus: 'pending' })
const getmlbteamsarticleSuccess = (state, action) =>
  state.merge({ ...state, mlbTeamsArticleStatus: 'done', mlbTeamsArticle: action.mlbTeamsArticle })
const getmlbteamsarticleFailure = (state, action) => state.merge({ ...state, mlbTeamsArticleStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Scoreboard data
  [MLBTypes.GETMLBSCOREBOARDDATA_REQUEST]: getmlbscoreboarddataRequest,
  [MLBTypes.GETMLBSCOREBOARDDATA_SUCCESS]: getmlbscoreboarddataSuccess,
  [MLBTypes.GETMLBSCOREBOARDDATA_FAILURE]: getmlbscoreboarddataFailure,

  // Get Scoreboard Odds data
  [MLBTypes.GETMLBSCOREBOARDODDS_REQUEST]: getmlbscoreboardoddsRequest,
  [MLBTypes.GETMLBSCOREBOARDODDS_SUCCESS]: getmlbscoreboardoddsSuccess,
  [MLBTypes.GETMLBSCOREBOARDODDS_FAILURE]: getmlbscoreboardoddsFailure,

  // Get Matchup data
  [MLBTypes.GETMLBMATCHUPDATA_REQUEST]: getmlbmatchupdataRequest,
  [MLBTypes.GETMLBMATCHUPDATA_SUCCESS]: getmlbmatchupdataSuccess,
  [MLBTypes.GETMLBMATCHUPDATA_FAILURE]: getmlbmatchupdataFailure,

  // Get Matchup away team
  [MLBTypes.GETMLBAWAYTEAMSTATS_REQUEST]: getmlbawayteamstatsRequest,
  [MLBTypes.GETMLBAWAYTEAMSTATS_SUCCESS]: getmlbawayteamstatsSuccess,
  [MLBTypes.GETMLBAWAYTEAMSTATS_FAILURE]: getmlbawayteamstatsFailure,

  // Get Matchup home team
  [MLBTypes.GETMLBHOMETEAMSTATS_REQUEST]: getmlbhometeamstatsRequest,
  [MLBTypes.GETMLBHOMETEAMSTATS_SUCCESS]: getmlbhometeamstatsSuccess,
  [MLBTypes.GETMLBHOMETEAMSTATS_FAILURE]: getmlbhometeamstatsFailure,

  // Get Team Slugs ----- all
  [MLBTypes.GETMLBTEAMSLUGS_REQUEST]: getmlbteamslugsRequest,
  [MLBTypes.GETMLBTEAMSLUGS_SUCCESS]: getmlbteamslugsSuccess,
  [MLBTypes.GETMLBTEAMSLUGS_FAILURE]: getmlbteamslugsFailure,

  // Get Schedule data
  [MLBTypes.GETMLBSCHEDULEDATA_REQUEST]: getmlbscheduledataRequest,
  [MLBTypes.GETMLBSCHEDULEDATA_SUCCESS]: getmlbscheduledataSuccess,
  [MLBTypes.GETMLBSCHEDULEDATA_FAILURE]: getmlbscheduledataFailure,

  // Get Standings Data
  [MLBTypes.GETMLBSTANDINGS_REQUEST]: getmlbstandingsRequest,
  [MLBTypes.GETMLBSTANDINGS_SUCCESS]: getmlbstandingsSuccess,
  [MLBTypes.GETMLBSTANDINGS_FAILURE]: getmlbstandingsFailure,

  // Get Odds
  [MLBTypes.GETMLBODDS_REQUEST]: getmlboddsRequest,
  [MLBTypes.GETMLBODDS_SUCCESS]: getmlboddsSuccess,
  [MLBTypes.GETMLBODDS_FAILURE]: getmlboddsFailure,

  // Get Odds Scoreboard Data
  [MLBTypes.GETMLBODDSSCOREBOARD_REQUEST]: getmlboddsscoreboardRequest,
  [MLBTypes.GETMLBODDSSCOREBOARD_SUCCESS]: getmlboddsscoreboardSuccess,
  [MLBTypes.GETMLBODDSSCOREBOARD_FAILURE]: getmlboddsscoreboardFailure,

  // Get Teams AP Article
  [MLBTypes.GETMLBTEAMSARTICLE_REQUEST]: getmlbteamsarticleRequest,
  [MLBTypes.GETMLBTEAMSARTICLE_SUCCESS]: getmlbteamsarticleSuccess,
  [MLBTypes.GETMLBTEAMSARTICLE_FAILURE]: getmlbteamsarticleFailure,
})
