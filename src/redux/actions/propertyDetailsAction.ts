import {SET_PROPERTY_DATA} from '../constants/propertyConstants';

export const setProperty = (data: any) => {
  return {
    type: SET_PROPERTY_DATA,
    payload: data,
  };
};
