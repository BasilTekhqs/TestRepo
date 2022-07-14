import moment from 'moment';
const epcRatingFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.validity) {
    errorList.validity = 'Validity is required';
  }
  if (!values.number) {
    errorList.number = 'EPC code is required';
  } else if (values.number.length !== 20) {
    errorList.number = 'EPC code should be 20 characters long';
  } 
  if (!values.rating) {
    errorList.rating = 'EPC Rating is required';
  } 
  
  if (!values.issueDate) {
    errorList.issueDate = 'Certificate issue date is required';
  } else if (moment().diff(moment(values.issueDate).format(), 'days') <= 0) {
    errorList.issueDate = 'Invalid Certificate Date';
  }
 
  
  

  return errorList;
};

export default epcRatingFormValidation;
