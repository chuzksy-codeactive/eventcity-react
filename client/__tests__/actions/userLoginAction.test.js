import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as actionType from '../../src/actions/actionTypes';
import {
  userSignUp,
  userSignIn
} from '../../src/actions/userLoginAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users Test', () => {
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
      const expectedActions = [{
          type: actionType.SIGNING_IN_USER
        },
        {
          type: actionType.AUTHENTICATED,
          payload: true
        },
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
      store.dispatch(userSignUp({
        id: 1,
        firstName: 'CHUZKSY',
        lastName: 'YEMI'
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
    it('should return 404/409 when user is trying to signup with wrong credentials', async (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 409,
        response: {
          message: 'Username is already taken' || 'Email is already taken'
        }
      });
      const expectedActions = [{
          type: actionType.SIGNING_IN_USER
        },
        {
          type: actionType.SIGN_IN_ERROR,
          payload: 'Username is already taken' || 'Email is already taken'
        },
        {
          type: actionType.UNAUTHENTICATED,
        }
      ];
      const store = mockStore({});
      store.dispatch(userSignUp({
        id: 1,
        firstName: 'chuzksy',
        lastName: 'YEMI'
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should return 400 when user signs up with empty field like username ', async (done) => {
      moxios.stubRequest('/api/v1/users', {
        status: 400,
        response: {
          message: 'Username is required'
        }
      });
      const expectedActions = [{
          type: actionType.SIGNING_IN_USER
        },
        {
          type: actionType.SIGN_IN_ERROR,
          payload: 'Username is required'
        },
        {
          type: actionType.UNAUTHENTICATED,
        }
      ];
      const store = mockStore({});
      store.dispatch(userSignUp({
        id: 1,
        firstName: 'chuzksy',
        lastName: 'YEMI'
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });

    it('should sign in a user', async (done) => {

      moxios.stubRequest('/api/v1/users/login', {
        status: 202,
        response: {
          message: 'Logged in successfully',
          token: 'falsfjaldkjfalkfja;klsjfd;kaldjf',
          data: {
            id: 1,
            firstname: 'chika',
            lastname: 'onuchukwu',
            username: 'chuzksy',
            password: 'password'
          }
        }
      });

      const expectedActions = [{
        type: actionType.SIGNING_IN_USER
      }, {
        type: actionType.AUTHENTICATED,
        payload: true
      }, {
        type: actionType.SIGNIN_USER_SUCCESS,
        payload: {
          data: {
            id: 1,
            firstname: 'chika',
            lastname: 'onuchukwu',
            username: 'chuzksy',
            password: 'password'
          },
          message: 'Logged in successfully',
          token: 'falsfjaldkjfalkfja;klsjfd;kaldjf'
        }
      }];

      const store = mockStore({});
      store.dispatch(userSignIn({
        id: 1,
        firstname: 'chuzksy',
        lastname: 'yemi'
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    })

    it('should not sign in user with wrong password', async (done) => {

      moxios.stubRequest('/api/v1/users/login', {
        status: 401,
        response: {
          message: 'Wrong password',
        }
      });

      const expectedActions = [{
        type: actionType.SIGNING_IN_USER
      }, {
        type: actionType.SIGN_IN_ERROR,
        payload: 'Wrong password'
      }, {
        type: actionType.UNAUTHENTICATED
      }];

      const store = mockStore({});
      store.dispatch(userSignIn({
        id: 1,
        firstname: 'chuzksy',
        lastname: 'yemi',
        password: 'jh'
      }, {
        push: () => {}
      })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      })
    })

  });


});