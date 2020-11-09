import * as actionTypes from "../constants";

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  authRedirectPath: "/"
};

export const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    /** FOR SIGN IN ACTIONS kader@gmail.com*/
    case actionTypes.SIGNIN_PENDING:
      return { ...state, loading: true };

    case actionTypes.SIGNIN_SUCCESS:
      return { ...state, loading: false, error: null, token: action.payload.token, userId: action.payload.userId};

    case actionTypes.SIGNIN_ERROR:
        return { ...state, loading: false, error: action.payload};
    
    /** FOR SIGN UP ACTIONS */
    case actionTypes.SIGNUP_PENDING:
      return { ...state, loading: true };

    case actionTypes.SIGNUP_SUCCESS:
      return { ...state, loading: false, error: null};

    case actionTypes.SIGNUP_ERROR:
        return { ...state, loading: false, error: action.payload};

    /** FOR LOGOUT ACTION */    
    case actionTypes.AUTH_LOGOUT:
        return { ...state, token: null, userId: null};

    /** FOR SET_AUTH_REDIRECT_PATH */    
    case actionTypes.SET_AUTH_REDIRECT_PATH:
        return { ...state, authRedirectPath: action.payload};

    default:
      return state;
  }
};
