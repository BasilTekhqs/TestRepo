import {SET_LANDLORD_DETAILS} from '../constants/landlordConstants';

const intialState = {
  landlord: {},
};

const landLordReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case SET_LANDLORD_DETAILS:
      return {...state, landlord: action.payload};
    default:
      return state;
  }
};

export default landLordReducer;
