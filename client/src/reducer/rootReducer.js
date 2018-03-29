import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';
import centerReducer from './centerReducer';
import centerListReducer from './centerListReducer';
import eventCenterReducer from './eventCenterReducer';
import loadCenter from './loadCenter';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  centerReducer,
  centerListReducer,
  eventCenterReducer,
  eventReducer,
  loadCenter,
  form: formReducer
});

export default rootReducer;
