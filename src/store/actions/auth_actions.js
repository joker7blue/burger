import * as actionsTypes from "../constants";
import axios from "axios";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationTokenDate");
  return {
    type: actionsTypes.AUTH_LOGOUT,
    payload: null,
  };
};

export const checkoutTimeOut = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  if (isSignUp) {
    dispatch({ type: actionsTypes.SIGNUP_PENDING, payload: null });
  } else {
    dispatch({ type: actionsTypes.SIGNIN_PENDING, payload: null });
  }

  let url = null;
  let authData = { email: email, password: password, returnSecureToken: true };

  if (isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBz43xI6HmUkRjZQ4Te93qM8l-KH6t8eKE";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBz43xI6HmUkRjZQ4Te93qM8l-KH6t8eKE";
  }

  axios
    .post(url, authData)
    .then((result) => {
      console.log(result);
      const payload = {
        token: result.data.idToken,
        userId: result.data.localId,
      };

      const expirationDate = new Date(
        new Date().getTime() + Number(result.data.expiresIn) * 1000
      );

      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.userId);
      localStorage.setItem("expirationTokenDate", expirationDate);

      if (isSignUp) {
        dispatch({ type: actionsTypes.SIGNUP_SUCCESS, payload: payload });
      } else {
        dispatch({ type: actionsTypes.SIGNIN_SUCCESS, payload: payload });
      }
      dispatch(checkoutTimeOut(result.data.expiresIn));
    })
    .catch((err) => {
      console.log(err);
      if (isSignUp) {
        dispatch({ type: actionsTypes.SIGNUP_ERROR, payload: err });
      } else {
        dispatch({ type: actionsTypes.SIGNIN_ERROR, payload: err });
      }
    });
};

export const setAuthRedirect = (path) => {
  return {
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    payload: path,
  };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  let expirationTime = null;

  if (token) {
      expirationTime = new Date(
      localStorage.getItem("expirationTokenDate")
    ).getTime();

    if (expirationTime > new Date().getTime()) {
      const payload = {
        token: token,
        userId: localStorage.getItem("userId"),
      };
      dispatch({ type: actionsTypes.SIGNIN_SUCCESS, payload: payload });
      dispatch(checkoutTimeOut((expirationTime - new Date().getTime()) / 1000));
    }else{
      dispatch(logout())
    }
  }
};
