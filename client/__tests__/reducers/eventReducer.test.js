import eventReducer from '../../src/reducer/eventReducer';
import * as types from '../../src/actions/actionTypes';

const initialState = {
  loading: false,
  events: [],
  message: null
};

describe('Event reducer test', () => {

  it('should handle FETCHING_EVENT', () => {
    expect(eventReducer(initialState, {
      type: types.FETCHING_EVENT
    })).toEqual({
      ...initialState,
      loading: true,
      events: [],
      message: null
    });
  });
  it('should handle FETCH_EVENT_SUCCESS', () => {
    expect(eventReducer(initialState, {
      type: types.FETCH_EVENT_SUCCESS,
      payload: [{
        name: 'Andela Meetup'
      }]
    })).toEqual({
      ...initialState,
      loading: false,
      events: [{
        name: 'Andela Meetup'
      }],
      message: null
    });
  });
  it('should handle FETCH_EVENT_FAILURE', () => {
    expect(eventReducer(initialState, {
      type: types.FETCH_EVENT_FAILURE,
      payload: 'error fetching events'
    })).toEqual({
      ...initialState,
      loading: false,
      events: [],
      message: 'error fetching events'
    });
  });
  it('should handle FETCHING_EVENT_BY_ID', () => {
    expect(eventReducer(initialState, {
      type: types.FETCHING_EVENT_BY_ID
    })).toEqual({
      ...initialState,
      loading: true,
      message: null
    });
  });
  it('should handle FETCH_EVENT_BY_ID_FAILURE', () => {
    expect(eventReducer(initialState, {
      type: types.FETCH_EVENT_BY_ID_FAILURE,
      payload: 'error fetching event by Id'
    })).toEqual({
      ...initialState,
      loading: false,
      message: 'error fetching event by Id'
    });
  });
  it('should handle FETCH_EVENT_BY_ID', () => {
    expect(eventReducer(initialState, {
      type: types.FETCH_EVENT_BY_ID,
      payload: [{
        name: 'Andela Meetup'
      }]
    })).toEqual({
      ...initialState,
      loading: false,
      message: null,
      events: [{
        name: 'Andela Meetup'
      }]
    });
  });
  it('should handle RESET_EVENT', () => {
    expect(eventReducer(initialState, {
      type: types.RESET_EVENT
    })).toEqual({
      ...initialState,
      loading: false,
      message: null
    });
  });
  it('should handle DELETED_EVENT_BY_ID', () => {
    expect(eventReducer(initialState, {
      type: types.DELETED_EVENT_BY_ID,
      payload: []
    })).toEqual({
      ...initialState,
      loading: false,
      events: []
    });
  });
  it('should handle DELETING_EVENT_BY_ID', () => {
    expect(eventReducer(initialState, {
      type: types.DELETING_EVENT_BY_ID
    })).toEqual({
      ...initialState,
      loading: true
    });
  });
  it('should return the initial state', () => {
    expect(eventReducer(undefined, {})).toEqual(initialState);
  });
});