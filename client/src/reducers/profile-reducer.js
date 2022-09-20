import {
  GET_PROFILE,
  // CLEAR_PROFILE,
  PROFILE_ERROR,
  // UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const ProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
