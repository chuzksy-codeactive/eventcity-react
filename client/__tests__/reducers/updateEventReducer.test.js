import updateEventReducer from '../../src/reducer/updateEventReducer';
import * as types from '../../src/actions/actionTypes';

const initialState = {
  loading: false,
  message: null
};

describe('Update event reducer', () => {
  it('should return the initial state', () => {
    expect(updateEventReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle UPDATING_EVENT_BY_ID', () => {
    expect(updateEventReducer(initialState, {
      type: types.UPDATING_EVENT_BY_ID
    })).toEqual({
      ...initialState,
      loading: true,
      message: null
    });
  });
  it('should handle UPDATE_EVENT_BY_ID_SUCCESS', () => {
    expect(updateEventReducer(initialState, {
      type: types.UPDATE_EVENT_BY_ID_SUCCESS,
      payload: 'successfully updated event'
    })).toEqual({
      ...initialState,
      loading: false,
      message: 'successfully updated event'
    });
  });
  it('should handle UPDATE_EVENT_BY_ID_FAILURE', () => {
    expect(updateEventReducer(initialState, {
      type: types.UPDATE_EVENT_BY_ID_FAILURE,
      payload: 'unable to update'
    })).toEqual({
      ...initialState,
      loading: false,
      message: 'unable to update'
    });
  });
  it('should handle RESET_EVENT', () => {
    expect(updateEventReducer(initialState, {
      type: types.RESET_EVENT,
    })).toEqual({
      ...initialState,
      loading: false,
      message: null
    });
  });

})