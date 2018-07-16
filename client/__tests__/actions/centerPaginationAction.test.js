import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as actionType from '../../src/actions/actionTypes';
import centers from '../__mocks__/centers';
import {
  searchCenterPerPage
} from '../../src/actions/centerPaginationAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Center Pagination Test', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall());

  describe('Handles pagination for centers', () => {
    it('should return 200 on a succesfull pagination', async (done) => {
      moxios.stubRequest('/api/v1/centers/page/1', {
        status: 200,
        response: {
          data: centers,
          count: 14,
          limit: 5,
          pages: 3
        }
      });

      const expectedActions = [{
        type: actionType.SEARCHING_CENTER_PER_PAGE
      },
      {
        type: actionType.SEARCH_CENTER_PER_PAGE_SUCCESSFULL,
        payload: {
          data: centers,
          count: 14,
          limit: 5,
          pages: 3
        }
      },
    ];

    const store = mockStore({});
    store.dispatch(searchCenterPerPage(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
    })
    it('should return 400 when pagination failed', async (done) => {
      moxios.stubRequest('/api/v1/centers/page/1', {
        status: 400,
        response: {
          message: 'Invalid page number, should start with 1'
        }
      });

      const expectedActions = [{
        type: actionType.SEARCHING_CENTER_PER_PAGE
      },
      {
        type: actionType.SEARCH_CENTER_PER_PAGE_FAILURE,
        payload: 'Invalid page number, should start with 1'
      },
    ];

    const store = mockStore({});
    store.dispatch(searchCenterPerPage(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
    })
  })
})