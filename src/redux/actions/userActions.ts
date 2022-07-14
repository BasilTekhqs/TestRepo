import {
  LOGGED_IN_USER,
  LOGGED_OUT_USER,
  LOGGED_IN_ERROR,
  SET_USER_TYPE,
  SET_PERSONAL_DETAILS_ERROR,
  SET_PERSONAL_DETAILS_INFORMATION,
  SET_PERSONAL_DETAILS_ADDRESS,
  SET_TENANTID,
  SET_LANDLORDID,
} from '../constants/userConstants';

export const loggedInUser = (data: any) => {
  return {
    type: LOGGED_IN_USER,
    payload: data,
  };
};

export const loggedOutUser = (data: any) => {
  return {
    type: LOGGED_OUT_USER,
    payload: data,
  };
};

export const loggedInError = (data: any) => {
  return {
    type: LOGGED_IN_ERROR,
    payload: data,
  };
};

export const setUserType = (data: any) => {
  return {
    type: SET_USER_TYPE,
    payload: data,
  };
};

export const setPersonalDetailsInformation = (data: any) => {
  return {
    type: SET_PERSONAL_DETAILS_INFORMATION,
    payload: data,
  };
};

export const setPersonalDetailsAddress = (data: any) => {
  return {
    type: SET_PERSONAL_DETAILS_ADDRESS,
    payload: data,
  };
};

export const setPersonalDetailError = (data: any) => {
  return {
    type: SET_PERSONAL_DETAILS_ERROR,
    payload: data,
  };
};

export const setLandlordId = (data: any) => {
  return {
    type: SET_LANDLORDID,
    payload: data,
  };
};

export const setTenantId = (data: any) => {
  return {
    type: SET_TENANTID,
    payload: data,
  };
};
