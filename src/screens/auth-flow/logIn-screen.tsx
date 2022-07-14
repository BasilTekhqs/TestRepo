import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, Image, Text} from 'native-base';
import {Images} from '../../utils/imgDetails';
import AuthButton from '../../components/ui/auth-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontFamily} from '../../utils/fontDetails';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import Google from '../../components/authProviders/Google';
import Facebook from '../../components/authProviders/Facebook';
import Apple from '../../components/authProviders/Apple';
import { responsiveHeight } from 'react-native-responsive-dimensions';

type Props = StackNavigationProp<AuthStackParamList, 'login'>;

const LogInScreen = () => {
  const navigation = useNavigation<Props>();
  return (
    <Box flex={1} justifyContent={'center'} bg="white">
      <Image alignSelf={'center'} source={Images.LOGO} alt="Sucasa" />
      <Text style={styles.createText}>Create your account</Text>
      <AuthButton
        title="Continue with email"
        btnStyle={styles.continueButtonStyle}
        onPress={() => navigation.navigate('emailAuthScreen')}
      />
      <TouchableOpacity
        style={{marginVertical: 25}}
        onPress={() => navigation.navigate('signin')}
      >
        <Text style={styles.loginTxt}>Log in</Text>
      </TouchableOpacity>
      <Text style={styles.bottomTxt}>
        By siging up, you agree to our{' '}
        <Text style={styles.bottomTxt2}>Terms of Service </Text>
        and acknowledge that our{' '}
        <Text style={styles.bottomTxt2}>Privacy Policy </Text>
        applies to you.
      </Text>
    </Box>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#5890FF',
    borderRadius: 10,
    width: '90%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
  authButtonStyle: {backgroundColor: '#5890FF', width: '90%'},
  appleButtonStyle: {backgroundColor: '#D1D1D6', width: '90%'},
  continueButtonStyle: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  createText: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: FontFamily.bold,
    marginBottom: responsiveHeight(15),
  },
  dividerTxt: {
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  loginTxt: {
    alignSelf: 'center',
    fontSize: 13,
    fontFamily: FontFamily.bold,
    color: '#000000',
  },
  bottomTxt: {
    alignSelf: 'center',
    margin: 10,
    fontFamily: FontFamily.regular,
  },
  bottomTxt2: {
    color: '#03a9fc',
    fontWeight: 'bold',
    fontFamily: FontFamily.medium,
  },
  
});