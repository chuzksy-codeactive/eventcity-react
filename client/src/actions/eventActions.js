import * as types from './actionTypes';
import axios from 'axios';

export const fetchingEventCenter = () => ({
  type: types.FETCHING_CENTER_EVENT
});

export const fetchEventCenterFailure = payload => ({
  type: types.FETCH_CENTER_EVENT_FAILURE,
  payload
});

export const fetchEventCenterSuccess = payload => ({
  type: types.FETCH_CENTER_EVENT_SUCCESS,
  payload
});

export const fetchEventCenter = id => dispatch => {
  dispatch(fetchingEventCenter());
  axios({
    url: `/api/v1/centers/event/${id}`,
    method: 'get'
  })
    .then(res => {
      dispatch(fetchEventCenterSuccess(res.data));
    })
    .catch(() => {
      dispatch(fetchEventCenterFailure('Can not load data'));
    });
};
