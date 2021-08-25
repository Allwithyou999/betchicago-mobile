import { put } from 'redux-saga/effects'
import NBAActions from '../actions/nba'
import { FormatDate, FormatAMPM } from '../services'
import firebaseService from '../services/firebaseService'

export function* getnbascheduleRequest(api, action) {
  const { date } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/nba/daily/${date}/schedule/games`)

  if (response) {
    const data = []
    data[date] = response
    yield put(NBAActions.getnbascheduleSuccess(data))
  } else {
    yield put(NBAActions.getnbascheduleFailure())
  }
}

export function* getnbasummaryRequest(api, action) {
  const { ids } = action
  let paths = []

  ids.map(id => {
    paths.push({
      key: id,
      path: `/sportRadarStore/nba/games/${id}/boxscore`,
    })
  })

  const response = yield firebaseService.prod.database.getDBMultipleData(paths, 'key')

  if (response) {
    yield put(NBAActions.getnbasummarySuccess(response))
  } else {
    yield put(NBAActions.getnbasummaryFailure())
  }
}

export function* getnbastandingsRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(
    `/sportRadarStore/nba/year/${year}/REG/standings/conferences`,
  )

  if (response) {
    yield put(NBAActions.getnbastandingsSuccess(response))
  } else {
    yield put(NBAActions.getnbastandingsFailure())
  }
}

export function* getnbamatchupgameRequest(api, action) {
  const { id } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/nba/games/${id}`)

  if (response) {
    yield put(NBAActions.getnbamatchupgameSuccess(response))
  } else {
    yield put(NBAActions.getnbamatchupgameFailure())
  }
}

export function* getnbamatchupteamsRequest(api, action) {
  const { awayId, homeId } = action
  const paths = [
    {
      key: 'awayData',
      path: `/sportRadarStore/nba/year/2018/REG/teams/${awayId}`,
    },
    {
      key: 'homeData',
      path: `/sportRadarStore/nba/year/2018/REG/teams/${homeId}`,
    },
    {
      key: 'awayProfile',
      path: `/sportRadarStore/nba/teams/${awayId}/profile`,
    },
    {
      key: 'homeProfile',
      path: `/sportRadarStore/nba/teams/${homeId}/profile`,
    },
  ]
  const response = yield firebaseService.prod.database.getDBMultipleData(paths, 'key')

  if (response) {
    yield put(NBAActions.getnbamatchupteamsSuccess(response))
  } else {
    yield put(NBAActions.getnbamatchupteamsFailure())
  }
}
