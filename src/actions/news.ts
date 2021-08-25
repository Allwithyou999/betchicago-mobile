import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Get headline from RTDB (Editor's picks)
  getnewspinsRequest: ['isRefresh', 'headlines', 'id'],
  getnewspinsSuccess: ['newsPins'],
  getnewspinsFailure: null,

  // Get News articles
  getnewsRequest: ['skip', 'limit', 'id'],
  getnewsSuccess: ['news'],
  getnewsFailure: null,
})

export const NewsTypes = Types
export default Creators
