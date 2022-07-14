import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Box, Text} from 'native-base';
import {FontFamily} from '../../utils/fontDetails';
import OnBoardingLayout from '../../components/layouts/on-boarding';
import MainHeading from '../../components/ui/main-heading';
import {NavigationButton} from '../../components/ui/button';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<AuthStackParamList, 'idverification'>;

const IdVerification = () => {
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
        <Text style={styles.txtStyle}>
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

export default IdVerification;

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
  txtStyle: {
    alignSelf: 'center',
    fontSize: 14,
    maxWidth: '70%',
    textAlign: 'center',
    fontFamily: FontFamily.bold,
  },
});
