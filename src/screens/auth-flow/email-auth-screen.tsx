import { Alert, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Center, Image, Text } from 'native-base';

import { Images } from '../../utils/imgDetails';
import MainHeading from '../../components/ui/main-heading';
import InputBox from '../../components/ui/input-box';
import { NavigationButton } from '../../components/ui/button';
import { FontFamily } from '../../utils/fontDetails';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import emailAuthFormValidation from '../../components/form-validations/email-Auth-Form-Validation';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderTop from '../../components/ui/header-top';
import auth from '@react-native-firebase/auth';
import { useFormik } from 'formik';


type Props = StackNavigationProp<AuthStackParamList, 'emailAuthScreen'>;

const EmailAuthScreen = () => {
  const navigation = useNavigation<Props>();
  const initialValues= {
    email:'',
    password:'',
    rePassword:'',
  };

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    isValid
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validate: emailAuthFormValidation,
    onSubmit:()=>{}
  });
  const onSubmit = async (values:any) => {

    if (isValid && Object.keys(touched).length > 0) {
      try {
        const user = await auth().createUserWithEmailAndPassword(
          values.email,
          values.password,
        );
        user.user.sendEmailVerification();
        Alert.alert(
          'Account Created',
          'We have sent you an email. Please verify and proceed with login',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('signin'),
              style: 'cancel',
            },
          ],
        );
      } catch (error) {
        Alert.alert('User Exists',
          error?.code === 'auth/email-already-in-use'
            ? 'The email address is already in use by another account'
            : error?.message, [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]);
      }
    }
  };



  return (
    <ScrollView>
      <Box flex={1} bg="#fff" paddingTop={10} paddingBottom={10}>
        <HeaderTop
          BellIcon={Images.LINE}
          logo={Images.LOGO}
          onClickBack={() => navigation.goBack()}
        />
        <Box alignSelf={'center'} my="2" alignItems={'center'}>
          <MainHeading
            title="What is your email address?"
            txtcontainer={{}}
            textStyle={{}}
          />
          <Text
            mt={4}
            fontSize="14px"
            maxWidth={'70%'}
            fontFamily={FontFamily.bold}
            textAlign="center"
          >
            Please provide your email, we’ll send you a link to sign in
            instantly
          </Text>
        </Box>
        <InputBox
          inputTitle="Email"
          dropdown={false}
          onChange={val => setFieldValue('email', val.trim() )}
          onBlur={()=>setFieldTouched('email',true)}
        />
        {errors.email &&touched.email&& <Text style={styles.errorText}>{errors?.email}</Text>}
        <InputBox
          inputTitle="Password"
          dropdown={false}
          onChange={val => { setFieldValue('password',val)}}
          onBlur={()=>setFieldTouched('password',true)}
          secured={false}
        />
        {errors.password && touched.password && (
          <Text style={styles.errorText}>{errors?.password}</Text>
        )}
        <InputBox
          inputTitle="Re-enter Password"
          dropdown={false}
          onChange={val => { setFieldValue('rePassword',val)}}
          secured={false}
          onBlur={()=>setFieldTouched('rePassword',true)}
        />
        {errors.rePassword&& touched.rePassword && (
          <Text style={styles.errorText}>{errors?.rePassword}</Text>
        )}
        <NavigationButton
          text="Next"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => onSubmit(values)}
        />
      </Box>
    </ScrollView>
  );
};

export default EmailAuthScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#3F97A0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(8),
    marginVertical: responsiveHeight(0.5),
    marginRight: responsiveWidth(5)
  },
});
