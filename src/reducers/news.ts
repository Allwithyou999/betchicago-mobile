import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { merge } from 'ramda'
import { NewsTypes } from '../actions/news'

const initialState = Immutable({
  newsPinsStatus: '', // done, pending, error
  newsStatus: '', // done, pending, error
  newsPins: {},
  news: {},
})

// Get Editor's picks Carousel
const getnewspinsRequest = (state, action) => state.merge({ ...state, newsPinsStatus: 'pending' })
const getnewspinsSuccess = (state, action) => {
  const newsPins = merge(state.newsPins, action.newsPins)
  return state.merge({ ...state, newsPinsStatus: 'done', newsPins })
}
const getnewspinsFailure = (state, action) => state.merge({ ...state, newsPinsStatus: 'error' })

// Get news articles
const getnewsRequest = (state, action) => state.merge({ ...state, newsStatus: 'pending' })
const getnewsSuccess = (state, action) => {
  const news = merge(state.news, action.news)
  return state.merge({ ...state, newsStatus: 'done', news })
}
const getnewsFailure = (state, action) => state.merge({ ...state, newsStatus: 'error' })

export const reducer = createReducer(initialState, {
  // Get Pins
  [NewsTypes.GETNEWSPINS_REQUEST]: getnewspinsRequest,
  [NewsTypes.GETNEWSPINS_SUCCESS]: getnewspinsSuccess,
  [NewsTypes.GETNEWSPINS_FAILURE]: getnewspinsFailure,

  // Get News Articles
  [NewsTypes.GETNEWS_REQUEST]: getnewsRequest,
  [NewsTypes.GETNEWS_SUCCESS]: getnewsSuccess,
  [NewsTypes.GETNEWS_FAILURE]: getnewsFailure,
})
