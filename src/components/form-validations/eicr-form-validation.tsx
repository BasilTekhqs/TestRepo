import moment from 'moment';
const eicrFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.number) {
    errorList.number = 'EICR Document number is required';
  } 
  if (!values.refrence) {
    errorList.refrence = 'Refrence is required';
  } 
  
  if (!values.issueDate) {
    errorList.issueDate = 'Certificate issue date is required';
  } else if (moment().diff(moment(values.issueDate).format(), 'days') <= 0) {
    errorList.issueDate = 'Invalid Certificate Date';
  }
 
  
  

  return errorList;
};

export default eicrFormValidation;
