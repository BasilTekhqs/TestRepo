import moment from 'moment';
const personalDetailFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.title) {
    errorList.title = 'Title is required';
  }
  if (!values.firstName) {
    errorList.firstName = 'First name is required';
  } else if (values.firstName.length < 2) {
    errorList.firstName = 'First name should have atleast two alphabets';
  } else if (/\d/.test(values.firstName)) {
    errorList.firstName = 'First name should not contain any numbers';
  }
  if (!values.surname) {
    errorList.surname = 'Surname is required';
  } else if (values.surname.length < 2) {
    errorList.surname = 'Surname should have atleast two alphabets';
  } else if (/\d/.test(values.surname)) {
    errorList.surname = 'Surname should not contain any numbers';
  }

  if (!values.dateOfBirth) {
    errorList.dateOfBirth = 'Date of Birth is required';
  } else if (moment().diff(moment(values.dateOfBirth).format(), 'years') < 18) {
    errorList.dateOfBirth = 'Age should be greater than 18';
  }

  return errorList;
};

export default personalDetailFormValidation;
