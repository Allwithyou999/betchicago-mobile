import * as firebase from 'firebase'
import firebaseApps from '../../config/firebase'
import authService from './auth'
import databaseService from './database'

const firebaseService = (firebaseApp: firebase.app.App) => ({
  auth: authService(firebaseApp),
  database: databaseService(firebaseApp),
})

export default {
  dev: firebaseService(firebaseApps.dev),
  prod: firebaseService(firebaseApps.prod),
}
