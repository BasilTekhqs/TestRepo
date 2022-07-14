import {SET_TENANT_DETAILS} from '../constants/tenantConstant';

export const setTenantDetails = (data: any) => {
  return {
    type: SET_TENANT_DETAILS,
    payload: data,
  };
};
