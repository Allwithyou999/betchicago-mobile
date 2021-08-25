import { put } from 'redux-saga/effects'
import NFLActions from '../actions/nfl'
import { NFL_ODDS_RADAR } from '../config/constants/nfl'
import { FormatDate, FormatAMPM } from '../services'
import { REST } from '../services/api'
import firebaseService from '../services/firebaseService'

export function* getscheduledataRequest(api, action) {
  const { year } = action
  const data = []
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/nfl/${year}`)

  if (response) {
    Object.keys(response).forEach(key => {
      if (key === 'PRE' || key === 'REG') {
        response[key].schedule.weeks.forEach((item, index) => {
          let subData

          if (key === 'PRE') {
            subData = {
              type: 'pre',
              name: 'Pre Week ' + (index + 1),
              content: [],
            }
          } else {
            subData = {
              type: 'reg',
              name: 'Week ' + (index + 1),
              content: [],
            }
          }

          let gamesList = item.games

          gamesList.sort(function(a, b) {
            return new Date(a.scheduled) > new Date(b.scheduled) ? 1 : -1
          })

          gamesList.forEach((game, tindex) => {
            const scheduled = FormatDate(new Date(game.scheduled), 'WW, MMM dd')
            let order = -1
            let homeLogoName = game.home.name
            let awayLogoName = game.away.name
            homeLogoName = homeLogoName.toLowerCase().replace(/ /g, '-')
            awayLogoName = awayLogoName.toLowerCase().replace(/ /g, '-')

            const gameSchedule = [
              {
                id: game.away.id,
                type: 'away',
                name: game.away.name,
                logo: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2F${awayLogoName}.png?alt=media`,
                score: 'O/U: 48',
                time: FormatAMPM(new Date(game.scheduled)),
              },
              {
                id: game.home.id,
                type: 'home',
                name: game.home.name,
                logo: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2F${homeLogoName}.png?alt=media`,
                score: '-4',
                time: '',
              },
            ]

            subData.content.forEach((obj, nindex) => {
              if (obj.scheduled == scheduled) {
                order = nindex
              }
            })

            if (order == -1) {
              subData.content.push({
                scheduled: scheduled,
                games: [gameSchedule],
              })
            } else {
              subData.content[order].games.push(gameSchedule)
            }
          })

          data.push(subData)
        })
      }
    })

    data.push({ type: 'pst', name: 'Wildcard', content: {} })
    data.push({ type: 'pst', name: 'Division', content: {} })
    data.push({ type: 'pst', name: 'Conference', content: {} })
    data.push({ type: 'pst', name: 'Super Bowl', content: {} })

    yield put(NFLActions.getscheduledataSuccess(data))
  } else {
    yield put(NFLActions.getscheduledataFailure())
  }
}

export function* getstandingsdataRequest(api, action) {
  const { year } = action
  const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/nfl/${year}/standings`)

  if (response) {
    yield put(NFLActions.getstandingsdataSuccess(response))
  } else {
    yield put(NFLActions.getstandingsdataFailure())
  }
}

export function* getnflfutureoddsReqeust(action) {
  // const response = yield firebaseService.prod.database.getDBData(`sportRadarStore/odds/mappings/categoryRights/sr-category-43`)
  const response = yield REST(
    'https://api.sportradar.us/oddscomparison-usp1/en/us/categories/sr:category:43/outrights.json?api_key=swg4s5tc77z2wpwhmz5u3vem',
    'GET',
    null,
  )
  if (response) {
    const data = response.outrights.filter(right => right.id === 1561)

    //   const odds = data.competitors.map(team => { uuid: })
    //   {
    //     "id": "sr:competitor:4422",
    //     "name": "Kansas City Chiefs",
    //     "country": "USA",
    //     "country_code": "USA",
    //     "abbreviation": "KC",
    //     "uuids": "6680d28d-d4d2-49f6-aace-5292d3ec02c2,KC",
    //     "books": [
    //         {
    //             "id": "sr:book:20669",
    //             "name": "WestgateSuperbook",
    //             "odds": "6/1"
    //         },
    //         {
    //             "id": "sr:book:6",
    //             "name": "Unibet",
    //     ]
    //             "odds": "15/2"
    //         }
    // },

    yield put(NFLActions.getnflfutureoddsSuccess(data))
  } else {
    yield put(NFLActions.getnflfutureoddsFailure())
  }
}

export function* getnflteamdataRequest(api, action) {
  const { id } = action
  const response = yield firebaseService.prod.database.getDBData(`/sportRadarStore/nfl/teamProfiles/${id}`)

  if (response) {
    let name = response.profile.market + ' ' + response.profile.name
    let logoName = name.toLowerCase().replace(/ /g, '-')

    const data = {
      name: name,
      logo: `https://firebasestorage.googleapis.com/v0/b/bet-chicago.appspot.com/o/staticassests%2Fnfl%2Fteam%2Flogo_60%2F${logoName}.png?alt=media`,
      data: response,
    }
    yield put(NFLActions.getnflteamdataSuccess(data))
  } else {
    yield put(NFLActions.getnflteamdataFailure())
  }
}
