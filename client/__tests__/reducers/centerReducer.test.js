import * as types from '../../src/actions/actionTypes';
import centerReducer from '../../src/reducer/centerReducer';

const initialState = {
  center: {},
  error: null,
  loading: false,
  message: null
};

describe('Center reducer test', () => {
  it('should return the initial state', () => {
    expect(centerReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CREATING_CENTER', () => {
    expect(centerReducer(initialState, {
      type: types.CREATING_CENTER
    })).toEqual({
      ...initialState,
      center: {},
      error: null,
      loading: true,
      message: null
    });
  });
  it('should handle CENTER_CREATED_FAILURE', () => {
    expect(centerReducer(initialState, {
      type: types.CENTER_CREATED_FAILURE,
      payload: 'Error loading center'
    })).toEqual({
      ...initialState,
      center: {},
      error: 'Error loading center',
      loading: false,
      message: null
    });
  });
  it('should handle CENTER_CREATED_SUCCESS', () => {
    expect(centerReducer(initialState, {
      type: types.CENTER_CREATED_SUCCESS,
      payload: {name: 'Grailland Hall'},
      message: 'Center successfully created'
    })).toEqual({
      ...initialState,
      center: {name: 'Grailland Hall'},
      error: null,
      loading: false,
      message: 'Center successfully created'
    });
  });
  it('should handle CENTER_RESET', () => {
    expect(centerReducer(initialState, {
      type: types.CENTER_RESET
    })).toEqual({
      ...initialState,
      center: {},
      error: null,
      loading: false,
      message: null
    });
  });
  it('should handle UPDATING_CENTER', () => {
    expect(centerReducer(initialState, {
      type: types.UPDATING_CENTER
    })).toEqual({
      ...initialState,
      center: {},
      error: null,
      loading: true,
      message: null
    });
  });
  it('should handle UPDATING_CENTER_SUCCESS', () => {
    expect(centerReducer(initialState, {
      type: types.UPDATING_CENTER_SUCCESS,
      payload: {name: 'Grailland Halls'},
      message: 'Center updated successfully'
    })).toEqual({
      ...initialState,
      center: {name: 'Grailland Halls'},
      error: null,
      loading: false,
      message: 'Center updated successfully'
    });
  });
  it('should handle UPDATING_CENTER_FAILURE:', () => {
    expect(centerReducer(initialState, {
      type: types.UPDATING_CENTER_FAILURE,
      payload: 'Error!'
    })).toEqual({
      ...initialState,
      center: {},
      error: 'Error!',
      loading: false,
      message: null
    });
  });
  
})