import userReducer from '../../src/reducer/centerListReducer';
import * as types from '../../src/actions/actionTypes';
import centerListReducer from '../../src/reducer/centerListReducer';

const initialState = {
  centers: []
};

describe('Centers List Reducer Test', () => {
  it('should return the initial state', () => {
    expect(centerListReducer(undefined, {})).toEqual(initialState);
  })
  it('should handle FETCHING_CENTER test', () => {
    expect(centerListReducer(initialState, {
      type: types.FETCHING_CENTER
    })).toEqual({
      ...initialState,
      centers: []
    })
  })
  it('should handle FETCHING_CENTER_SUCCESS test', () => {
    expect(centerListReducer(initialState, {
      type: types.FETCHING_CENTER_SUCCESS,
      payload: [{
        name: 'GRAILLAND'
      }]
    })).toEqual({
      ...initialState,
      centers: [{
        name: 'GRAILLAND'
      }]
    })
  })
  it('should handle CENTER_DELETING test', () => {
    expect(centerListReducer(initialState, {
      type: types.CENTER_DELETING
    })).toEqual({
      ...initialState,
      centers: [],
      loading: true
    });
  });
  it('should handle FETCHING_CENTER_ERROR test', () => {
    expect(centerListReducer(initialState, {
      type: types.FETCHING_CENTER_ERROR,
      payload: 'Can not fetch centers'
    })).toEqual({
      ...initialState,
      centers: 'Can not fetch centers'
    });
  });
  it('should handle CENTER_DELETED test', () => {
    expect(centerListReducer(initialState, {
      type: types.CENTER_DELETED
    })).toEqual({
      ...initialState,
      centers: [],
      loading: false
    });
  });
})
