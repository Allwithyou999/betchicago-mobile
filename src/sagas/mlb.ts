import { put } from 'redux-saga/effects'
import MLBActions from '../actions/mlb'
import firebaseService from '../services/firebaseService'
import { FormatDateFull } from '../services'
import { getDataFromAPI } from '../services/api'

export function* getmlbscoreboarddataRequest(api, action) {
  const { date } = action
  const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/mlb/daily/${date}/boxscore`)

  if (response) {
    const data = []
    data[date] = response
    yield put(MLBActions.getmlbscoreboarddataSuccess(data))
  } else {
    yield put(MLBActions.getmlbscoreboarddataFailure())
  }
}

export function* getmlbscoreboardoddsRequest(api, action) {
  const { date } = action
  let tomorrow = new Date(date)
  let today = FormatDateFull(date, true)
  let tomorrow1 = tomorrow.setDate(tomorrow.getDate() + 1)
  let tomorrow2 = FormatDateFull(new Date(tomorrow1), true)

  const response = yield firebaseService.prod.database.getDBMultipleData(
    [
      {
        path: `sportRadarStore/odds/dailyScheduleBySport/3/${today}/sport_events`,
      },
      {
        path: `sportRadarStore/odds/dailyScheduleBySport/3/${tomorrow2}/sport_events`,
      },
    ],
    'concat',
  )

  if (response) {
    const data = []
    data[FormatDateFull(date)] = response
    yield put(MLBActions.getmlbscoreboardoddsSuccess(data))
  } else {
    yield put(MLBActions.getmlbscoreboardoddsFailure())
  }
}

export function* getmlbmatchupdataRequest(api, action) {
  const { id } = action
  const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/mlb/games/${id}`)

  if (response) {
    yield put(MLBActions.getmlbmatchupdataSuccess(response))
  } else {
    yield put(MLBActions.getmlbmatchupdataFailure())
  }
}

export function* getmlbteamslugsRequest(api, action) {
  const response = yield firebaseService.prod.database.getDBData(`teamSlugs/mlb`)

  if (response) {
    yield put(MLBActions.getmlbteamslugsSuccess(response))
  } else {
    yield put(MLBActions.getmlbteamslugsFailure())
  }
}

export function* getmlbawayteamstatsRequest(api, action) {
  const { id } = action
  const path = `/mlb/teamseasondata?teamId=${id}&type=statistics&year=${new Date().getFullYear()}&season=REG`
  const response = yield getDataFromAPI(path)

  if (response) {
    yield put(MLBActions.getmlbawayteamstatsSuccess(response))
  } else {
    yield put(MLBActions.getmlbawayteamstatsFailure())
  }
}

export function* getmlbhometeamstatsRequest(api, action) {
  const { id } = action
  const path = `/mlb/teamseasondata?teamId=${id}&type=statistics&year=${new Date().getFullYear()}&season=REG`
  const response = yield getDataFromAPI(path)

  if (response) {
    yield put(MLBActions.getmlbhometeamstatsSuccess(response))
  } else {
    yield put(MLBActions.getmlbhometeamstatsFailure())
  }
}

export function* getmlbscheduledataRequest(api, action) {
  const { date } = action
  const response = yield firebaseService.prod.database.getDBMultipleData([
    {
      key: `current`,
      path: `sportRadarStore/mlb/daily/${date}/schedule/games`,
    },
    {
      key: `currBox`,
      path: `sportRadarStore/mlb/daily/${date}/boxscore`,
    },
  ])

  if (response) {
    yield put(MLBActions.getmlbscheduledataSuccess(response))
  } else {
    yield put(MLBActions.getmlbscheduledataFailure())
  }
}

export function* getmlbstandingsRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(
    `sportRadarStore/mlb/${year}/REG/standings/league/season`,
  )

  if (response) {
    yield put(MLBActions.getmlbstandingsSuccess(response))
  } else {
    yield put(MLBActions.getmlbstandingsFailure())
  }
}

export function* getmlboddsRequest(api, action) {
  const { date } = action
  let tomorrow = new Date(date)
  let today = FormatDateFull(date, true)
  let tomorrow1 = tomorrow.setDate(tomorrow.getDate() + 1)
  let tomorrow2 = FormatDateFull(new Date(tomorrow1), true)

  const response = yield firebaseService.prod.database.getDBMultipleData(
    [
      {
        path: `sportRadarStore/odds/dailyScheduleBySport/3/${today}/sport_events`,
      },
      {
        path: `sportRadarStore/odds/dailyScheduleBySport/3/${tomorrow2}/sport_events`,
      },
    ],
    'concat',
  )

  if (response) {
    yield put(MLBActions.getmlboddsSuccess(response))
  } else {
    yield put(MLBActions.getmlboddsFailure())
  }
}

export function* getmlboddsscoreboardRequest(api, action) {
  const { date } = action
  const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/mlb/daily/${date}/boxscore`)

  if (response) {
    yield put(MLBActions.getmlboddsscoreboardSuccess(response))
  } else {
    yield put(MLBActions.getmlboddsscoreboardFailure())
  }
}

export function* getmlbteamsarticleRequest(api, action) {
  const { tag, length } = action
  const response = yield firebaseService.prod.database.getDBData(`apArticleStore/skinny/byTag/${tag}`, true, length)

  if (response) {
    let paths = []
    for (let id in response) {
      paths.push({
        path: `apArticleStore/skinny/smallById/${id}`,
      })
    }

    let otherRes = yield firebaseService.prod.database.getDBMultipleData(paths, 'push')
    let articles = []
    let i = 0

    for (let id in response) {
      if (otherRes[i]) {
        otherRes[i].id = id
        articles.push(otherRes[i])
      }
      i++
    }

    articles = articles.sort((a, b) => {
      if (a.editDate > b.editDate) return -1
      if (a.editDate < b.editDate) return 1
      return 0
    })

    let data = []

    for (let i = 0, l = articles.length; i < l; i++) {
      if (!articles[i].apcmSlugLine) continue

      let article = articles[i]
      let image = ''

      if (article.mainMedia) {
        if (article.mainMedia.refs) {
          let imageId = article.mainMedia.refs[1].id.split(':')[1]
          image = `https://www.googleapis.com/download/storage/v1/b/bet-chicago.appspot.com/o/apimages%2F${
            article.id
          }-${imageId}.jpg?alt=media`
        }
      }

      data.push({
        id: article.id,
        headline: article.apcmHeadLine,
        summary: article.summary,
        image,
        imageLink: image,
        date: article.editDate,
        author: 'Associated Press',
        authorImage: '',
        authorTitle: '',
        content: article.summary,
      })
    }

    yield put(MLBActions.getmlbteamsarticleSuccess(data))
  } else {
    yield put(MLBActions.getmlbteamsarticleFailure())
  }
}
