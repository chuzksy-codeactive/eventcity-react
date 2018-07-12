import createHistory from 'history/createBrowserHistory';
import * as types from './actionTypes';
import axios from 'axios';

const history = createHistory();

/**
 * Action Creators fetching events. To indicate that 
 * the it is fetching data 
 * 
 * @return {object}  action [FETCHING_CENTER_EVENT]
 */
export const fetchingEventCenter = () => ({
  type: types.FETCHING_CENTER_EVENT
});

/**
 * Action Creator to indicate that there's a failure
 * in fetching events for a center
 * 
 * @return {object}  action [FETCHING_CENTER_EVENT_FAILURE]
 */
export const fetchEventCenterFailure = payload => ({
  type: types.FETCH_CENTER_EVENT_FAILURE,
  payload
});

/**
 * Action Creator to indicate that events are fetched
 * successfully
 * 
 * @param {object} payload event's data
 * @return {object}  action [FETCHING_CENTER_EVENT_SUCCESS]
 */
export const fetchEventCenterSuccess = payload => ({
  type: types.FETCH_CENTER_EVENT_SUCCESS,
  payload
});

/**
 * Action Creator to fetch events for a center 
 * by making a GET http request to the server
 * 
 * @param {number} id event Id 
 * @return {void}
 */
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

/**
 * Action Creator to indicate to the app that the event is 
 * creating
 * 
 * @return {object}  action [CREATING_EVENT]
 */
export const creatingEvent = () => ({
  type: types.CREATING_EVENT
});

/**
 * Action Creators to indicate to the app that there's a 
 * failure creating an event
 * 
 * @param {object} payload event data
 * @return {object}  action [CREATE_EVENT_FAILURE]
 */
export const createEventFailure = payload => ({
  type: types.CREATE_EVENT_FAILURE,
  payload
});

/**
 * Action Creator to indicate that app has successfully 
 * created an event
 * 
 * @param {object} payload centers data
 * @return {object}  action [CREATE_EVENT_SUCCESS]
 */
export const createEventSuccess = payload => ({
  type: types.CREATE_EVENT_SUCCESS,
  payload
});

/**
 * Action Creator to reset the event state
 * 
 * @return {object}  action [RESET_EVENT]
 */
export const resetEvent = () => {
  return {type: types.RESET_CENTER_EVENT}
};

/**
 * Action create an event by making a POST http request
 * to the backend
 * 
 * @param {object} data event's data to create
 * @return {void}
 */
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
      setTimeout(() => {
        dispatch(resetEvent());
      }, 2000)
    });
};

/**
 * Action Creator to indicate that the app is fetching events
 * 
 * @return {object}  action [FETCHING_EVENT]
 */
export const fetchingEvent = () => ({
  type: types.FETCHING_EVENT
});

/**
 * Action Creator to indicate that the app has successfully 
 * fetched the events
 * 
 * @param {object} payload event's data
 * @return {object}  action [FETCHING_EVENT_SUCCESS]
 */
export const fetchEventSuccess = payload => ({
  type: types.FETCH_EVENT_SUCCESS,
  payload
});

/**
 * Action Creator to indicate that there's a failure trying 
 * to fetch events
 * 
 * @param {object} payload event's data
 * @return {object}  action [FETCHING_EVENT_FAILURE]
 */
export const fetchEventFailure = payload => ({
  type: types.FETCH_EVENT_FAILURE,
  payload
});

/**
 * Action to fetch events from the backend by making a 
 * GET http request
 * 
 * @return {void}
 */
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

/**
 * Action Creator to indicate that the app is fetching 
 * an event by it's ID
 * 
 * @return {object}  action [FETCHING_EVENT_BY_ID]
 */
export const fetchingEventById = () => ({
  type: types.FETCHING_EVENT_BY_ID
});

/**
 * Action Creator to indicate that the app has fetched the 
 * events by its Id successfully 
 * 
 * @param {object} payload event data
 * @return {object}  action [FETCHING_EVENT_BY_ID]
 */
