import axios from 'axios';
import * as types from './actionTypes';

export const signInUserSuccess = payload => ({
  type: types.SIGNIN_USER_SUCCESS,
  payload
});

export const signingInUser = () => ({
  type: types.SIGNING_IN_USER
});

export const signInUserFailure = () => ({
  type: types.SIGNIN_USER_FAILURE
});

export const signInError = payload => ({
  type: types.SIGN_IN_ERROR,
  payload
});
export const signInReset = () => ({
  type: types.SIGN_IN_RESET
});

export const authenticated = payload => ({
  type: types.AUTHENTICATED,
  payload
});

export const unAuthenticated = () => {
  localStorage.removeItem('user');
  return {
    type: types.UNAUTHENTICATED
  };
};

export const authenticatedError = () => ({
  type: types.AUTHENTICATED_ERROR
});

export const userSignIn = (data, history) =>
  (dispatch) => {
    dispatch(signingInUser());
    axios
      .post('/api/v1/users/login', data)
      .then((response) => {
        let isAdmin = false;
        const user = response.data;
        if (user.data) {
          if (user.data.id === 1 || user.data.id === 2) {
            isAdmin = true;
          }
          dispatch(authenticated(isAdmin));
          localStorage.setItem('user', user.token);
          dispatch(signInUserSuccess(user));
          history.push('/centers');
        }
      })
      .catch((error) => {
        const { status } = error.response;
        const { message } = error.response.data;
        if (status === 401 || status === 404) {
          dispatch(signInError(message));
          dispatch(unAuthenticated());
        } else {
          dispatch(signInUserFailure());
          dispatch(authenticatedError());
        }
      });
  };


export const userSignUp = (data, history) => (dispatch) => {
  dispatch(signingInUser());
  

  axios
    .post('/api/v1/users', data)
    .then((response) => {
      let isAdmin = false;
      if (response.status === 201 && response.data) {
        if (response.data.data) {
          if (response.data.data.id === 1 || response.data.data.id === 2) {
            isAdmin = true;
          }
          dispatch(authenticated(isAdmin));
          dispatch(signInUserSuccess(response.data));
          localStorage.setItem('user', response.data.token);
          history.push('/centers');
        }
      }
    })
    .catch((error) => {
      const { status } = error.response;
      const { message } = error.response.data;
      if (status === 409 || status === 400) {
        dispatch(signInError(message));
        dispatch(unAuthenticated());
      } else {
        dispatch(signInUserFailure());
        dispatch(authenticatedError());
      }
    });
};
