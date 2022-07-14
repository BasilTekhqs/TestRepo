const inviteGuarantorValidation = (values: any, data: any) => {
  const errorList: any = {};
  if (!values.name) {
    errorList.name = 'First Name is required';
  }
  if (!values.last_name) {
    errorList.last_name = 'Last Name is required';
  }
  if (!values.email) {
    errorList.email = 'Email is required';
  }
  return errorList;
};

export default inviteGuarantorValidation;
