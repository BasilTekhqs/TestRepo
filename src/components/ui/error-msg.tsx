import {FormControl, View, WarningOutlineIcon} from 'native-base';
import React from 'react';

const ErrorMsg: React.FC = (props: any) => {
  return (
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
      {props.children}
    </FormControl.ErrorMessage>
  );
};

export default ErrorMsg;
