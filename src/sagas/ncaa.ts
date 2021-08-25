import { put } from 'redux-saga/effects'
import NCAAActions from '../actions/ncaa'
import { FormatDate, FormatAMPM } from '../services'
import moment from 'moment-timezone'
import firebaseService from '../services/firebaseService'

export function* getncaascheduledataRequest(api, action) {
  const { date } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/ncaamb/daily/${date}/schedule/games`)

  if (response) {
    let data = []
    data[date] = []
    response.forEach(item => {
      const awayIconfile = item.away.name
        .replace(/ /g, '-')
        .replace(/\&/g, '_')
        .replace(/[\']/gi, '_')
      const homeIconfile = item.home.name
        .replace(/ /g, '-')
        .replace(/\&/g, '_')
        .replace(/[\']/gi, '_')

      data[date].push([
        {
          gameId: item.id,
          id: item.away.id,
          type: 'away',
          logo: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2F${awayIconfile}.png?alt=media`,
          name: item.away.name,
          points: item.away_points,
          alias: item.away.alias,
          ou: 'O/U: ---',
          time: item.scheduled
            ? moment(item.scheduled)
                .tz('America/Chicago')
                .format('hh:mm a')
            : '',
          score: item.away_points,
          data: item.status !== 'closed' ? '' : 'Final',
          status: item.status,
        },
        {
          gameId: item.id,
          id: item.home.id,
          type: 'home',
          logo: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2F${homeIconfile}.png?alt=media`,
          name: item.home.name,
          points: item.home_points,
          alias: item.home.alias,
          ou: '---',
          time: '',
          score: item.home_points,
          data: '',
          status: item.status,
        },
      ])
    })

    yield put(NCAAActions.getncaascheduledataSuccess(data))
  } else {
    yield put(NCAAActions.getncaascheduledataFailure())
  }
}

export function* getncaastandingsconfRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(
    `/sportRadarStore/ncaamb/year/${year}/REG/standings/conferences/conferenceList`,
  )

  if (response) {
    let conferences = []
    let selectedConf = 0

    conferences = response.map(conf => ({
      id: conf.id,
      title: conf.name,
    }))
    conferences.sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
    conferences.forEach((conf, index) => {
      if (conf.title.indexOf('Big Ten') !== -1) {
        selectedConf = index
      }
    })

    const data = {
      conferences: conferences,
      selectedConf: selectedConf,
    }

    yield put(NCAAActions.getncaastandingsconfSuccess(data))
  } else {
    yield put(NCAAActions.getncaastandingsconfFailure())
  }
}

export function* getncaastandingsteamsRequest(api, action) {
  const { id, year } = action
  const response = yield firebaseService.prod.database.getDBData(
    `/sportRadarStore/ncaamb/year/${year}/REG/standings/conferences/${id}/teams`,
  )

  if (response) {
    let teams = response
    teams.forEach(team => {
      let conf = team.records.filter(rec => rec.record_type === 'conference')[0]
      team.conf = `${conf.wins}-${conf.losses}`
      const iconfile = `${team.market
        .replace(/ /g, '-')
        .replace(/\&/g, '_')
        .replace(/[\']/gi, '_')}-${team.name
        .replace(/ /g, '-')
        .replace(/\&/g, '_')
        .replace(/[\']/gi, '_')}`
      team.icon = `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2F${iconfile}.png?alt=media`
      team.name = team.market
      team.wl = `${team.wins}-${team.losses}`
      team.ats = '-'
      team.ou = '-'
    })

    yield put(NCAAActions.getncaastandingsteamsSuccess(teams))
  } else {
    yield put(NCAAActions.getncaastandingsteamsFailure())
  }
}

export function* getncaarankingsdataRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/ncaamb/year/${year}/REG/rankings`)

  if (response) {
    let updated = moment(response.updated)
      .tz('America/Chicago')
      .format()
    let dateStrArr = updated.split('T')[0].split('-')
    let timeStrArr = updated.split('T')[1].split(':')
    let updatedStr = `${moment(dateStrArr[1], 'MM').format('MMM')} ${dateStrArr[2]} @ ${
      timeStrArr[0] > 12 ? timeStrArr[0] - 12 : timeStrArr[0]
    }:${timeStrArr[1]}${timeStrArr[0] > 11 ? 'pm' : 'am'} CT`

    const data = {
      rankings: response.list,
      updated: updatedStr,
    }

    yield put(NCAAActions.getncaarankingsdataSuccess(data))
  } else {
    yield put(NCAAActions.getncaarankingsdataFailure())
  }
}

export function* getncaafuturesdataRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/ncaamb/year/${year}/REG/odds/data`)

  if (response) {
    let temp = []
    let count = 0

    response.competitors.forEach(item => {
      const iconfile = item.name
        .replace(/ /g, '-')
        .replace(/\&/g, '_')
        .replace(/[\']/gi, '_')

      if (count < 100) {
        temp.push({
          id: item.id,
          name: item.name,
          odds: item.books[0].odds,
          icon: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fncaamb%2Fteam%2Flogo_60%2F${iconfile}.png?alt=media`,
        })
      }
      count++
    })

    const data = {
      teams: temp,
      endDate: moment(response.end_date).format('MM/DD/YY'),
    }

    yield put(NCAAActions.getncaafuturesdataSuccess(data))
  } else {
    yield put(NCAAActions.getncaafuturesdataFailure())
  }
}

export function* getncaamatchupdataRequest(api, action) {
  const { status, gameId, awayId, homeId } = action
  let response, data

  if (status === 'closed') {
    response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/ncaamb/games/${gameId}`)
  }
  if (status === 'scheduled') {
    response = yield firebaseService.prod.database.getDBMultipleData(
      [
        {
          key: `awayTeam`,
          path: `/sportRadarStore/ncaamb/year/2018/REG/teams/${awayId}`,
        },
        {
          key: `homeTeam`,
          path: `/sportRadarStore/ncaamb/year/2018/REG/teams/${homeId}`,
        },
      ],
      'key',
    )
  }

  if (response) {
    if (status === 'closed' && response.summary) {
      data = {
        venue: response.summary.venue.name,
        home: {
          points: response.summary.home.points,
          score: response.summary.home.scoring,
          leaders: response.boxscore.home.leaders,
          stats: response.summary.home.statistics,
          players: response.summary.home.players,
        },
        away: {
          points: response.summary.away.points,
          score: response.summary.away.scoring,
          leaders: response.boxscore.away.leaders,
          stats: response.summary.away.statistics,
          players: response.summary.away.players,
        },
      }
    } else if (status === 'scheduled') {
      data = response
    } else {
      data = null
    }

    yield put(NCAAActions.getncaamatchupdataSuccess(data))
  } else {
    yield put(NCAAActions.getncaamatchupdataFailure())
  }
}

export function* getncaalastgamehomeRequest(api, action) {
  const { ids } = action
  let paths = []

  ids.map(id => {
    paths.push({
      path: `/sportRadarStore/ncaamb/games/${id}`,
    })
  })

  const response = yield firebaseService.prod.database.getDBMultipleData(paths, 'push')

  if (response) {
    yield put(NCAAActions.getncaalastgamehomeSuccess(response))
  } else {
    yield put(NCAAActions.getncaalastgamehomeFailure())
  }
}

export function* getncaalastgameawayRequest(api, action) {
  const { ids } = action
  let paths = []

  ids.map(id => {
    paths.push({
      path: `/sportRadarStore/ncaamb/games/${id}`,
    })
  })

  const response = yield firebaseService.prod.database.getDBMultipleData(paths, 'push')

  if (response) {
    yield put(NCAAActions.getncaalastgameawaySuccess(response))
  } else {
    yield put(NCAAActions.getncaalastgameawayFailure())
  }
}
