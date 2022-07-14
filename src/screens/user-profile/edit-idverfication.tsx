import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';

import OnBoardingLayout from '../../components/layouts/on-boarding';
import MainHeading from '../../components/ui/main-heading';
import {NavigationButton} from '../../components/ui/button';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<
  UserProfileStackParamList,
  'EditIdVerification'
>;

const EditIdVerification = () => {
  const navigation = useNavigation<Props>();

  return (
    <OnBoardingLayout
      onClickBack={() => navigation.goBack()}
      onClickNext={() => console.log('Next')}
    >
      <Box flex={1}>
        <MainHeading
          title="Account Verification"
          txtcontainer={{alignSelf: 'center'}}
        />
        <Text
          alignSelf={'center'}
          fontSize="14px"
          maxWidth={'70%'}
          fontWeight={'600'}
          textAlign="center"
        >
          Please select a legal form of ID for your Sucasa account.
        </Text>
      </Box>
      <NavigationButton
        text="Skip"
        btnStyle={styles.buttonStyle}
        txtStyle={styles.buttonTextStyle}
        onPress={() => console.log('Skip ')}
      />
    </OnBoardingLayout>
  );
};

export default EditIdVerification;

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 5,
    backgroundColor: '#FD9926',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '91%',
  },
  buttonTextStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
});
