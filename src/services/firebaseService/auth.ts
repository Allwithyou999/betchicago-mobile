import * as firebase from 'firebase'
import moment from 'moment'
import databaseService from './database'
import { User } from '../../config/models'

const initialUserData: User = {
  isActive: true,
  notifications: {
    apStories: false,
    bcStories: false,
    breakingNews: false,
    contestUpdates: false,
    gameUpdates: false,
    injuryUpdates: false,
    oddsChange: false,
    oddsPost: false,
    pushNotifications: false,
  },
  dob: '01/01/1950',
  emailUpdates: {
    bcNewsLetter: true,
    contestUpdates: true,
    eventUpdates: true,
    morningScoreBoard: true,
  },
  favouritePlayers: {},
  favouriteTeams: {},
  firstName: 'First Name',
  lastName: 'Last Name',
  savedArticles: {},
  signupDate: 'default record on create',
}

/**
 * Sign in to firebase with email and password credential
 * @param {firebase.app.App} firebaseApp
 * @param {String} email
 * @param {String} password
 */
const signInWithEmailAndPassword = (firebaseApp: firebase.app.App) => (email: string, password: string) =>
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      if (res.user) {
        return firebaseApp
          .database()
          .ref(`userProfileWrite/${res.user.uid}`)
          .once('value')
          .then(user => {
            if (user.exists()) {
              return { user: user.toJSON() }
            }
            firebaseApp
              .database()
              .ref(`userProfileWrite/${res.user.uid}`)
              .set(initialUserData)
            return { user: initialUserData }
          })
          .catch(err => {
            return err
          })
      }
      return {}
    })
    .catch(err => err)

/**
 * Sign up with firebase with email and password credential
 * @param {AuthPayload} payload
 */
const signUpWithEmailAndPassword = (firebaseApp: firebase.app.App) => (email: string, password: string, payload) =>
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      const user = { ...initialUserData, signupDate: moment().format('YYYY-MM-DD'), ...payload }
      if (res.user) {
        return firebaseApp
          .database()
          .ref(`userProfileWrite/${res.user.uid}`)
          .set(user)
          .then(() => {
            return { user }
          })
          .catch(err => err)
      }
    })
    .catch(err => err)

/**
 * Sign out
 */
const signOut = (firebaseApp: firebase.app.App) => () =>
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      return { success: true }
    })
    .catch(err => err)

/**
 * Get Profile
 */
const getProfile = (firebaseApp: firebase.app.App) => (userId: string) =>
  databaseService(firebaseApp).getDBData(`userProfileWrite/${userId}`)

/**
 * Update Profile
 */
const updateProfile = (firebaseApp: firebase.app.App) => payload => {
  const userPath = `userProfileWrite/${firebaseApp.auth().currentUser.uid}`
  return firebaseApp
    .database()
    .ref(userPath)
    .update(payload)
    .then(() =>
      firebaseApp
        .database()
        .ref(userPath)
        .once('value')
        .then(res => ({ success: true, user: res.toJSON() })),
    )
}

/**
 * Update Profile
 */
const updateEmail = (firebaseApp: firebase.app.App) => (newEmail: string) =>
  firebaseApp.auth().currentUser.updateEmail(newEmail)

/**
 * Update Profile
 */
const updatePassword = (firebaseApp: firebase.app.App) => (newPassword: string) =>
  firebaseApp.auth().currentUser.updatePassword(newPassword)

/**
 * Forgot user password
 */
const sendForgotPasswordEmail = (firebaseApp: firebase.app.App) => (email: string) =>
  firebaseApp
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => ({ success: true }))
    .catch(err => err)

export default (firebaseApp: firebase.app.App) => ({
  signInWithEmailAndPassword: signInWithEmailAndPassword(firebaseApp),
  signUpWithEmailAndPassword: signUpWithEmailAndPassword(firebaseApp),
  signOut: signOut(firebaseApp),
  getProfile: getProfile(firebaseApp),
  updateProfile: updateProfile(firebaseApp),
  updateEmail: updateEmail(firebaseApp),
  updatePassword: updatePassword(firebaseApp),
  sendForgotPasswordEmail: sendForgotPasswordEmail(firebaseApp),
})
