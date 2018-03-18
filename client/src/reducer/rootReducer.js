import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';
import centerReducer from './centerReducer';
import centerListReducer from './centerListReducer';
import eventCenterReducer from './eventCenterReducer';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  centerReducer,
  centerListReducer,
  eventCenterReducer,
  form: formReducer
});

export default rootReducer;
