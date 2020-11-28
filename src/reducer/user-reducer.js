const initialState = {
  user: false,
  isError: false
}
export const ActionType = {
  SIGN_IN: `SIGN_IN`,
  SET_ERROR: `SET_ERROR`,
}

export const Operations = {
  signin: (userData) => (dispatch, _getData, api) => {
    return api.post('/login', userData).then((res) => {
      dispatch(ActionCreator.signin(res.data))
      dispatch(ActionCreator.setError(false))
    }).catch((err) => {
      dispatch(ActionCreator.setError(err))
    })
  },
  logout: () =>(dispatch)=>{
    dispatch(ActionCreator.setError(false))
    dispatch(ActionCreator.signin(false))
  },
  checkAuth: () => (dispatch, _getData, api) => {
    return api.get('/login').then((res) => {
      dispatch(ActionCreator.signin(res.data))
      dispatch(ActionCreator.setError(false))
    }).catch((err) => {
      dispatch(ActionCreator.setError(err))
    })
  },
}

export const ActionCreator = {
  signin: (user) => ({
    type: ActionType.SIGN_IN,
    payload: user
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  })
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return {...state, user: action.payload}
    case ActionType.SET_ERROR:
      return {...state, isError: action.payload}

    default:
      return state;
  }
}
