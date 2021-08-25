import { put } from 'redux-saga/effects'
import GolfActions from '../actions/golf'
import firebaseService from '../services/firebaseService'

export function* getgolftourlistRequest(api, action) {
  const { year, id } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/golf/pga/${year}/tournamentList`)

  if (response) {
    let selectedTour = 0
    let newId = ''

    if (!id) {
      const preRes = yield firebaseService.prod.database.getDBData(`/sportRadarStore/golf/pga/${year}/tournaments`)

      if (preRes) {
        let ids = []
        for (var i in preRes) {
          ids.push({
            id: i,
            start_date: preRes[i].leaderboard.start_date,
            end_date: preRes[i].leaderboard.end_date,
          })
        }

        const sortedIds = ids
          .filter(
            s =>
              new Date(s.start_date).getTime() >= new Date().getTime() ||
              (new Date(s.start_date).getTime() <= new Date().getTime() &&
                new Date(s.end_date).getTime() >= new Date().getTime()) ||
              (new Date(s.end_date).getTime() <= new Date().getTime() &&
                new Date(s.end_date).getTime() + 3600000 * 72 >= new Date().getTime()),
          )
          .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

        if (sortedIds.length > 0) {
          newId = sortedIds[0].id
        }
      }
    } else {
      newId = id
    }

    response.some((conf, index) => {
      if (conf.id === newId) {
        selectedTour = index
        return true
      }
    })

    const data = {
      tourList: response,
      selectedTour: selectedTour,
    }

    yield put(GolfActions.getgolftourlistSuccess(data))
  } else {
    yield put(GolfActions.getgolftourlistFailure())
  }
}

export function* getgolfleaderboardRequest(api, action) {
  const { id, year } = action
  let tourId = ''

  if (!id) {
    const preRes = yield firebaseService.prod.database.getDBData(`/sportRadarStore/golf/pga/${year}/tournamentList/0`)
    tourId = preRes.id
  } else {
    tourId = id
  }

  const response = yield firebaseService.prod.database.getDBMultipleData([
    {
      key: 'players',
      path: `/sportRadarStore/golf/pga/${year}/tournaments/${tourId}/leaderboard/leaderboard`,
    },
    {
      key: 'summary',
      path: `sportRadarStore/golf/pga/${year}/tournaments/${tourId}/summary`,
    },
  ])

  if (response) {
    yield put(GolfActions.getgolfleaderboardSuccess(response))
  } else {
    yield put(GolfActions.getgolfleaderboardFailure())
  }
}

export function* getgolfscheduleRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/golf/pga/${year}/schedule`)

  if (response) {
    yield put(GolfActions.getgolfscheduleSuccess(response))
  } else {
    yield put(GolfActions.getgolfscheduleFailure())
  }
}

export function* getgolfrankinglistRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/golf/pga/${year}/rankings`)

  if (response) {
    yield put(GolfActions.getgolfrankinglistSuccess(response))
  } else {
    yield put(GolfActions.getgolfrankinglistFailure())
  }
}

export function* getgolfoddsRequest(api, action) {
  const response = yield firebaseService.prod.database.getDBData(
    `sportRadarStore/odds/mappings/categoryRights/sr-category-28/outrights`,
  )

  if (response) {
    yield put(GolfActions.getgolfoddsSuccess(response))
  } else {
    yield put(GolfActions.getgolfoddsFailure())
  }
}

export function* getgolfplayerstatsRequest(api, action) {
  const { id, year } = action
  const response = yield firebaseService.prod.database.getDBMultipleData([
    {
      key: 'stats',
      path: `sportRadarStore/golf/pga/${year}/statistics/playersById/${id}`,
    },
    {
      key: 'profile',
      path: `sportRadarStore/golf/pga/${year}/playerProfiles/playersById/${id}`,
    },
  ])

  if (response) {
    yield put(GolfActions.getgolfplayerstatsSuccess(response))
  } else {
    yield put(GolfActions.getgolfplayerstatsFailure())
  }
}

export function* getgolfplayertournamentRequest(api, action) {
  const { id, year } = action
  let response: object

  const tourData = yield firebaseService.prod.database.getDBMultipleData(
    [
      {
        path: `sportRadarStore/golf/pga/${year}/playerTournamentResults/${id}`,
      },
      {
        path: `sportRadarStore/golf/pga/${year}/playerTournamentTeeTimes/${id}`,
      },
    ],
    'push',
  )

  if (tourData) {
    const tours = tourData[0]
    const teetimes = tourData[1]

    //Load recent 4 tour details
    let recentToursIds = Object.keys(tours)
      .sort((a, b) => {
        let result = 0
        try {
          if (teetimes[b][1] && teetimes[a][1])
            result = new Date(teetimes[b][1].teetimes.tee_time) - new Date(teetimes[a][1].teetimes.tee_time)
        } catch (e) {
          console.log(e)
        }
        return result
      })
      .slice(0, 4)

    const recentReqs = []
    recentToursIds.forEach(tour => {
      recentReqs.push({
        path: `sportRadarStore/golf/pga/${year}/tournaments/${tour}/skinnyLeaderboard/summary`,
      })
      recentReqs.push({
        path: `sportRadarStore/golf/pga/${year}/tournaments/${tour}/leaderboard/leaderboardById/${id}`,
      })
      recentReqs.push({
        path: `sportRadarStore/golf/pga/${year}/tournaments/${tour}/leaderboard/leaderboard/0`,
      })
    })

    const recentResults = yield firebaseService.prod.database.getDBMultipleData(recentReqs, 'push')
    const recentTours = []

    for (let i = 0; i < recentToursIds.length; i++) {
      recentTours.push({
        summary: recentResults[i * 3],
        player: recentResults[i * 3 + 1],
        winner: recentResults[i * 3 + 2],
        id: recentToursIds[i],
      })
    }

    response = {
      recent: recentTours,
    }
  }

  if (response) {
    yield put(GolfActions.getgolfplayertournamentSuccess(response))
  } else {
    yield put(GolfActions.getgolfplayertournamentFailure())
  }
}
