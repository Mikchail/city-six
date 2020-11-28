const initialState = {
  reviews: [],
  isErrorReviews: false,
  isLoadingReviews: true
}
const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SET_ERROR_REVIEWS: `SET_ERROR_REVIEWS`,
  SET_LOADING_REVIEWS: `SET_LOADING_REVIEWS`
}

export const ActionCreate = {
  loadReivew: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),
  setErrorRiview: (err) => ({
    type: ActionType.SET_ERROR_REVIEWS,
    payload: err
  }),
  setLoadingRiview: (loading) => ({
    type: ActionType.SET_LOADING_REVIEWS,
    payload: loading
  })
}
export const Operations = {
  loadReview: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`).then((res) => {
      dispatch(ActionCreate.loadReivew(res.data))
      dispatch(ActionCreate.setErrorRiview(false))
      dispatch(ActionCreate.setLoadingRiview(false))
    }).catch((error) => {
      dispatch(ActionCreate.setErrorRiview(error))
      dispatch(ActionCreate.setLoadingRiview(false))
    })
  }
}
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return {...state, reviews: action.payload}
    case ActionType.SET_LOADING_REVIEWS:
      return {...state, isLoadingReviews: action.payload}
    case ActionType.SET_ERROR_REVIEWS:
      return {...state, isErrorReviews: action.payload}
    default:
      return state
  }
}
