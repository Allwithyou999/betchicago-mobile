import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { AuthTypes } from '../actions/auth'
import { User } from '../config/models'

export type AuthState = {
  status: 'pending' | 'done' | 'error'
  isLoggedIn: boolean
  email: string
  password: string
  profile: User
  timestamp: string
  savedArticles: {
    id: string
    headline: string
    summary: string
    date: string
    image: string
    author: string
    authorImage: string
    authorTitle: string
    content: string
  }[]
}

const initialState = Immutable({
  status: '', // done, pending, error
  isLoggedIn: false,
  email: '',
  password: '',
  profile: {},
  savedArticles: [],
})

// Sign in with email and password
const loginRequest = (state, action) =>
  state.merge({ status: 'pending', email: action.email, password: action.password })
const loginSuccess = (state, action) =>
  state.merge({ status: 'done', isLoggedIn: true, profile: action.payload, timestamp: new Date(), savedArticles: [] })
const loginFailure = (state, action) => state.merge({ status: 'error', isLoggedIn: false, timestamp: null })

// Sign up with email and password + first name, last name, dob, notifications
const registerRequest = (state, action) =>
  state.merge({ status: 'pending', email: action.email, password: action.password })
const registerSuccess = (state, action) =>
  state.merge({ status: 'done', profile: action.payload, isLoggedIn: true, timestamp: new Date() })
const registerFailure = (state, action) => state.merge({ status: 'error', isLoggedIn: false, timestamp: null })

// Log out
const logoutRequest = (state, action) => state.merge({ status: 'pending' })
const logoutSuccess = (state, action) =>
  state.merge({ status: 'done', isLoggedIn: false, email: '', password: '', timestamp: null, savedArticles: [] })
const logoutFailure = (state, action) => state.merge({ status: 'error', timestamp: null })

// Get user profile
const getprofileRequest = (state, action) => state.merge({ status: 'pending' })
const getprofileSuccess = (state, action) => state.merge({ status: 'done', profile: action.payload })
const getprofileFailure = (state, action) => state.merge({ status: 'error' })

// Get user profile
const getsavedarticlesRequest = (state, action) => state.merge({ status: 'pending' })
const getsavedarticlesSuccess = (state, action) => state.merge({ status: 'done', savedArticles: action.payload })
const getsavedarticlesFailure = (state, action) => state.merge({ status: 'error' })

// Update user profile
const updateprofileRequest = (state, action) => state.merge({ status: 'pending' })
const updateprofileSuccess = (state, action) => {
  const articleIds = Object.keys(action.payload.savedArticles || {})
  const newArticles = state.savedArticles.filter(article => articleIds.indexOf(article.id) >= 0)
  return state.merge({ status: 'done', profile: action.payload, savedArticles: newArticles })
}
const updateprofileFailure = (state, action) => state.merge({ status: 'error' })

// Forgot user password
const forgotpasswordRequest = (state, action) => state.merge({ status: 'pending' })
const forgotpasswordSuccess = (state, action) => state.merge({ status: 'done' })
const forgotpasswordFailure = (state, action) => state.merge({ status: 'error' })

export const reducer = createReducer(initialState, {
  // Sign in with email and password
  [AuthTypes.LOGIN_REQUEST]: loginRequest,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_FAILURE]: loginFailure,

  // Sign up with email and password + first name, last name, dob, notifications
  [AuthTypes.REGISTER_REQUEST]: registerRequest,
  [AuthTypes.REGISTER_SUCCESS]: registerSuccess,
  [AuthTypes.REGISTER_FAILURE]: registerFailure,

  // Log out
  [AuthTypes.LOGOUT_REQUEST]: logoutRequest,
  [AuthTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [AuthTypes.LOGOUT_FAILURE]: logoutFailure,

  // Get user profile
  [AuthTypes.GETPROFILE_REQUEST]: getprofileRequest,
  [AuthTypes.GETPROFILE_SUCCESS]: getprofileSuccess,
  [AuthTypes.GETPROFILE_FAILURE]: getprofileFailure,

  // Get saved articles profile
  [AuthTypes.GETSAVEDARTICLES_REQUEST]: getsavedarticlesRequest,
  [AuthTypes.GETSAVEDARTICLES_SUCCESS]: getsavedarticlesSuccess,
  [AuthTypes.GETSAVEDARTICLES_FAILURE]: getsavedarticlesFailure,

  // Update profile
  [AuthTypes.UPDATEPROFILE_REQUEST]: updateprofileRequest,
  [AuthTypes.UPDATEPROFILE_SUCCESS]: updateprofileSuccess,
  [AuthTypes.UPDATEPROFILE_FAILURE]: updateprofileFailure,

  // Forgot password
  [AuthTypes.FORGOTPASSWORD_REQUEST]: forgotpasswordRequest,
  [AuthTypes.FORGOTPASSWORD_SUCCESS]: forgotpasswordSuccess,
  [AuthTypes.FORGOTPASSWORD_FAILURE]: forgotpasswordFailure,
})
