import {actionTypes} from '../actions/invite';

const intialState = {
  sent: {},
  received: {},
};

const invites = (state = intialState, action: {type: any; payload: any}) => {
  switch (action.type) {
    case actionTypes.ADD_SENT_INVITE:
      const sent = action.payload;
      return {...state, sent};

    case actionTypes.ADD_RECEIVED_INVITE:
      const received = action.payload;
      return {...state, received};

    default:
      return state;
  }
};

export default invites;
