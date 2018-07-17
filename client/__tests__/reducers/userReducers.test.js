import userReducer from '../../src/reducer/userReducer';
import * as types from '../../src/actions/actionTypes';
import {
  users
} from '../__mocks__/users'

const initialState = {
  user: {},
  error: '',
  loading: false
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGNING_IN_USER', () => {
    expect(userReducer(initialState, {
      type: types.SIGNING_IN_USER
    })).toEqual({
      ...initialState,
      user: {},
      error: null,
      loading: true
    });
  });

  it('should handle SIGNIN_USER_FAILURE', () => {
    expect(userReducer(initialState, {
      type: types.SIGNIN_USER_FAILURE
    })).toEqual({
      ...initialState,
      user: {},
      error: "Error! can't reach the server",
      loading: false
    });
  });

  it('should handle types.SIGNIN_USER_SUCCESS', () => {
    expect(userReducer(initialState, {
      type: types.SIGNIN_USER_SUCCESS,
      payload: {
        "message": "Success"
      }
    })).toEqual({
      ...initialState,
      user: {
        "message": "Success"
      },
      error: null,
      loading: false
    });
  });

  it('should handle types.SIGN_IN_ERROR:', () => {
    expect(userReducer(initialState, {
      type: types.SIGN_IN_ERROR,
      payload: {
        error: 'Error signin user'
      }
    })).toEqual({
      ...initialState,
      user: {},
      error: {
        error: 'Error signin user'
      },
      loading: false
    });
  });

  it('should handle types.SIGN_IN_RESET:', () => {
    expect(userReducer(initialState, {
      type: types.SIGN_IN_RESET
    })).toEqual({
      ...initialState,
      user: {},
      error: null,
      loading: false
    });
  });

})