export const fetchEventByIdSuccess = payload => ({
  type: types.FETCH_EVENT_BY_ID,
  payload
});

/**
 * Action Creator to indicate that there's a failure
 * trying to fetch an event by its ID
 * 
 * @param {object} payload events failure info
 * @return {object}  action [FETCH_EVENT_BY_ID_FAILURE]
 */
export const fetchEventByIdFailure = payload => ({
  type: types.FETCH_EVENT_BY_ID_FAILURE,
  payload
});

/**
 * Action to handle fetching of events by Id by making
 * GET http request to the backend
 * 
 * @param {number} id event id
 * @return {void}
 */
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

/**
 * Action Creators to indicate that the app is updating
 * an event
 * 
 * @return {object}  action [UPDATING_EVENT_BY_ID]
 */
export const updatingEvent = () => ({
  type: types.UPDATING_EVENT_BY_ID
});

/**
 * Action Creators to indicate that there's a failure
 * trying to update an event
 * 
 * @param {object} payload event failure info
 * @return {object}  action [UPDATING_EVENT_BY_ID_FAILURE]
 */
export const updateEventFailure = payload => ({
  type: types.UPDATE_EVENT_BY_ID_FAILURE,
  payload
});

/**
 * Action Creators to indicate that the app has successfully
 * updated an event
 * 
 * @param {object} payload event success info
 * @return {object}  action [UPDATING_EVENT_BY_ID_SUCCESS]
 */
export const updateEventSuccess = payload => ({
  type: types.UPDATE_EVENT_BY_ID_SUCCESS,
  payload
});

/**
 * Action to handle the updating of an event by making 
 * PUT request to the backend
 * 
 * @param {object} data event data to update
 * @return {void}
 */
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
      centerId: data.centerId,
      startDate: data.startDate,
      endDate: data.endDate
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
          dispatch(updateEventSuccess('Event not available for this date.'));
        } else if (error.response.status === 404){
          dispatch(updateEventSuccess(`Event with ID ${data.id} not found`));
        } else {
          dispatch(updateEventFailure('Server error'));
        }
      }
    });
};

/**
 * Action Creators to indicate that the app is deleting
 * an event
 * 
 * @return {object}  action [DELETING_EVENT_BY_ID]
 */
export const deletingEvent = () => ({
  type: types.DELETING_EVENT_BY_ID
});

/**
 * Action Creators to indicate that there's a failure 
 * trying to delete an event
 * 
 * @param {object} payload failure info
 * @return {object}  action [DELETE_EVENT_BY_ID_FAILURE]
 */
export const deleteEventFailure = payload => ({
  type: types.DELETE_EVENT_BY_ID_FAILURE,
  payload
});

/**
 * Action Creators to indicate that the app has successfully
 * deleted an event
 * 
 * @param {object} payload deleted event info
 * @return {object}  action [DELETE_EVENT_BY_ID_SUCCESS]
 */
export const deleteEventSuccess = payload => ({
  type: types.DELETE_EVENT_BY_ID_SUCCESS,
  payload
});

/**
 * Action Creator to indicate that an event has 
 * been deleted
 * 
 * @param {number} id event's Id to delete
 * @return {object}  action [DELETE_EVENT_BY_ID]
 */
export const eventDeleted = id => {
  return {
    type: types.DELETED_EVENT_BY_ID,
    id
  }
}

/**
 * Action to handle the deleting of an event by making a DELETE
 * request to the backend
 * @param {number} id event's Id
 * @return {void}]
 */
export const deleteEventById = id => dispatch => {
  dispatch(deletingEvent());
  axios({
    url: `/api/v1/events/${id}`,
    method: 'delete',
  }).then(res => {
    if (res.status === 200){
      dispatch(eventDeleted(id));
    }
  }).catch(error => {
    if (error.response) {
      if (error.response.status === 400) {
        dispatch(deleteEventFailure('Please supply the event Id'));
      }
    }
  })
}