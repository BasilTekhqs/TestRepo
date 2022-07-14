import {combineReducers} from 'redux';
import property from './property';
import userReducer from './user';
import tenantReducer from './tenant';
import landLoardReducer from './landlord';
import inviteReducer from './invites';

export const allReducers = combineReducers({
  property: property,
  user: userReducer,
  tenant: tenantReducer,
  invites: inviteReducer,
  landlord: landLoardReducer,
});
