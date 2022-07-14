import moment from 'moment';
const gasSafetyFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.number) {
    errorList.number = 'Gas safety ID is required';
  } else if (values.number.length !== 6) {
    errorList.number = 'Gas safety ID should be 6 characters long';
  } 
  if (!values.engineerName) {
    errorList.engineerName = 'Engineer Name is required';
  } 
  if (!values.issueDate) {
    errorList.issueDate = 'Certificate issue date is required';
  } else if (moment().diff(moment(values.issueDate).format(), 'days') <= 0) {
    errorList.issueDate = 'Invalid Certificate Date';
  }
  if (!values.inspectionDate) {
    errorList.inspectionDate = 'Next inspection date is required';
  } else if (moment(values.issueDate).diff(moment(values.inspectionDate).format(), 'days') > 0) {
    errorList.inspectionDate = 'Next inspection date should be in future';
  }
  
  

  return errorList;
};

export default gasSafetyFormValidation;
