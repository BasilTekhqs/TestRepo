const addressEditFormValidation = (values: any) => {
  const errorList: any = {};
  if (!values.address) {
    errorList.address = 'Please add address';
  }

  return errorList;
};

export default addressEditFormValidation;
