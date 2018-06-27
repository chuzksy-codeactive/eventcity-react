import * as types from './actionTypes';
export const alertAction = {
  success,
  error,
  clear
};
const success = message => {
  return { type: types.ALERT_SUCCESS, message };
};
const error = message => {
  return { type: types.ALERT_ERROR, message };
};
const clear = () => {
  return { type: types.ALERT_CLEAR };
};
