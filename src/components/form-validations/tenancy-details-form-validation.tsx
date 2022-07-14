import moment from 'moment';
const tenancyDetailsFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.startDate) {
    errorList.startDate = 'Start Date is required';
  }
  if (!values.rent) {
    errorList.rent = 'Rent is required';
  }

  if (!values.terms) {
    errorList.terms = 'Please select one term';
  } 
  if (!values.deposit) {
    errorList.deposit = 'Deposit is required';
  }
  if (!values.refrence) {
    errorList.refrence = 'Refrence is required';
  }
  if (!values.protectionScheme) {
    errorList.protectionScheme = 'Protection Scheme is required';
  }
  if (!values.registrationDate) {
    errorList.registrationDate = 'Registration Date is required';
  }
  else if (moment(values.startDate).diff(moment(values.Registration).format(), 'days') < 0) {
    errorList.registrationDate = 'Registration date should be before start date';
  }
  return errorList;
};

export default tenancyDetailsFormValidation;
