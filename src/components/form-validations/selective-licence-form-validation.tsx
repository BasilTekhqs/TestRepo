import moment from 'moment';
const selectiveLicenceFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.number) {
    errorList.number = 'Licence number is required';
  }

  if (!values.issueDate) {
    errorList.issueDate = 'Issue date is required';
  } 
  if (!values.endDate) {
    errorList.endDate = 'End date is required';
  }
  else if (moment(values.startDate).diff(moment(values.endDate).format(), 'days') > 0) {
    errorList.endDate = 'End date should be after issue date';
  }
  return errorList;
};

export default selectiveLicenceFormValidation;
