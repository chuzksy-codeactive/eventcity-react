import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  message: null,
  eventCenter: {}
};

const eventCenterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_CENTER_EVENT:
      return { ...state, loading: true, eventCenter: {} };
    case types.FETCH_CENTER_EVENT_FAILURE:
      return { ...state, message: action.payload, loading: false, eventCenter: {} };
    case types.FETCH_CENTER_EVENT_SUCCESS:
      return { ...state, eventCenter: action.payload, loading: false };
    case types.CREATING_EVENT:
      return { ...state, loading: true, message: null };
    case types.CREATE_EVENT_FAILURE:
      return { ...state, loading: false, message: action.payload };
    case types.CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case types.RESET_EVENT:
      return { ...state, message: null };
    default:
      return state;
  }
};

export default eventCenterReducer;
