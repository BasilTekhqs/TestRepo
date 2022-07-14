import {
  SET_PROPERTY_DATA,
  SET_APPOINTMENT_DATA,
  SET_RENTAL_OFFER,
  SET_TENANCY_ID,
  SET_PROPERTY_COMPLIANCE_DATA,
} from '../constants/propertyConstants';

export const setProperty = (data: any) => {
  return {
    type: SET_PROPERTY_DATA,
    payload: data,
  };
};
export const setAppointment = (data: any) => {
  return {
    type: SET_APPOINTMENT_DATA,
    payload: data,
  };
};
export const setRentalOffer = (data: any) => {
  return {
    type: SET_RENTAL_OFFER,
    payload: data,
  };
};
export const setTenancyId = (data: any) => {
  return {
    type: SET_TENANCY_ID,
    payload: data,
  };
};
export const setPropertyCompliance = (data: any) => {
  return {
    type: SET_PROPERTY_COMPLIANCE_DATA,
    payload: data,
  };
};
