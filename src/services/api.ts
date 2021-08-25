import { APIURL } from '../config/constants/common'

export const REST = (endpoint: string, method: 'GET' | 'POST' | 'PUT', data: any) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then(
        res => {
          return res.json()
        },
        err => reject(err),
      )
      .then(data => {
        if (data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
      .catch(err => reject(err))
  })
}

/**
 * Get Data from
 * @param {Number | String} path
 */
export const getDataFromAPI = (path: string) => {
  let url = APIURL + path

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        res => {
          return res.json()
        },
        err => reject(err),
      )
      .then(data => {
        if (data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
      .catch(err => reject(err))
  })
}

export const getArticles = (skip: string, limit: string | number, ids: string[] = [], queryfilter = '') => {
  let url = ''
  if (ids.length !== 0) {
    url = `${APIURL}/contentfulapi/articles?idlist=` + ids.toString()
  } else {
    url = `${APIURL}/contentfulapi/paged?skip=${skip}&pagesize=${limit}&queryfilter=${queryfilter}`
  }

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(
        res => {
          return res.json()
        },
        err => reject(err),
      )
      .then(data => {
        if (data.error) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })
      .catch(err => reject(err))
  })
}
