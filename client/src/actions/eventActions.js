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
      if (res.status === 200) {
        dispatch(createEventFailure(res.data.message));
      } else if (res.status === 201) {
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
      if (res.status === 200) {
        dispatch(fetchEventSuccess(res.data.data));
      } else if (res.status = 404) {
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

export const fetchEventById = id => dispatch => {
  dispatch(fetchingEventById());
  axios({
    url: `/api/v1/events/${id}`,
    method: 'get'
  })
    .then(res => {
      if (res.status === 200) {
        dispatch(fetchEventByIdSuccess(res.data.data));
      } 
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 404){
          dispatch(fetchEventByIdFailure("You are yet to book an event"));
        }
      }
    });
};

export const updatingEvent = () => ({
  type: types.UPDATING_EVENT_BY_ID
});

export const updateEventFailure = payload => ({
  type: types.UPDATE_EVENT_BY_ID_FAILURE,
  payload
});

export const updateEventSuccess = payload => ({
  type: types.UPDATE_EVENT_BY_ID_SUCCESS,
  payload
});

export const updateEventById = data => dispatch => {
  dispatch(updatingEvent());
  axios({
    url: `/api/v1/events/${data.id}`,
    method: 'put',
    data: {
      name: data.name,
      purpose: data.purpose,
      note: data.note,
      eventDate: data.eventDate,
      userId: data.userId,
      centerId: data.centerId
    }
  })
    .then(res => {
      if (res.status === 200) {
        dispatch(updateEventSuccess(res.data.message));
      }
    })
    .catch((error) => {
      if(error.response){
        if(error.response.status === 400){
          dispatch(updateEventSuccess('Event not available for this date, please choose another date'));
        } else if (error.response.status === 404){
          dispatch(updateEventSuccess(`Event with ID ${data.id} not found`));
        } else {
          dispatch(updateEventFailure('Server error'));
        }
      }
    });
};

export const deletingEvent = () => ({
  type: types.DELETING_EVENT_BY_ID
});

export const deleteEventFailure = payload => ({
  type: types.DELETE_EVENT_BY_ID_FAILURE,
  payload
});

export const deleteEventSuccess = payload => ({
  type: types.DELETE_EVENT_BY_ID_SUCCESS,
  payload
});

export const deleteEventById = id => dispatch => {
  dispatch(deletingEvent());
  axios({
    url: `/api/v1/events/${id}`,
    method: 'delete',
  }).then(res => {
    if (res.status === 200){
      dispatch(deleteEventSuccess(res.data.message));
    }
  }).catch(error => {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(deleteEventFailure('Please supply the event Id'));
      }
    }
  })
}