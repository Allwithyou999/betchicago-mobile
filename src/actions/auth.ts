import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Sign in with email and password
  loginRequest: ['email', 'password'],
  loginSuccess: ['payload'],
  loginFailure: null,

  // Sign up with email and password + first name, last name, dob, notifications
  registerRequest: ['email', 'password', 'payload'],
  registerSuccess: ['payload'],
  registerFailure: null,

  // Log out
  logoutRequest: null,
  logoutSuccess: null,
  logoutFailure: null,

  // Get user profile
  getprofileRequest: null,
  getprofileSuccess: ['payload'],
  getprofileFailure: null,

  // Get saved articles
  getsavedarticlesRequest: null,
  getsavedarticlesSuccess: ['payload'],
  getsavedarticlesFailure: null,

  // Update user profile
  updateprofileRequest: ['payload', 'alert', 'refetch'],
  updateprofileSuccess: ['payload'],
  updateprofileFailure: null,

  // Forgot Password
  forgotpasswordRequest: ['email'],
  forgotpasswordSuccess: [],
  forgotpasswordFailure: [],
})

export const AuthTypes = Types
export default Creators
