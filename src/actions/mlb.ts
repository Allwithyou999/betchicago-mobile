import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get Scoreboard data
  getmlbscoreboarddataRequest: ['date'],
  getmlbscoreboarddataSuccess: ['mlbScoreboardData'],
  getmlbscoreboarddataFailure: null,

  // Get Scoreboard odds data
  getmlbscoreboardoddsRequest: ['date'],
  getmlbscoreboardoddsSuccess: ['mlbScoreboardOdds'],
  getmlbscoreboardoddsFailure: null,

  // Get Matchup
  getmlbmatchupdataRequest: ['id'],
  getmlbmatchupdataSuccess: ['mlbMatchupData'],
  getmlbmatchupdataFailure: null,

  // Get Matchup - away team stats
  getmlbawayteamstatsRequest: ['id'],
  getmlbawayteamstatsSuccess: ['mlbAwayTeamStats'],
  getmlbawayteamstatsFailure: null,

  // Get Matchup - home team stats
  getmlbhometeamstatsRequest: ['id'],
  getmlbhometeamstatsSuccess: ['mlbHomeTeamStats'],
  getmlbhometeamstatsFailure: null,

  // Get Standings ----- all
  getmlbteamslugsRequest: null,
  getmlbteamslugsSuccess: ['mlbSlugs'],
  getmlbteamslugsFailure: null,

  // Get Schedule data
  getmlbscheduledataRequest: ['date'],
  getmlbscheduledataSuccess: ['mlbScheduleData'],
  getmlbscheduledataFailure: null,

  // Get Standings Data
  getmlbstandingsRequest: ['year'],
  getmlbstandingsSuccess: ['mlbStandingsData'],
  getmlbstandingsFailure: null,

  // Get Odds data
  getmlboddsRequest: ['date'],
  getmlboddsSuccess: ['mlbOdds'],
  getmlboddsFailure: null,

  // Get Odds Scoreboard data
  getmlboddsscoreboardRequest: ['date'],
  getmlboddsscoreboardSuccess: ['mlbOddsScoreboardData'],
  getmlboddsscoreboardFailure: null,

  // Get Teams AP Article
  getmlbteamsarticleRequest: ['tag', 'length'],
  getmlbteamsarticleSuccess: ['mlbTeamsArticle'],
  getmlbteamsarticleFailure: null,
})

export const MLBTypes = Types
export default Creators
