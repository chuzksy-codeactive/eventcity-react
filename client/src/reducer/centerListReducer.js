import * as types from '../actions/actionTypes';

const initialState = {
  centers: [],
  loading: false,
  error: null
};

const centerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_CENTER:
      return { ...state, centers: [], loading: true, error: null };
    case types.FETCHING_CENTER_SUCCESS:
      return { ...state, centers: action.payload, loading: false, error: null };
    case types.FETCHING_CENTER_ERROR:
      return { ...state, centers: [], loading: false, error: 'Error loading data' };
    default:
      return state;
  }
};

export default centerListReducer;
