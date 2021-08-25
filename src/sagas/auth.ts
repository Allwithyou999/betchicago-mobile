import { Alert } from 'react-native'
import { put, call, select } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import AuthActions from '../actions/auth'
import firebaseService from '../services/firebaseService'
import { validatePassword } from '../services'
import { getArticles } from '../services/api'
import { PopupService } from '../services/popup'

export function* loginRequest(action) {
  const response = yield call(firebaseService.prod.auth.signInWithEmailAndPassword, action.email, action.password)
  console.log(response)
  if (response.user) {
    if (response.user.isActive) {
      yield put(NavigationActions.navigate({ routeName: 'mainStack' }))
      yield put(AuthActions.loginSuccess(response.user))
    } else {
      PopupService.show('Your account is deleted. Please contact admin.')
      yield put(AuthActions.loginFailure())
    }
  } else {
    PopupService.show('Login failed')
    yield put(AuthActions.loginFailure())
  }
}

export function* registerRequest(action) {
  try {
    const response = yield call(
      firebaseService.prod.auth.signUpWithEmailAndPassword,
      action.email,
      action.password,
      action.payload,
    )
    console.log(response)
    if (response.user) {
      yield put(NavigationActions.navigate({ routeName: 'mainStack' }))
      yield put(AuthActions.registerSuccess(response.user))
    } else {
      PopupService.show('Register failed' + response.message || '')
      yield put(AuthActions.registerFailure())
    }
  } catch (err) {
    console.log(err)
  }
}

export function* logoutRequest(action) {
  const response = yield call(firebaseService.prod.auth.signOut)
  console.log(response)
  if (response.success) {
    yield put(AuthActions.logoutSuccess())
    yield put(NavigationActions.navigate({ routeName: 'mainStack' }))
  } else {
    PopupService.show('Logout failed' + response.message || '')
    yield put(AuthActions.logoutFailure())
  }
}

export function* getprofileRequest(action) {}

export function* getsavedarticlesRequest(action) {
  const store = yield select()
  const { profile } = store.auth
  const articleIds = Object.keys(profile.savedArticles || {})

  if (articleIds.length === 0) {
    return
  }
  try {
    const response = yield getArticles(null, null, articleIds)
    console.log(response)
    const data = []
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
    yield put(AuthActions.getsavedarticlesSuccess(data))
  } catch (err) {
    PopupService.show('Cannot fetch saved articles.')
    yield put(AuthActions.getsavedarticlesFailure())
  }
}

export function* updateprofileRequest(action) {
  const store = yield select()
  const { email, password, ...profile } = action.payload
  if (email && email !== store.auth.email) {
    yield call(firebaseService.prod.auth.updateEmail, email)
  }
  if (validatePassword(password) && password !== store.auth.password) {
    yield call(firebaseService.prod.auth.updatePassword, password)
  }
  const response = yield call(firebaseService.prod.auth.updateProfile, { ...store.auth.profile, ...profile })
  console.log(response)
  if (response && response.success) {
    if (action.alert) {
      PopupService.show(action.alert)
    }
    yield put(AuthActions.updateprofileSuccess(response.user))
    if (action.refetch) {
      switch (action.refetch) {
        case 'PROFILE':
          yield put(AuthActions.getprofileRequest())
          break
        case 'ARTICLES':
          console.log('calling again---------')
          // yield put(AuthActions.getsavedarticlesRequest())
          break
        default:
          break
      }
    }
  } else {
    PopupService.show('Cannot update profile')
    yield put(AuthActions.updateprofileFailure())
  }
}

export function* forgotpasswordRequest(action) {
  const response = yield call(firebaseService.prod.auth.sendForgotPasswordEmail, action.email)
  console.log(response)
  if (response && response.success) {
    PopupService.show('Password reset email has been sent.')
    yield put(NavigationActions.back())
  } else {
    PopupService.show('Sorry, something went wrong.')
  }
}
