const loginFormValidation = (values: any) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const errorList: any = {};
  
  if (!values.email) {
    errorList.email = 'Email is required';
  } else if (!emailFormat.test(values.email)) {
    errorList.email = 'Invalid Email Address';
  }
  if (!values.password) {
    errorList.password = 'Password is required';
  }

  return errorList;
};

export default loginFormValidation;
