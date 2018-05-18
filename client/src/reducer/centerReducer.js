import * as types from '../actions/actionTypes';

const initialState = {
  center: {},
  error: null,
  loading: false,
  message: null
};

const centerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATING_CENTER:
      return {
        ...state, center: {}, error: null, loading: true, message: null
      };
    case types.CENTER_CREATED_FAILURE:
      return {
        ...state, center: {}, error: action.payload, loading: false, message: null
      };
    case types.CENTER_CREATED_SUCCESS:
      return {
        ...state, center: action.payload, error: null, loading: false, message: 'Center successfully created'
      };
    case types.CENTER_RESET:
      return {
        ...state, center: {}, error: null, loading: false, message: null
      };
    case types.UPDATING_CENTER:
      return {
        ...state, center: {}, error: null, loading: true, message: null
      };
    case types.UPDATING_CENTER_SUCCESS:
      return {
        ...state, center: action.payload, error: null, loading: false, message: 'Center updated successfully'
      };
    case types.UPDATING_CENTER_FAILURE:
      return {
        ...state, center: {}, error: action.payload, loading: false, message: null
      };
    default:
      return state;
  }
};

export default centerReducer;
