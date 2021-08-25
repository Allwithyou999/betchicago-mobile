import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import configureStore from './createStore'
import rootSaga from '../sagas'
import immutablePersistenceTransform from '../services/transform'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav'],
  transforms: [immutablePersistenceTransform],
}

/* ------------- Assemble The Reducers ------------- */
const reducers = combineReducers({
  nav: require('./navigation').reducer,
  auth: require('./auth').reducer,
  app: require('./app').reducer,
  news: require('./news').reducer,
  nfl: require('./nfl').reducer,
  golf: require('./golf').reducer,
  mlb: require('./mlb').reducer,
  ncaa: require('./ncaa').reducer,
  nba: require('./nba').reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

let { store, sagasManager, sagaMiddleware } = configureStore(persistedReducer, rootSaga)

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./').reducers
    store.replaceReducer(nextRootReducer)

    const newYieldedSagas = require('../sagas').default
    sagasManager.cancel()
    sagasManager.done.then(() => {
      sagasManager = sagaMiddleware.run(newYieldedSagas)
    })
  })
}

let persistor = persistStore(store)

export { store, persistor }
