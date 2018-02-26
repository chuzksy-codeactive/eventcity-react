import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';
import centerReducer from './centerReducer';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  centerReducer,
  form: formReducer
});

export default rootReducer;
