const initialState = {
  reviews: [],
  isErrorReviews: false,
  isLoadingReviews: true,

  addReviewsError: false,
}
const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SET_ERROR_REVIEWS: `SET_ERROR_REVIEWS`,
  SET_LOADING_REVIEWS: `SET_LOADING_REVIEWS`,

  ADD_REVIEWS: `ADD_REVIEWS`,
  ADD_REVIEWS_ERROR: `ADD_REVIEWS_ERROR`,
}

export const ActionCreate = {
  loadReivew: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews
  }),
  setErrorReview: (err) => ({
    type: ActionType.SET_ERROR_REVIEWS,
    payload: err
  }),
  setLoadingReview: (loading) => ({
    type: ActionType.SET_LOADING_REVIEWS,
    payload: loading
  }),
  addReview: (loading) => ({
    type: ActionType.ADD_REVIEWS,
    payload: loading
  })
}
export const Operations = {
  loadReview: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`).then((res) => {
      dispatch(ActionCreate.loadReivew(res.data))
      dispatch(ActionCreate.setErrorReview(false))
      dispatch(ActionCreate.setLoadingReview(false))
    }).catch((error) => {
      dispatch(ActionCreate.setErrorReview(error))
      dispatch(ActionCreate.setLoadingReview(false))
    })
  },
  addReview: (id, body) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, body).then((res) => {
      dispatch(ActionCreate.loadReivew(res.data))
      dispatch(ActionCreate.setErrorReview(false))
      dispatch(ActionCreate.setLoadingReview(false))
    }).catch((error) => {
      dispatch(ActionCreate.setErrorReview(error))
      dispatch(ActionCreate.setLoadingReview(false))
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
