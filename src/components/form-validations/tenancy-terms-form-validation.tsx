const tenancyTermsFormValidation = (values: any, data: any) => {
  const errorList: any = {};
  if (!values.tenancyTerm) {
    errorList.rent = 'Tenancy term is required';
  }
  if (values.totalTenants > 30) {
    errorList.totalTenants =
      'Sorry the property is not suitable for the amount of tenants selected';
  }

  if (!values.totalTenants) {
    errorList.totalTenants = 'Number of people is required';
  }
  if (values.tenancyTerm < 1) {
    errorList.rent = 'Sorry this offer is much lower than  the minimum allowed';
  }

  return errorList;
};

export default tenancyTermsFormValidation;
