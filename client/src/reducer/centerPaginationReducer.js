import * as types from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  centers: {}
}

const centerPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCHING_CENTER_PER_PAGE:
      return {
        ...state,
        centers: {},
        error: null,
        loading: true
      }
    case types.SEARCH_CENTER_PER_PAGE_FAILURE:
      return {
        ...state,
        centers: {},
        error: action.payload,
        loading: false
      }
    case types.SEARCH_CENTER_PER_PAGE_SUCCESSFULL:
      return {
        ...state,
        centers: action.payload,
        error: null,
        loading: false
      }
    default:
      return state;
  }
}

export default centerPaginationReducer;