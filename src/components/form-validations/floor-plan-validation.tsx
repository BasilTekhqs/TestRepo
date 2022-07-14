import moment from 'moment';
const floorPlanFormValidation = (values: any) => {
  const errorList: any = {};

  if (!values.totalArea) {
    errorList.totalArea = 'Area is required';
  }
 
  return errorList;
};

export default floorPlanFormValidation;
