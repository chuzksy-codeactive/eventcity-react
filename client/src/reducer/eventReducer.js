import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  events: [],
  message: null
};
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_EVENT:
      return { ...state, loading: true, events: [], message: null };
    case types.FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, events: action.payload, message: null };
    case types.FETCH_EVENT_FAILURE:
      return { ...state, loading: false, events: [], message: action.payload };
    default:
      return state;
  }
};

export default eventReducer;