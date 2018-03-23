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

export const creatingEvent = () => ({
  type: types.CREATING_EVENT
});

export const createEventFailure = payload => ({
  type: types.CREATE_EVENT_FAILURE,
  payload
});

export const createEventSuccess = payload => ({
  type: types.CREATE_EVENT_SUCCESS,
  payload
});

export const resetEvent = () => ({
  type: types.RESET_EVENT
});

export const createEvent = data => dispatch => {
  dispatch(creatingEvent());
  axios({
    method: 'post',
    url: '/api/v1/events',
    data
  })
    .then(res => {
      if (res.data.code === 200) {
        dispatch(createEventFailure(res.data.message));
      } else if (res.data.code === 201) {
        dispatch(createEventSuccess(res.data.message));
        dispatch(fetchEventCenter(data.centerId));
      }
    })
    .catch(() => {
      dispatch(createEventFailure('Unable to book event'));
    });
};

export const fetchingEvent = () => ({
  type: types.FETCHING_EVENT
});

export const fetchEventSuccess = payload => ({
  type: types.FETCH_EVENT_SUCCESS,
  payload
});

export const fetchEventFailure = payload => ({
  type: types.FETCH_EVENT_FAILURE,
  payload
});

export const fetchEvent = () => dispatch => {
  dispatch(fetchingEvent());
  axios({
    url: '/api/v1/events',
    method: 'get'
  })
    .then(res => {
      if (res.data.code === 200) {
        dispatch(fetchEventSuccess(res.data.data));
      } else if (res.data.message) {
        dispatch(fetchEventFailure(res.data.message));
      }
    })
    .catch(() => {
      dispatch(fetchEventFailure('Error loading data'));
    });
};

export const fetchingEventById = () => ({
  type: types.FETCHING_EVENT_BY_ID
});

export const fetchEventByIdSuccess = payload => ({
  type: types.FETCH_EVENT_BY_ID,
  payload
});

export const fetchEventByIdFailure = payload => ({
  type: types.FETCH_EVENT_BY_ID_FAILURE,
  payload
});

export const fetcEventById = id => dispatch => {
  dispatch(fetchingEventById());
  axios({
    url: `/api/v1/events/${id}`,
    method: 'get'
  })
    .then(res => {
      if (res.data.code === 200) {
        dispatch(fetchEventByIdSuccess(res.data.data));
      } else if (res.data.message) {
        dispatch(fetchEventByIdFailure(res.data.message));
      }
    })
    .catch(() => {
      dispatch(fetchEventByIdFailure('Error loading data from server'));
    });
};
