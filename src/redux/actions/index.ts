export const set_property_data = (data: any) => {
  return {
    type: 'SET_PROPERTY_DETAILS_DATA',
    payload: data,
  };
};

export const set_tenancy_data = (data: any) => {
  return {
    type: 'SET_TENANCY_DETAILS_DATA',
    payload: data,
  };
};

export const set_tenancy_reqs_data = (data: any) => {
  return {
    type: 'SET_TENANCY_REQUIREMENTS_DATA',
    payload: data,
  };
};

export const update_manage_property_data = (data: any) => {
  return {
    type: 'UPDATE_MANAGE_PROPERTY_DATA',
    payload: data,
  };
};

export const setEICR = (data: any) => {
  return {
    type: 'SET_EICR',
    payload: data,
  };
};

export const setProperty = (data: any) => {
  return {
    type: 'SET_PROPERTY_DATA',
    payload: data,
  };
};

export const updateTenantState = (data: any) => {
  return {
    type: 'UPDATE_TENANT_REFERENCING',
    payload: data,
  };
};
