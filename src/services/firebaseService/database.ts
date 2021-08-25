import * as firebase from 'firebase'

/**
 * Get single object from realtime database
 * @param {firebase.database.Database} db
 * @param {String} path
 */
const getDBData = (db: firebase.database.Database) => (path: string, order?: boolean, limit?: number) => {
  if (order && limit) {
    return new Promise((resolve, reject) =>
      db
        .ref(path)
        .orderByValue()
        .limitToLast(limit)
        .once('value')
        .then(result => {
          return resolve(result.val())
        }),
    )
  } else {
    return new Promise((resolve, reject) =>
      db
        .ref(path)
        .once('value')
        .then(result => {
          return resolve(result.val())
        }),
    )
  }
}

/**
 * Get multiple objects from realtime database
 * @param {firebase.database.Database} db Prod/Dev database
 * @param {{ key?: string, path: string }[]} paths
 * @param {string} resultType
 */
const getDBMultipleData = (db: firebase.database.Database) => (
  paths: { key?: string; path: string }[],
  resultType: 'key' | 'concat' | 'push' = 'key',
) => {
  const pathList = []

  paths.map((path, index) => {
    const data = db.ref(path.path).once('value')
    pathList.push(data)
  })

  return new Promise((resolve, reject) =>
    Promise.all(pathList).then(results => {
      let payload

      if (resultType === 'key') {
        payload = {}
        paths.map((path, index) => {
          payload[path.key] = results[index].val()
        })
      } else if (resultType === 'concat') {
        payload = []
        paths.map((path, index) => {
          if (results[index].val()) {
            payload = payload.concat(results[index].val())
          }
        })
      }
      // resultType === 'push'
      else {
        payload = []
        paths.map((path, index) => {
          payload.push(results[index].val())
        })
      }

      return resolve(payload)
    }),
  )
}

/**
 * Write single object to realtime database
 * @param {firebase.database.Database} db
 * @param {String} path
 */
const setDBData = (db: firebase.database.Database) => (path: string, data) => db.ref(path).set(data)

/**
 * Update single object to realtime database
 * @param {firebase.database.Database} db
 * @param {String} path
 * @param {Object} payload
 */
const updateDBData = (db: firebase.database.Database) => (path: string, data) => db.ref(path).update(data)

export default (firebaseApp: firebase.app.App) => ({
  getDBData: getDBData(firebaseApp.database()),
  getDBMultipleData: getDBMultipleData(firebaseApp.database()),
  setDBData: setDBData(firebaseApp.database()),
  updateDBData: updateDBData(firebaseApp.database()),
})
