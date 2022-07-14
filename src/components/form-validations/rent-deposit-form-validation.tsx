const rentDepositFormValidation = (values: any, data: any) => {
  const errorList: any = {};
  if (!values.rent) {
    errorList.rent = 'Monthly rent is required';
  }
  if (values.deposit > 30) {
    errorList.deposit =
      'Sorry the property is not suitable for the amount of tenants selected';
  }

  if (!values.deposit) {
    errorList.deposit = 'Number of people is required';
  }
  if (values.rent < 10) {
    errorList.rent =
      'Sorry this offer is much lower than  the minimum allowed advertised rent  £10 ';
  }

  return errorList;
};

export default rentDepositFormValidation;
