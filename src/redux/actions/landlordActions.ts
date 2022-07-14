import {SET_LANDLORD_DETAILS} from '../constants/landlordConstants';

export const setLandLordDetails = (data: any) => {
  return {
    type: SET_LANDLORD_DETAILS,
    payload: data,
  };
};
