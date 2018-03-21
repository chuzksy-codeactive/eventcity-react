import * as types from '../actions/actionTypes';
const initialState = {
  loading: false,
  events: [],
  message: null
};
export const eventReducer = (state = initialState, action) => {
  switch (action) {
    case types.FETCHING_EVENT:
      return { ...state, loading: true };
    case types.FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, event: action.payload };
    case types.FETCH_EVENT_FAILURE:
      return { ...state, loading: false, events: [], message: action.payload };
    default:
      return state;
  }
};
