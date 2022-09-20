import {
  GET_PROFILE,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  LOGOUT,
} from './types';
import axios from 'axios';
import { setAlert } from './alert-action';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};
//  Get my profile
export const getMyProfile = () => async (dispatch) => {
  // I am supposed to be already logged in and the token is set in axios
  try {
    const res = await axios.get('/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createOrUpdateProfile =
  (formData, navigate, update = false) =>
  async (dispatch) => {
    // I am supposed to be already logged in and the token is set in axios
    try {
      const res = await axios.post('/profile', formData, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(update ? 'Profile Updated' : 'Profile Created', 'success')
      );

      if (!update) {
        navigate('/dashboard');
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// delete my whole account
export const deleteAccount = () => async (dispatch) => {
  // I am supposed to be already logged in and the token is set in axios
  try {
    await axios.delete('/profile/me');
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Your account has been permanently deleted'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
