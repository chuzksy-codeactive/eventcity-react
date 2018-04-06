import * as types from '../actions/actionTypes';
import userInitialState from './userInitialState';

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case types.SIGNING_IN_USER:
      return {
        ...state,
        user: {},
        error: null,
        loading: true
      };
    case types.SIGNIN_USER_FAILURE:
      return {
        ...state,
        user: {},
        error: "Error! can't reach the server",
        loading: false
      };
    case types.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false
      };
    case types.SIGN_IN_ERROR:
      return {
        ...state,
        user: {},
        error: action.payload,
        loading: false
      };
    case types.SIGN_IN_RESET:
      return {
        ...state,
        user: {},
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export default userReducer;
