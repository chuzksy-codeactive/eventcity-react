import * as types from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  isAdmin: false,
  error: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        isAdmin: action.payload,
        error: ''
      };
    case types.UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        isAdmin: false,
        error: ''
      };
    case types.AUTHENTICATED_ERROR:
      return {
        ...state,
        authenticated: false,
        isAdmin: false,
        error: 'You are not authorized'
      };
    default:
      return state;
  }
};

export default authReducer;
