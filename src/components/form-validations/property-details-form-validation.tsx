import moment from 'moment';
const propertyDetailFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.title) {
    errorList.title = 'Title is required';
  }
  if (!values.address) {
    errorList.address = 'Address is required';
  } 
  if (!values.propertyType) {
    errorList.propertyType = 'Property type is required';
  } 
  if (!values.residentialType) {
    errorList.residentialType = 'Residential type is required';
  } 
  if (!values.bedrooms){
    errorList.bedrooms = 'Number of Bedrooms is required';
  } 
  if (!values.furnished) {
    errorList.furnished = 'Furnished type is required';
  } 
  if (!values.bathrooms){
    errorList.bathrooms = 'Number of Bathrooms is required';
  } 
  if (!values.garden){
    errorList.garden = 'Garden Details is required';
  } 
  if (!values.description){
    errorList.description = 'Property Description is required';
  } 
  return errorList;
};

export default propertyDetailFormValidation;
