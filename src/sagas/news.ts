import { put } from 'redux-saga/effects'
import NewsActions from '../actions/news'
import firebaseService from '../services/firebaseService'
import { getArticles } from '../services/api'

export function* getnewspinsRequest(api, action) {
  const { isRefresh, id } = action
  const data = []
  data[id] = []
  let response = null
  let headlines = action.headlines

  if (!headlines || headlines.length === 0) {
    data[id] = null
    yield put(NewsActions.getnewspinsSuccess(data))
    return
  }

  if (!isRefresh) {
    response = yield getArticles('', '', headlines)
  } else {
    response = yield firebaseService.prod.database.getDBData('/contentfulStore/navigation/primary/0/headlines/fields')
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
      data[id].push({})
    })

    response.records.forEach((obj, index) => {
      const i = headlines.indexOf(obj.sys.id)

      data[id].splice(i, 1, {
        id: obj.sys.id,
        headline: obj.fields.headline,
        summary: obj.fields.summary,
        date: obj.fields.pubDateTime,
        image: `http:${obj.fields.featuredImage.fields.file.url}?h=300&w=400&fm=jpg&fit=fill`,
        author: obj.fields.author[0].fields.fullName,
        authorImage: obj.fields.author[0].fields.headshot
          ? 'http:' + obj.fields.author[0].fields.headshot.fields.file.url
          : '',
        authorTitle: obj.fields.author[0].fields.twitterHandle ? obj.fields.author[0].fields.twitterHandle : '',
        content: obj.fields.content,
      })
    })

    yield put(NewsActions.getnewspinsSuccess(data))
  } else {
    yield put(NewsActions.getnewspinsFailure())
  }
}

export function* getnewsRequest(api, action) {
  const { skip, limit, id } = action
  const response = yield getArticles(skip, limit, [], 'section:' + id)
  const data = []
  data[id] = []

  if (response) {
    response.records.forEach(item => {
      data[id].push({
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

    yield put(NewsActions.getnewsSuccess(data))
  } else {
    yield put(NewsActions.getnewsFailure())
  }
}
