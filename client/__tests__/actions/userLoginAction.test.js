import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as actionType from '../../src/actions/actionTypes';
import { userSignUp } from '../../src/actions/userLoginAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('User should be able to sign up', () => {
  beforeEach(() => moxios.install(axios));
  afterEach(() => moxios.uninstall());

  describe('Sign up user action', () => {
    it('should sign up as admin', async (done) => {

      moxios.stubRequest('/api/v1/users', {
        status: 201,
        response: {
          data: {
            id: 1,
            firstName: 'CHUZKSY',
            lastName: 'YEMI'
          }
        }
      });

      const expectedActions = [
        { type: actionType.SIGNING_IN_USER },
        { type: actionType.AUTHENTICATED, payload: true },
        {
          type: actionType.SIGNIN_USER_SUCCESS,
          payload: {
           data: {
            id: 1,
            firstName: 'CHUZKSY',
            lastName: 'YEMI'
           }
          }
        }
      ];
      const store = mockStore({});
    
      store.dispatch(userSignUp(
        {
          id: 1,
          firstName: 'CHUZKSY',
          lastName: 'YEMI'
        },
        {push: () => {}}
      )).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
});