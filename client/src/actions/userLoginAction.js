import axios from 'axios';
import * as types from './actionTypes';

/**
 * Action Creator to indicate that the app has successfully
 * logged in a user
 * 
 * @param {object} payload login info
 * @return {object}  action [SIGNIN_USER_SUCCESS]
 */
export const signInUserSuccess = payload => ({
  type: types.SIGNIN_USER_SUCCESS,
  payload
});

/**
 * Action Creator to indicate that the app is signing in a user
 * 
 * @return {object}  action [SIGNING_IN_USER]
 */
export const signingInUser = () => ({
  type: types.SIGNING_IN_USER
});

/**
 * Action Creator to indicate that there's a failure trying to 
 * signin a user
 * 
 * @return {object}  action [SIGNIN_USER_FAILURE]
 */
export const signInUserFailure = () => ({
  type: types.SIGNIN_USER_FAILURE
});

/**
 * Action Creator to indicate to user that there's an error
 * signin the user
 * 
 * @param {object} payload signin error info
 * @return {object}  action [SIGN_IN_ERROR]
 */
export const signInError = payload => ({
  type: types.SIGN_IN_ERROR,
  payload
});

/**
 * Action Creator to reset the user state
 * 
 * @return {object}  action [SIGN_IN_RESET]
 */
export const signInReset = () => ({
  type: types.SIGN_IN_RESET
});

/**
 * Action Creator to indicate the user is authenticated
 * 
 * @param {object} payload users auto info
 * @return {object}  action [AUTHENTICATED]
 */
export const authenticated = payload => ({
  type: types.AUTHENTICATED,
  payload
});

/**
 * Action Creator to indicate that the user is unauthenticated
 * 
 * @return {object}  action [UNAUTHENTICATED]
 */
export const unAuthenticated = () => {
  localStorage.removeItem('user');
  return {
    type: types.UNAUTHENTICATED
  };
};

/**
 * Action Creator to indicate that there's an error authenticating
 * the user
 * 
 * @return {object}  action [AUTHENTICATED_ERRROR]
 */
export const authenticatedError = () => ({
  type: types.AUTHENTICATED_ERROR
});

/**
 * Action to handle the signin by making a POST request to the backend
 * 
 * @param {object} data user's data to save
 * @return {void}
 */
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

/**
 * Action to handle user signup by making a POST request to 
 * the backend 
 * 
 * @param {object} data user's data 
 * @return {void}
 */
export const userSignUp = (data, history) => (dispatch) => {
  dispatch(signingInUser());

  return axios
    .post('/api/v1/users', data)
    .then((response) => {
    
      let isAdmin = false;
      if (response.status === 201 && response.data) {
        const {data} = response.data;
        if (data) {
          if (data.id === 1 || data.id === 2) {
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
