export const validator = (
  objErrorState: any,
  validationForm: (values: any) => any,
  name: string,
  objState: Object,
) => {
  const error = validationForm(objState)[name];
    const {[name]: _, ...rest} = objErrorState;
    const errorState = error ? {...objErrorState, [name]: error} : rest;    
    return errorState;
};