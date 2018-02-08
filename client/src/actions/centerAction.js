import axios from 'axios';
import * as types from './actionTypes';

export const creatingCenter = () => ({
  type: types.CREATING_CENTER
});
export const createCenterFailure = () => ({
  type: types.CENTER_CREATED_FAILURE
});
export const createCenterSuccess = payload => ({
  type: types.CENTER_CREATED_SUCCESS,
  payload
});
