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
    case types.FETCHING_EVENT_BY_ID:
      return { ...state, loading: true, message: null };
    case types.FETCH_EVENT_BY_ID_FAILURE:
      return { ...state, loading: false, message: action.payload };
    case types.FETCH_EVENT_BY_ID:
      return { ...state, loading: false, message: null, events: action.payload };
    case types.RESET_EVENT: 
      return { ...state, loading: false, message: null }
    case types.DELETED_EVENT_BY_ID:
      return { 
        ...state, 
        loading: false,
        events: state.events.filter(event => event.id != action.id)
       }
    case types.DELETING_EVENT_BY_ID:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default eventReducer;
