import { combineReducers } from 'redux';
import alert from './alert-reducer';
import auth from './auth-reducer';
import profile from './profile-reducer';
import post from './post-reducer';

export default combineReducers({
  // you can add here a list of all reducers
  alert,
  auth,
  profile,
  post,
});
