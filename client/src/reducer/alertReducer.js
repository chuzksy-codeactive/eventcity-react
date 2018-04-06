import * as types from '../actions/actionTypes';

const alert = (state = {}, action) => {
  switch (action.type) {
    case types.ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case types.ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: 'action.message'
      };
    case types.ALERT_CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
