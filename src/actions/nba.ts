import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get Schedule data
  getnbastandingsRequest: ['year'],
  getnbastandingsSuccess: ['nbaStandingsData'],
  getnbastandingsFailure: null,

  // Get Summary data
  getnbasummaryRequest: ['ids'],
  getnbasummarySuccess: ['nbaSummaryData'],
  getnbasummaryFailure: null,

  // Get Standings data
  getnbascheduleRequest: ['date'],
  getnbascheduleSuccess: ['nbaScheduleData'],
  getnbascheduleFailure: null,

  // Get Matchup Game from ID
  getnbamatchupgameRequest: ['id'],
  getnbamatchupgameSuccess: ['nbaMatchupGame'],
  getnbamatchupgameFailure: null,

  // Get Teams data in Matchup Game
  getnbamatchupteamsRequest: ['awayId', 'homeId'],
  getnbamatchupteamsSuccess: ['nbaMatchupTeams'],
  getnbamatchupteamsFailure: null,
})

export const NBATypes = Types
export default Creators
