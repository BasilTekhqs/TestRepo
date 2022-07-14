const ADD_SENT_INVITE = 'ADD_SENT_INVITE';
const ADD_RECEIVED_INVITE = 'ADD_RECEIVED_INVITE';

export const actionTypes = {
  ADD_SENT_INVITE,
  ADD_RECEIVED_INVITE,
};

export const addSentInvite = data => {
  return {
    type: ADD_SENT_INVITE,
    payload: data,
  };
};

export const addReceivedInvite = data => {
  return {
    type: ADD_RECEIVED_INVITE,
    payload: data,
  };
};
