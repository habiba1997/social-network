import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initilState = [];

// function take state, action(type and payload -data)
const AlertReducer = (state = initilState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // copy the alrets already exit and add to the,
      return [...state, payload];
    case REMOVE_ALERT:
      // payload can be whatever e wanyt, here it is just an id
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default AlertReducer;
