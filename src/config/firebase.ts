import * as firebase from 'firebase'

// Live version
var config = {
  apiKey: 'AIzaSyB1Q4bLnjKZmuVeIaeaAiS3OSOYKhKK2TQ',
  authDomain: 'bet-chicago.firebaseapp.com',
  databaseURL: 'https://bet-chicago.firebaseio.com',
  projectId: 'bet-chicago',
  storageBucket: 'bet-chicago.appspot.com',
  messagingSenderId: '542489688565',
}

export const app = firebase.initializeApp(config)

// Dev version
var configDev = {
  apiKey: 'AIzaSyBSEHVBYNrR2gTnDJsK6YCKHzvua1Xs_AQ',
  authDomain: 'betchicagodev.firebaseapp.com',
  databaseURL: 'https://betchicagodev.firebaseio.com',
  projectId: 'betchicagodev',
  storageBucket: 'betchicagodev.appspot.com',
  messagingSenderId: '287250243287',
}

export const appDev = firebase.initializeApp(configDev, 'appDev')

export default {
  prod: app,
  dev: appDev,
}
