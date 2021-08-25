import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AppTypes } from '../actions/app'

const initialState = Immutable({
  status: '', // done, pending, error
  page: 'latest',
  sliderStatus: '', // done, pending, error
  articlesStatus: '', // done, pending, error
  navItemList: [],
  picksSlider: [],
  articles: [],
})

// Navigate to page
const navigateToPage = (state, action) => state.merge({ page: action.page })

// Get Nav Items
const getnavbarRequest = (state, action) => state.merge({ ...state, status: 'pending' })
const getnavbarSuccess = (state, action) => state.merge({ ...state, status: 'done', navItemList: action.navItemList })
const getnavbarFailure = (state, action) => state.merge({ ...state, status: 'error' })

// Get Editor's picks Carousel
const getpickscarouselRequest = (state, action) => state.merge({ ...state, sliderStatus: 'pending' })
const getpickscarouselSuccess = (state, action) =>
  state.merge({ ...state, sliderStatus: 'done', picksSlider: action.picksSlider })
const getpickscarouselFailure = (state, action) => state.merge({ ...state, sliderStatus: 'error' })

// Get Articles
const getarticlesRequest = (state, action) => state.merge({ ...state, articlesStatus: 'pending' })
const getarticlesSuccess = (state, action) =>
  state.merge({ ...state, articlesStatus: 'done', articles: action.articles })
const getarticlesFailure = (state, action) => state.merge({ ...state, articlesStatus: 'error' })

export const reducer = createReducer(initialState, {
  [AppTypes.NAVIGATE_TO_PAGE]: navigateToPage,
  // Get Nav Items
  [AppTypes.GETNAVBAR_REQUEST]: getnavbarRequest,
  [AppTypes.GETNAVBAR_SUCCESS]: getnavbarSuccess,
  [AppTypes.GETNAVBAR_FAILURE]: getnavbarFailure,

  // Get Carousel Items
  [AppTypes.GETPICKSCAROUSEL_REQUEST]: getpickscarouselRequest,
  [AppTypes.GETPICKSCAROUSEL_SUCCESS]: getpickscarouselSuccess,
  [AppTypes.GETPICKSCAROUSEL_FAILURE]: getpickscarouselFailure,

  // Get Articles
  [AppTypes.GETARTICLES_REQUEST]: getarticlesRequest,
  [AppTypes.GETARTICLES_SUCCESS]: getarticlesSuccess,
  [AppTypes.GETARTICLES_FAILURE]: getarticlesFailure,
})
