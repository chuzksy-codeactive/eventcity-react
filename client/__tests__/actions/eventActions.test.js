import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as actionType from '../../src/actions/actionTypes';
import event from '../__mocks__/event';

import {
  createEvent,
  fetchEvent,
  fetchEventById,
  updateEventById,
  deleteEventById,
  fetchEventCenter
} from '../../src/actions/eventActions'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Center Test', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall());

  describe('Create an event test', () => {
    it('should be able to create an event', async (done) => {
      moxios.stubRequest('/api/v1/events', {
        status: 201,
        response: {
          message: 'Event is scheduled successfuly. Thanks',
          data: event
        }
      });

      const expectedActions = [{
          type: actionType.CREATING_EVENT
        },
        {
          type: actionType.CREATE_EVENT_SUCCESS,
          payload: 'Event is scheduled successfuly. Thanks'
        },
        {
          type: actionType.FETCHING_CENTER_EVENT
        }
      ];

      const store = mockStore({});
      store.dispatch(createEvent(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 409 for already booked event', async (done) => {
      moxios.stubRequest('/api/v1/events', {
        status: 409,
        response: {
          message: 'An event has been booked for this date.'
        }
      });

      const expectedActions = [{
          type: actionType.CREATING_EVENT
        },
        {
          type: actionType.CREATE_EVENT_FAILURE,
          payload: 'Unable to book event'
        }
      ];

      const store = mockStore({});
      store.dispatch(createEvent(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 400 when details are not supplied', async (done) => {
      moxios.stubRequest('/api/v1/events', {
        status: 400,
        response: {
          message: 'event name is required'
        }
      });

      const expectedActions = [{
          type: actionType.CREATING_EVENT
        },
        {
          type: actionType.CREATE_EVENT_FAILURE,
          payload: 'event name is required'
        }
      ];

      const store = mockStore({});
      store.dispatch(createEvent(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })

  describe('Fetch event for a center test', () => {
    it('should fetch 200 when an event is found for a center', async (done) => {
      moxios.stubRequest('/api/v1/centers/event/1', {
        status: 200,
        response: {
          message: 'Successfully found a center',
          error: false,
          data: event
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_CENTER_EVENT
        },
        {
          type: actionType.FETCH_CENTER_EVENT_SUCCESS,
          payload: {
            message: 'Successfully found a center',
            error: false,
            data: event
          }
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEventCenter(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 404 when no center is found for an event', async (done) => {
      moxios.stubRequest('/api/v1/centers/event/1', {
        status: 404,
        response: {
          message: 'No center found',
          error: true,
          data: null
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_CENTER_EVENT
        },
        {
          type: actionType.FETCH_CENTER_EVENT_FAILURE,
          payload: 'No center found'
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEventCenter(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should fetch all events', async (done) => {
      moxios.stubRequest('/api/v1/events', {
        status: 200,
        response: {
          data: event
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_EVENT
        },
        {
          type: actionType.FETCH_EVENT_SUCCESS,
          payload: event
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEvent()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should fetch all events', async (done) => {
      moxios.stubRequest('/api/v1/events', {
        status: 404,
        response: {
          message: 'No event is scheduled yet'
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_EVENT
        },
        {
          type: actionType.FETCH_EVENT_FAILURE,
          payload: 'No event is scheduled yet'
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEvent()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should fetch event by Id', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 200,
        response: {
          data: event
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_EVENT_BY_ID
        },
        {
          type: actionType.FETCH_EVENT_BY_ID,
          payload: event
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEventById(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 404 for unbooked events', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 404,
        response: {
          message: 'You are yet to book an event'
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_EVENT_BY_ID
        },
        {
          type: actionType.FETCH_EVENT_BY_ID_FAILURE,
          payload: 'You are yet to book an event'
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchEventById(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })

  describe('Update events test', () => {
    it('should update events', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 200,
        response: {
          message: 'Event successfully updated'
        }
      });
      const expectedActions = [{
          type: actionType.UPDATING_EVENT_BY_ID
        },
        {
          type: actionType.UPDATE_EVENT_BY_ID_SUCCESS,
          payload: 'Event successfully updated'
        },
      ];
      const store = mockStore({});
      store.dispatch(updateEventById(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should not update events with same dates', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 400,
        response: {
          message: 'Not available, please choose another date'
        }
      });
      const expectedActions = [{
          type: actionType.UPDATING_EVENT_BY_ID
        },
        {
          type: actionType.UPDATE_EVENT_BY_ID_SUCCESS,
          payload: 'Event not available for this date.'
        },
      ];
      const store = mockStore({});
      store.dispatch(updateEventById(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should not update unavailable events', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 404,
        response: {
          message: 'Not available, please choose another date'
        }
      });
      const expectedActions = [{
          type: actionType.UPDATING_EVENT_BY_ID
        },
        {
          type: actionType.UPDATE_EVENT_BY_ID_SUCCESS,
          payload: 'Event not found'
        },
      ];
      const store = mockStore({});
      store.dispatch(updateEventById(event)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })

  describe('Delete an event by Id', () => {
    it('should delete an event by id', async (done) => {
      moxios.stubRequest('/api/v1/events/1', {
        status: 200,
        response: {
          message: 'event is successfully deleted' || 'Center Id updated to 0'
        }
      });
      const expectedActions = [{
          type: actionType.DELETING_EVENT_BY_ID
        },
        {
          type: actionType.DELETED_EVENT_BY_ID,
          id: 1
        },
      ];
      const store = mockStore({});
      store.dispatch(deleteEventById(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
    it('should delete an event by id', async (done) => {
      moxios.stubRequest('/api/v1/events/e', {
        status: 400,
        response: {
          message: 'Please supply the event ID'
        }
      });
      const expectedActions = [{
          type: actionType.DELETING_EVENT_BY_ID
        },
        {
          type: actionType.DELETE_EVENT_BY_ID_FAILURE,
          payload: 'Please supply the event Id'
        },
      ];
      const store = mockStore({});
      store.dispatch(deleteEventById('e')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  })

})