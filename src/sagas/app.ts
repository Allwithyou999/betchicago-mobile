import { put } from 'redux-saga/effects'
import AppActions from '../actions/app'
import firebaseService from '../services/firebaseService'
import { getArticles } from '../services/api'

export function* getnavbarRequest(api, action) {
  // const response = yield firebaseService.prod.database.getDBData('/contentfulStore/navigation')
  const response = yield firebaseService.prod.database.getDBData('/contentfulStore/navigation_test')

  if (response) {
    const data = [
      {
        name: 'Latest',
        id: '',
        subMenu: [],
        headline: [],
      },
    ]

    response.primary.forEach(item => {
      const subData = []
      const headline = []

      if (item.sectionComponents && item.sectionComponents.length > 0) {
        item.sectionComponents.forEach(subItem => {
          if (subItem.componentName !== 'Home')
            subData.push({
              id: subItem.id,
              name: subItem.componentName,
            })
        })
      }

      if (item.primaryHeadline) {
        headline.push(item.primaryHeadline)
      }

      if (item.secondaryHeadlines && item.secondaryHeadlines.length > 0) {
        item.secondaryHeadlines.forEach(subItem => {
          headline.push(subItem)
        })
      }

      data.push({ name: item.name, id: item.id, subMenu: subData, headline: headline })
    })

    response.more.forEach(item => {
      const subData = []
      const headline = []

      if (item.name === 'Home') {
        if (item.primaryHeadline) {
          data[0].headline.push(item.primaryHeadline)
        }

        if (item.secondaryHeadlines && item.secondaryHeadlines.length > 0) {
          item.secondaryHeadlines.forEach(subItem => {
            data[0].headline.push(subItem)
          })
        }
      } else {
        if (item.sectionComponents && item.sectionComponents.length > 0) {
          item.sectionComponents.forEach(subItem => {
            if (subItem.componentName !== 'Home')
              subData.push({
                id: subItem.id,
                name: subItem.componentName,
              })
          })
        }

        if (item.primaryHeadline) {
          headline.push(item.primaryHeadline)
        }

        if (item.secondaryHeadlines && item.secondaryHeadlines.length > 0) {
          item.secondaryHeadlines.forEach(subItem => {
            headline.push(subItem)
          })
        }

        data.push({ name: item.name, id: item.id, subMenu: subData, headline: headline })
      }
    })

    yield put(AppActions.getnavbarSuccess(data))
  } else {
    yield put(AppActions.getnavbarFailure())
  }
}

export function* getpickscarouselRequest(api, action) {
  const { isRefresh } = action
  const data = []
  let response = null
  let headlines = action.headlines

  if (!isRefresh) {
    response = yield getArticles('', '', headlines)
  } else {
    // response = yield firebaseService.prod.database.getDBData('/contentfulStore/navigation/more/9/headlines/fields')
    response = yield firebaseService.prod.database.getDBData('/contentfulStore/navigation_test/more/8/headlines/fields')
    const newHeadlines = []

    if (response.primaryHeadline) {
      newHeadlines.push(response.primaryHeadline.sys.id)
    }

    if (response.secondaryHeadlines && response.secondaryHeadlines.length > 0) {
      response.secondaryHeadlines.forEach(subItem => {
        newHeadlines.push(subItem.sys.id)
      })
    }

    headlines = newHeadlines

    response = yield getArticles('', '', newHeadlines)
  }

  if (response && response.records) {
    response.records.forEach(() => {
      data.push({})
    })

    response.records.forEach((obj, index) => {
      const i = headlines.indexOf(obj.sys.id)

      data.splice(i, 1, {
        id: obj.sys.id,
        headline: obj.fields.headline,
        summary: obj.fields.summary,
        date: obj.fields.pubDateTime,
        image: 'http:' + obj.fields.featuredImage.fields.file.url + '?h=300&w=400&fm=jpg&fit=fill',
        author: obj.fields.author[0].fields.fullName,
        authorImage: obj.fields.author[0].fields.headshot
          ? 'http:' + obj.fields.author[0].fields.headshot.fields.file.url
          : '',
        authorTitle: obj.fields.author[0].fields.twitterHandle ? obj.fields.author[0].fields.twitterHandle : '',
        content: obj.fields.content,
      })
    })

    yield put(AppActions.getpickscarouselSuccess(data))
  } else {
    yield put(AppActions.getpickscarouselFailure())
  }
}

export function* getarticlesRequest(api, action) {
  const { skip, limit } = action
  const response = yield getArticles(skip, limit)
  const data = []

  if (response) {
    response.records.forEach(item => {
      data.push({
        id: item.sys.id,
        headline: item.fields.headline,
        summary: item.fields.summary,
        date: item.fields.pubDateTime,
        image: 'http:' + item.fields.featuredImage.fields.file.url + '?h=300&w=400&fm=jpg&fit=fill',
        author: item.fields.author[0].fields.fullName,
        authorImage: item.fields.author[0].fields.headshot
          ? 'http:' + item.fields.author[0].fields.headshot.fields.file.url
          : '',
        authorTitle: item.fields.author[0].fields.twitterHandle ? item.fields.author[0].fields.twitterHandle : '',
        content: item.fields.content,
      })
    })

    yield put(AppActions.getarticlesSuccess(data))
  } else {
    yield put(AppActions.getarticlesFailure())
  }
}
