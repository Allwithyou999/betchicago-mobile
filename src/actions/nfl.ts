import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get nfl schedule
  getscheduledataRequest: ['year'],
  getscheduledataSuccess: ['scheduleData'],
  getscheduledataFailure: null,

  // Get nfl standings
  getstandingsdataRequest: ['year'],
  getstandingsdataSuccess: ['standingsData'],
  getstandingsdataFailure: null,

  // Get nfl future odds
  getnflfutureoddsRequest: null,
  getnflfutureoddsSuccess: null,
  getnflfutureoddsFailure: null,

  // Get nfl team data - popup
  getnflteamdataRequest: ['id'],
  getnflteamdataSuccess: ['teamData'],
  getnflteamdataFailure: null,
})

export const NFLTypes = Types
export default Creators
