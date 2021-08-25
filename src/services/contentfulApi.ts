/**
 * @overview Contentful API
 *
 * NOTE: This is called both at build time and run time, and therefore
 * needs to be completely universal -- even sans-Webpack.
 *
 * {@link https://github.com/contentful/contentful.js}
 * {@link https://contentful.github.io/contentful.js/contentful/5.0.5/}
 */
import * as contentful from 'contentful/dist/contentful.browser.min.js'
import { CONTENTFULSPACE, CONTENTFULDELIVERKEY } from '../config/constants/common'

class ContentfulApi {
  _client: any = null

  constructor(client) {
    // Store Contentful JavaScript SDK client instance as "private" reference
    this._client = client
  }

  /**
   * Parse raw JSON data into collection of entry objects and
   * resolve links (Pass through for `client.parseEntries`)
   *
   * {@link https://contentful.github.io/contentful.js/contentful/5.0.5/ContentfulClientAPI.html#.parseEntries}
   *
   * @return {Object} Parsed data
   */
  parseEntries(data) {
    return this._client.parseEntries(data)
  }

  /**
   * Request entries by `content_type`
   *
   * @param {object} args Contains all request parameters
   * @param {string} args.content_type The content type to be retrieved
   * @return {Promise}
   */
  getEntries(args) {
    return this._client
      .getEntries(args)
      .then(response => response)
      .catch(handleError)
  }

  // getNavData() {
  //   return this._client
  //     .getEntries({
  //       content_type: 'navigation',
  //       include: 2,
  //     })
  //     .then(response => response)
  //     .catch(handleError)
  // }

  // getSectionPins() {
  //   return this._client
  //     .getEntries({
  //       content_type: 'sectionPins',
  //       include: 2,
  //     })
  //     .then(response => response)
  //     .catch(handleError)
  // }

  // getLatestArticles(skip, limit) {
  //   return this._client
  //     .getEntries({
  //       content_type: 'article',
  //       include: 2,
  //       limit: limit,
  //       skip: skip,
  //       order: '-sys.updatedAt',
  //     })
  //     .then(response => response)
  //     .catch(handleError)
  // }
}

/**
 * Create instance of Contentful JavaScript SDK client
 * and return our API methods
 *
 * @param  {Object<string,string>} clientConfig Contentful client configuration
 * @param  {string} clientConfig.space Contentful space ID
 * @param  {string} clientConfig.accessToken Contentful access token
 * @param  {?string} clientConfig.host Optional contentful host, e.g. `preview.contentful.com`
 * @return {ContentfulApi} New instance of `ContentfulApi`
 */
export function initClient(clientConfig) {
  const client = contentful.createClient(clientConfig)

  return new ContentfulApi(client)
}

// Private Methods:
function handleError(error) {
  console.error(error)
  return Promise.reject(error)
}

const clientConfig = {
  space: CONTENTFULSPACE,
  accessToken: CONTENTFULDELIVERKEY,
}

const ContentfulApiService = initClient(clientConfig)

export default ContentfulApiService
