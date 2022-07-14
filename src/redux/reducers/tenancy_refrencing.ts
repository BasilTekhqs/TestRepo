const tenancy_referencing = (
  state = {
    'Personal Details': true,
    'Address History': false,
    'Tenancy History': false,
    'Employment History': false,
    'Invite Guarantor': false,
  },
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case 'UPDATE_TENANT_REFERENCING':
      return action.payload;

    default:
      return state;
  }
};

export default tenancy_referencing;
