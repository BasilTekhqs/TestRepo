import moment from 'moment';
const hmoLicenceFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.totalTenants) {
    errorList.totalTenants = 'Number of tenents is required';
  }
  if (!values.refrence) {
    errorList.refrence = 'Refrence is required';
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

export default hmoLicenceFormValidation;
