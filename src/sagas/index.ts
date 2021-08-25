import { takeLatest, all, takeEvery } from 'redux-saga/effects'

/**
 * Types of actions
 */
import { AppTypes } from '../actions/app'
import { AuthTypes } from '../actions/auth'
import { NFLTypes } from '../actions/nfl'
import { NewsTypes } from '../actions/news'
import { GolfTypes } from '../actions/golf'
import { MLBTypes } from '../actions/mlb'
import { NCAATypes } from '../actions/ncaa'
import { NBATypes } from '../actions/nba'

/**
 * Sagas
 */
import { getnavbarRequest, getpickscarouselRequest, getarticlesRequest } from './app'
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  getprofileRequest,
  updateprofileRequest,
  getsavedarticlesRequest,
  forgotpasswordRequest,
} from './auth'
import { getscheduledataRequest, getstandingsdataRequest, getnflfutureoddsReqeust, getnflteamdataRequest } from './nfl'
import { getnewspinsRequest, getnewsRequest } from './news'
import {
  getgolftourlistRequest,
  getgolfleaderboardRequest,
  getgolfscheduleRequest,
  getgolfrankinglistRequest,
  getgolfoddsRequest,
  getgolfplayerstatsRequest,
  getgolfplayertournamentRequest,
} from './golf'
import {
  getmlbscoreboarddataRequest,
  getmlbscoreboardoddsRequest,
  getmlbmatchupdataRequest,
  getmlbawayteamstatsRequest,
  getmlbhometeamstatsRequest,
  getmlbteamslugsRequest,
  getmlbscheduledataRequest,
  getmlbstandingsRequest,
  getmlboddsRequest,
  getmlboddsscoreboardRequest,
  getmlbteamsarticleRequest,
} from './mlb'
import {
  getncaascheduledataRequest,
  getncaastandingsconfRequest,
  getncaastandingsteamsRequest,
  getncaarankingsdataRequest,
  getncaafuturesdataRequest,
  getncaamatchupdataRequest,
  getncaalastgamehomeRequest,
  getncaalastgameawayRequest,
} from './ncaa'
import {
  getnbascheduleRequest,
  getnbasummaryRequest,
  getnbastandingsRequest,
  getnbamatchupgameRequest,
  getnbamatchupteamsRequest,
} from './nba'

/**
 * API
 */
// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = () => {}

/**
 * Connect Types to Sagas
 */
