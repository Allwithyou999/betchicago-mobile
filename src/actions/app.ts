import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Navigate to page
  navigateToPage: ['page'],

  // Get nav items from Contentful
  getnavbarRequest: null,
  getnavbarSuccess: ['navItemList'],
  getnavbarFailure: null,

  // Get home section pins from Contentful (Editor's picks)
  getpickscarouselRequest: ['isRefresh', 'headlines'],
  getpickscarouselSuccess: ['picksSlider'],
  getpickscarouselFailure: null,

  // Get home articles
  getarticlesRequest: ['skip', 'limit'],
  getarticlesSuccess: ['articles'],
  getarticlesFailure: null,
})

export const AppTypes = Types
export default Creators
