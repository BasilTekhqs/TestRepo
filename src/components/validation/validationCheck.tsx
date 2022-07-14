import { validator } from './validator';
export const validationCheck = (
  objErrorState: any,
  validationForm: (values: any) => any,
  data: any,
) => {
  const errors = data.reduce((total: any, currentValue: any) => {    
    const error = validator(objErrorState, validationForm, Object.keys(currentValue)[0], currentValue);
    const updatedValue = {...total, ...error}        
    return updatedValue
  },{})
  
return errors
};
