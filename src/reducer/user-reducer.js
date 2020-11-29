const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
}
const initialState = {
  user: false,
  isError: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH
}


export const ActionType = {
  SIGN_IN: `SIGN_IN`,
  SET_ERROR: `SET_ERROR`,
  SET_STATUS: `SET_STATUS`,
}

export const Operations = {
  signin: (userData) => (dispatch, _getData, api) => {
    return api.post('/login', userData).then((res) => {
      dispatch(ActionCreator.signin(res.data))
      dispatch(ActionCreator.setError(false))
      dispatch(ActionCreator.setStatus(AuthorizationStatus.AUTH))
    }).catch((err) => {
      dispatch(ActionCreator.setError(err))
      dispatch(ActionCreator.setStatus(AuthorizationStatus.NO_AUTH))
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
      dispatch(ActionCreator.setStatus(AuthorizationStatus.AUTH))

    }).catch((err) => {
      console.log(err)
      dispatch(ActionCreator.setError(err))
      dispatch(ActionCreator.setStatus(AuthorizationStatus.NO_AUTH))
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
  }),
  setStatus: (status) => ({
    type: ActionType.SET_STATUS,
    payload: status
  })
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_IN:
      return {...state, user: action.payload}
    case ActionType.SET_ERROR:
      return {...state, isError: action.payload}
    case ActionType.SET_STATUS:
      return {...state, authorizationStatus: action.payload}

    default:
      return state;
  }
}
