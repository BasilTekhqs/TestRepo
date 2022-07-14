import moment from 'moment';
const emailAuthFormValidation = (values: any) => {
  const passwordFormat = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const errorList: any = {};  
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!emailFormat.test(values.email)) {
    errorList.email = 'Invalid Email Address';
  }
  if (!values.password) {
    errorList.password = 'Password is required';
  } else if (!passwordFormat.test(values.password)) {
    errorList.password =
      'Password should have atleast 8 characters one number and one uppercase letter';
  }
  if (!values.rePassword) {
    errorList.rePassword = 'Please re-enter password';
  } else if (values.password !== values.rePassword) {
    errorList.rePassword = 'Passwords do not match please re-enter correct password';
  }

  return errorList;
};

export default emailAuthFormValidation;
