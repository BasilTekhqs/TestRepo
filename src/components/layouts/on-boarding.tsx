import {StyleSheet, View} from 'react-native';
import React, {Children} from 'react';
import {Box, Text, Image} from 'native-base';

import {Images} from '../../utils/imgDetails';
import PrevAndNextButtons from '../ui/prev-next-buttons';

type Props = {
  onClickNext: () => void;
  onClickBack: () => void;
  children?: JSX.Element | JSX.Element[];
};

const OnBoardingLayout = ({children, onClickNext, onClickBack}: Props) => {
  return (
    <Box flex={1} bg="#ffff" paddingTop={10} paddingBottom={10}>
      <Box flex={1}>
        <Image
          source={Images.LOGO}
          alignSelf="center"
          mb={3}
          size={20}
          alt="Sucasa"
        />
        {children}
      </Box>
      <Box alignSelf={'center'}>
        <PrevAndNextButtons
          onClickBack={onClickBack}
          onClickNext={onClickNext}
        />
      </Box>
    </Box>
  );
};

export default OnBoardingLayout;

const styles = StyleSheet.create({});
