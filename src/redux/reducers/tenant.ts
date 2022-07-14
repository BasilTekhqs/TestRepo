import {SET_TENANT_DETAILS} from '../constants/tenantConstant';

const intialState = {
  tenant: {},
};

const tenantReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case SET_TENANT_DETAILS:
      return {...state, tenant: action.payload};
    default:
      return state;
  }
};

export default tenantReducer;
