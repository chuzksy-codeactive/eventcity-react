import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as actionType from '../../src/actions/actionTypes';
import centers from '../__mocks__/centers';
import {
  createCenter,
  updateCenter,
  deleteCenter,
  fetchCenter,
  resetCenterEvent
} from '../../src/actions/centerAction'


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Center Test', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall());

  describe('Create a center', () => {
    it('should be able to create a center', async (done) => {
      moxios.stubRequest('/api/v1/centers', {
        status: 201,
        response: {
          message: 'New center has been created succefully',
          data: centers
        }
      });
      const expectedActions = [{
          type: actionType.CREATING_CENTER
        },
        {
          type: actionType.CENTER_CREATED_SUCCESS,
          payload: {
            message: 'New center has been created succefully',
            data: centers
          }
        },
      ];
      const store = mockStore({});
      store.dispatch(createCenter({
        name: 'Kizitos Place',
        capacity: 2000,
        location: 'Ikeja',
        price: 300000,
        facilities: 'Chairs, Tables, ACs, Security',
        type: 'Hall',
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 409 for already exist centers', async (done) => {
      moxios.stubRequest('/api/v1/centers', {
        status: 409,
        response: {
          message: 'Center name already exist'
        }
      });
      const expectedActions = [{
          type: actionType.CREATING_CENTER
        },
        {
          type: actionType.CENTER_CREATED_FAILURE,
          payload: 'Center name already exist'
        },
      ];
      const store = mockStore({});
      store.dispatch(createCenter({
        name: 'Kizitos Place',
        capacity: 2000,
        location: 'Ikeja',
        price: 300000,
        facilities: 'Chairs, Tables, ACs, Security',
        type: 'Hall',
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('should return 400 for supplying no center name', async (done) => {
      moxios.stubRequest('/api/v1/centers', {
        status: 400,
        response: {
          message: 'capacity is required'
        }
      });
      const expectedActions = [{
          type: actionType.CREATING_CENTER
        },
        {
          type: actionType.CENTER_CREATED_FAILURE,
          payload: 'capacity is required'
        },
      ];
      const store = mockStore({});
      store.dispatch(createCenter({
        location: 'Ikeja',
        price: 300000,
        facilities: 'Chairs, Tables, ACs, Security',
        type: 'Hall',
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })
  describe('Fetching Centers', () => {
    it('should fetch all centers', async (done) => {
      moxios.stubRequest('/api/v1/centers', {
        status: 200,
        response: {
          data: centers
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_CENTER,

        },
        {
          type: actionType.FETCHING_CENTER_SUCCESS,
          payload: centers
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchCenter()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

    })
    it('should fetch all centers', async (done) => {
      moxios.stubRequest('/api/v1/centers', {
        status: 404,
        response: {
          message: 'No center found in the database, Create a new center'
        }
      });
      const expectedActions = [{
          type: actionType.FETCHING_CENTER,

        },
        {
          type: actionType.FETCHING_CENTER_ERROR,
          payload: 'No center found in the database, Create a new center'
        },
      ];
      const store = mockStore({});
      store.dispatch(fetchCenter()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });

    })
  })
  describe('Updating Centers', () => {
    it('should should centers', async (done) => {
      await moxios.stubRequest('/api/v1/centers/4', {
        status: 201,
        response: {
          message: 'Center is sucessfully updated',
          data: centers
        }
      });
      const expectedActions = [{
          type: actionType.UPDATING_CENTER,

        },
        {
          type: actionType.UPDATING_CENTER_SUCCESS,
          payload: {
            message: 'Center is sucessfully updated',
            data: centers
          }
        },
      ];
      const store = mockStore({});
      store.dispatch(updateCenter(centers, () => {
        {
          goBack: () => {}
        }
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
    it('return 404 when center is not found', async (done) => {
      await moxios.stubRequest('/api/v1/centers/4', {
        status: 404,
        response: {
          message: 'Center is not found',
        }
      });
      const expectedActions = [{
          type: actionType.UPDATING_CENTER,
        },
        {
          type: actionType.UPDATING_CENTER_FAILURE,
          payload: 'Center is not found'
        },
      ];
      const store = mockStore({});
      store.dispatch(updateCenter(centers, {
        goBack: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })
  describe('Deleting Centers', () => {
    it('should delete a center by Id', async (done) => {
      moxios.stubRequest('/api/v1/centers/4', {
        status: 200,
        response: {
          message: 'Center is successfully deleted'
        }
      });
      const expectedActions = [{
          type: actionType.CENTER_DELETING,

        },
        {
          type: actionType.CENTER_DELETED,
          id: centers.id
        },
      ];
      const store = mockStore({});
      store.dispatch(deleteCenter(centers.id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    })
  })
})