import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  eventCenter: {}
};

const eventCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_CENTER_EVENT:
      return { ...state, loading: true, error: null, eventCenter: {} };
    case types.FETCH_CENTER_EVENT_FAILURE:
      return { ...state, error: action.payload, loading: false, eventCenter: {} };
    case types.FETCH_CENTER_EVENT_SUCCESS:
      return { ...state, eventCenter: action.payload, loading: false, error: null };
    default:
      return state;
  }
};

export default eventCenterReducer;
