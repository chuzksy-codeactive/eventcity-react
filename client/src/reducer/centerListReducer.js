import * as types from '../actions/actionTypes';

const initialState = {
  centers: []
};

const centerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_CENTER:
      return { ...state, centers: [] };
    case types.FETCHING_CENTER_SUCCESS:
      return { ...state, centers: action.payload };
    case types.FETCHING_CENTER_ERROR:
      return { ...state, centers: [] };
    default:
      return state;
  }
};

export default centerListReducer;
