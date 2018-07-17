import eventCenterReducer from '../../src/reducer/eventCenterReducer';
import * as types from '../../src/actions/actionTypes';

const initialState = {
  loading: false,
  message: null,
  eventCenter: {}
};

describe('center reducer', () => {
  it('should return the initial state', () => {
    expect(eventCenterReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCHING_CENTER_EVENT', () => {
    expect(eventCenterReducer(initialState, {
      type: types.FETCHING_CENTER_EVENT
    })).toEqual({
      ...initialState,
      loading: true,
      eventCenter: {}
    });
  });
  it('should handle FETCH_CENTER_EVENT_FAILURE', () => {
    expect(eventCenterReducer(initialState, {
      type: types.FETCH_CENTER_EVENT_FAILURE,
      payload: 'Failure to fetch events'
    })).toEqual({
      ...initialState,
      message: 'Failure to fetch events',
      loading: false,
      eventCenter: {}
    });
  });
  it('should handle FETCH_CENTER_EVENT_SUCCESS', () => {
    expect(eventCenterReducer(initialState, {
      type: types.FETCH_CENTER_EVENT_SUCCESS,
      payload: {
        events: [{
          name: 'Andela Meetup'
        }]
      }
    })).toEqual({
      ...initialState,
      loading: false,
      eventCenter: {
        events: [{
          name: 'Andela Meetup'
        }]
      }
    });
  });
  it('should handle CREATING_EVENT', () => {
    expect(eventCenterReducer(initialState, {
      type: types.CREATING_EVENT
    })).toEqual({
      ...initialState,
      loading: true,
      message: null
    });
  });
  it('should handle CREATE_EVENT_FAILURE', () => {
    expect(eventCenterReducer(initialState, {
      type: types.CREATE_EVENT_FAILURE,
      payload: 'Failure fetching events for this center'
    })).toEqual({
      ...initialState,
      loading: false,
      message: 'Failure fetching events for this center'
    });
  });
  it('should handle CREATE_EVENT_SUCCESS', () => {
    expect(eventCenterReducer(initialState, {
      type: types.CREATE_EVENT_SUCCESS,
      payload: 'Center found for this events'
    })).toEqual({
      ...initialState,
      loading: false,
      message: 'Center found for this events'
    });
  });
  it('should handle RESET_CENTER_EVENT', () => {
    expect(eventCenterReducer(initialState, {
      type: types.RESET_CENTER_EVENT
    })).toEqual({
      ...initialState,
      message: null,
      loading: false
    });
  });

});