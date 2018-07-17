import authReducer from '../../src/reducer/authReducer';
import * as types from '../../src/actions/actionTypes';

const initialState = {
  authenticated: false,
  isAdmin: false,
  error: ''
};

describe('Authentication Reducer Test', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  })
  it('should handle AUTHENTICATED', () => {
    expect(authReducer(initialState, {
      type: types.AUTHENTICATED,
      payload: true
    })).toEqual({
      ...initialState,
      authenticated: true,
      isAdmin: true,
      error: ''
    });
  });
  it('should handle UNAUTHENTICATED', () => {
    expect(authReducer(initialState, {
      type: types.UNAUTHENTICATED,
      payload: false
    })).toEqual({
      ...initialState,
      authenticated: false,
      isAdmin: false,
      error: ''
    });
  });
  it('should handle AUTHENTICATED_ERROR', () => {
    expect(authReducer(initialState, {
      type: types.AUTHENTICATED_ERROR,
      payload: 'You are not authorized'
    })).toEqual({
      ...initialState,
      authenticated: false,
      isAdmin: false,
      error: 'You are not authorized'
    });
  });

})