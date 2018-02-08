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

export const authenticated = payload => {
  return {
    type: types.AUTHENTICATED,
    payload
  };
};

export const unAuthenticated = () => {
  localStorage.removeItem('user');
  return {
    type: types.UNAUTHENTICATED
  };
};

export const authenticated_error = () => ({
  type: types.AUTHENTICATED_ERROR
});

export const userSignIn = (data, history) => {
  // const url = 'https://eventcity.herokuapp.com/api/v1/users/login';
  return dispatch => {
    dispatch(signingInUser());
    axios
      .post('/api/v1/users/login', data)
      .then(response => {
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
        } else {
          dispatch(signInError(user.username || user.password));
          dispatch(unAuthenticated());
        }
      })
      .catch(error => {
        dispatch(signInUserFailure());
        dispatch(authenticated_error());
      });
  };
};

export const userSignUp = (data, history) => {
  return dispatch => {
    dispatch(signingInUser());
    axios
      .post('/api/v1/users', data)
      .then(response => {
        let isAdmin = false;
        if (response.status === 200 && response.data) {
          if (response.data.data) {
            if (response.data.data.id === 1 || response.data.data.id === 2) {
              isAdmin = true;
            }
            dispatch(authenticated(isAdmin));
            dispatch(signInUserSuccess(response.data));
            localStorage.setItem('user', response.data.token);
            history.push('/centers');
          } else if (response.data.error) {
            dispatch(signInError(response.data.error.username || response.data.error.email));
            dispatch(unAuthenticated());
          }
        }
      })
      .catch(error => {
        dispatch(signInUserFailure());
        dispatch(authenticated_error());
      });
  };
};
