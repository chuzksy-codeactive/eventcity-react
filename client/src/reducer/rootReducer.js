import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  userReducer,
  authReducer,
  form: formReducer
});

export default rootReducer;
