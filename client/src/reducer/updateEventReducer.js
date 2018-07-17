import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  message: null
};

const updateEventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATING_EVENT_BY_ID:
      return { ...state,
        loading: true,
        message: null
      };
    case types.UPDATE_EVENT_BY_ID_SUCCESS:
      return { ...state,
        loading: false,
        message: action.payload
      };
    case types.UPDATE_EVENT_BY_ID_FAILURE:
      return { ...state,
        loading: false,
        message: action.payload
      };
    case types.RESET_EVENT:
      return { ...state,
        loading: false,
        message: null
      };
    default:
      return state;
  }
};

export default updateEventReducer;