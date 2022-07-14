import moment from 'moment';
const insuranceDocFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.number) {
    errorList.number = 'Policy number is required';
  }
  if (!values.insurerName) {
    errorList.insurerName = 'Insurer name is required';
  } 
  if (!values.issueDate) {
    errorList.issueDate = 'Certificate issue date is required';
  } else if (moment().diff(moment(values.issueDate).format(), 'days') < 0) {
    errorList.issueDate = 'Invalid issue Date';
  }
  if (!values.startDate) {
    errorList.startDate = 'Start date is required';
  } 
  if (!values.endDate) {
    errorList.endDate = 'End date is required';
  }
  else if (moment(values.startDate).diff(moment(values.endDate).format(), 'days') > 0) {
    errorList.endDate = 'End date should be after start date';
  }
  return errorList;
};

export default insuranceDocFormValidation;