export default function* root() {
  yield all([
    // Auth
    takeLatest(AuthTypes.LOGIN_REQUEST, loginRequest),
    takeLatest(AuthTypes.REGISTER_REQUEST, registerRequest),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logoutRequest),
    takeLatest(AuthTypes.GETPROFILE_REQUEST, getprofileRequest),
    takeLatest(AuthTypes.GETSAVEDARTICLES_REQUEST, getsavedarticlesRequest),
    takeLatest(AuthTypes.UPDATEPROFILE_REQUEST, updateprofileRequest),
    takeLatest(AuthTypes.FORGOTPASSWORD_REQUEST, forgotpasswordRequest),
    // Latest
    takeLatest(AppTypes.GETNAVBAR_REQUEST, getnavbarRequest, api),
    takeLatest(AppTypes.GETPICKSCAROUSEL_REQUEST, getpickscarouselRequest, api),
    takeLatest(AppTypes.GETARTICLES_REQUEST, getarticlesRequest, api),
    // NFL
    takeLatest(NFLTypes.GETSCHEDULEDATA_REQUEST, getscheduledataRequest, api),
    takeLatest(NFLTypes.GETSTANDINGSDATA_REQUEST, getstandingsdataRequest, api),
    takeLatest(NFLTypes.GETNFLFUTUREODDS_REQUEST, getnflfutureoddsReqeust),
    takeLatest(NFLTypes.GETNFLTEAMDATA_REQUEST, getnflteamdataRequest, api),
    // News
    takeEvery(NewsTypes.GETNEWSPINS_REQUEST, getnewspinsRequest, api),
    takeEvery(NewsTypes.GETNEWS_REQUEST, getnewsRequest, api),
    // Golf
    takeLatest(GolfTypes.GETGOLFTOURLIST_REQUEST, getgolftourlistRequest, api),
    takeLatest(GolfTypes.GETGOLFLEADERBOARD_REQUEST, getgolfleaderboardRequest, api),
    takeLatest(GolfTypes.GETGOLFSCHEDULE_REQUEST, getgolfscheduleRequest, api),
    takeLatest(GolfTypes.GETGOLFRANKINGLIST_REQUEST, getgolfrankinglistRequest, api),
    takeLatest(GolfTypes.GETGOLFODDS_REQUEST, getgolfoddsRequest, api),
    takeLatest(GolfTypes.GETGOLFPLAYERSTATS_REQUEST, getgolfplayerstatsRequest, api),
    takeLatest(GolfTypes.GETGOLFPLAYERTOURNAMENT_REQUEST, getgolfplayertournamentRequest, api),
    // MLB
    takeLatest(MLBTypes.GETMLBSCOREBOARDDATA_REQUEST, getmlbscoreboarddataRequest, api),
    takeLatest(MLBTypes.GETMLBSCOREBOARDODDS_REQUEST, getmlbscoreboardoddsRequest, api),
    takeLatest(MLBTypes.GETMLBMATCHUPDATA_REQUEST, getmlbmatchupdataRequest, api),
    takeLatest(MLBTypes.GETMLBAWAYTEAMSTATS_REQUEST, getmlbawayteamstatsRequest, api),
    takeLatest(MLBTypes.GETMLBHOMETEAMSTATS_REQUEST, getmlbhometeamstatsRequest, api),
    takeLatest(MLBTypes.GETMLBTEAMSLUGS_REQUEST, getmlbteamslugsRequest, api),
    takeLatest(MLBTypes.GETMLBSCHEDULEDATA_REQUEST, getmlbscheduledataRequest, api),
    takeLatest(MLBTypes.GETMLBSTANDINGS_REQUEST, getmlbstandingsRequest, api),
    takeLatest(MLBTypes.GETMLBODDS_REQUEST, getmlboddsRequest, api),
    takeLatest(MLBTypes.GETMLBODDSSCOREBOARD_REQUEST, getmlboddsscoreboardRequest, api),
    takeLatest(MLBTypes.GETMLBTEAMSARTICLE_REQUEST, getmlbteamsarticleRequest, api),
    // NCAA
    takeLatest(NCAATypes.GETNCAASCHEDULEDATA_REQUEST, getncaascheduledataRequest, api),
    takeLatest(NCAATypes.GETNCAASTANDINGSCONF_REQUEST, getncaastandingsconfRequest, api),
    takeLatest(NCAATypes.GETNCAASTANDINGSTEAMS_REQUEST, getncaastandingsteamsRequest, api),
    takeLatest(NCAATypes.GETNCAARANKINGSDATA_REQUEST, getncaarankingsdataRequest, api),
    takeLatest(NCAATypes.GETNCAAFUTURESDATA_REQUEST, getncaafuturesdataRequest, api),
    takeLatest(NCAATypes.GETNCAAMATCHUPDATA_REQUEST, getncaamatchupdataRequest, api),
    takeLatest(NCAATypes.GETNCAALASTGAMEHOME_REQUEST, getncaalastgamehomeRequest, api),
    takeLatest(NCAATypes.GETNCAALASTGAMEAWAY_REQUEST, getncaalastgameawayRequest, api),
    // NBA
    takeLatest(NBATypes.GETNBASCHEDULE_REQUEST, getnbascheduleRequest, api),
    takeLatest(NBATypes.GETNBASUMMARY_REQUEST, getnbasummaryRequest, api),
    takeLatest(NBATypes.GETNBASTANDINGS_REQUEST, getnbastandingsRequest, api),
    takeLatest(NBATypes.GETNBAMATCHUPGAME_REQUEST, getnbamatchupgameRequest, api),
    takeLatest(NBATypes.GETNBAMATCHUPTEAMS_REQUEST, getnbamatchupteamsRequest, api),
  ])
}
