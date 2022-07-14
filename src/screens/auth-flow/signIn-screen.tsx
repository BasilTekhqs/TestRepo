import {StyleSheet, Image, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {Box, Text} from 'native-base';

import {Images} from '../../utils/imgDetails';
import InputBox from '../../components/ui/input-box';
import {NavigationButton} from '../../components/ui/button';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {validationCheck} from '../../components/validation/validationCheck';
import {validator} from '../../components/validation/validator';
import loginFormValidation from '../../components/form-validations/login-validation'
import auth from '@react-native-firebase/auth';
import {checkLoginData} from '../../backend/firestore-actions';
import {useLinkTo} from '@react-navigation/native';
import HeaderTop from '../../components/ui/header-top';
import { useFormik } from 'formik';


type Props = StackNavigationProp<AuthStackParamList, 'signin'>;

const SignIn = () => {
  const navigation = useNavigation<Props>();
  const [email, setEmail] = useState({email: ''});
  const [password, setPassword] = useState({password: ''});
  const [error, setError] = useState<{[key: string]: any}>({});
  const link = useLinkTo();
  const initialValues= {
    email:'',
    password:'',
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
    validate: loginFormValidation,
    onSubmit:()=>{}
  });

  const onSubmit = async (values:any) => {    
    if (isValid && Object.keys(touched).length > 0) {
      try {
        const user = await auth().signInWithEmailAndPassword(
          values.email,
          values.password,
        );
        if(!user.user.emailVerified){
          Alert.alert('Please verify your email to proceed with login')
        }
        else{
        checkLoginData(user.user.uid, link);
        }
      } catch (error) {
        if (error.code === 'auth/user-not-found'){
          Alert.alert('Invalid Credentials User Doesnt Exist')
        }
        else if (error.code === 'auth/wrong-password'){
          Alert.alert('Invalid Password')
        }
        else {
          Alert.alert(error.message)
        }

      }
     
    }
  };

  return (
    <Box flex={1} bg="#fff">
      <HeaderTop
          BellIcon={Images.LINE}
          logo={Images.LOGO}
          onClickBack={()=>navigation.goBack()}
        />
      <Text style={styles.title}>The better way for Landlording on the go</Text>
      <InputBox
        inputTitle="Email"
        dropdown={false}
        onChange={val => setFieldValue('email',val.trim())}
        onBlur={() => setFieldTouched('email',true)}
      />
      {errors.email && touched.email && <Text style={styles.errorText}>{errors?.email}</Text>}
      <InputBox
        inputTitle="Password"
        dropdown={false}
        secured={true}
        onChange={val => setFieldValue('password',val.trim())}
        onBlur={() => setFieldTouched('password',true)}
      />
      {errors.password &&  touched.password && <Text style={styles.errorText}>{error?.password}</Text>}

      <TouchableOpacity style={styles.forgotPasswordBtn}>
        <Text style={styles.forgotPasswordBtnTxt}>Forgot Password?</Text>
      </TouchableOpacity>
      <NavigationButton
        text="Sign in"
        btnStyle={styles.btnStyle}
        onPress={() => onSubmit(values)}
      />
    </Box>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  logoStyle: {
    height: responsiveHeight(20),
    width: responsiveWidth(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
  title: {
    color: 'black',
    textAlign: 'center',
    marginHorizontal: responsiveWidth(25),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(2),
    marginTop:responsiveHeight(10)
  },
  btnStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginRight: responsiveWidth(5),
    marginBottom: responsiveHeight(5),
  },
  forgotPasswordBtnTxt: {
    fontWeight: 'bold',
  },
  seperator: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(5),
    alignItems: 'center',
    alignSelf: 'center',
  },
  hairLine: {
    backgroundColor: '#FD9926',
    width: responsiveWidth(25),
    height: 0.5,
  },
  seperatorText: {
    marginHorizontal: responsiveWidth(2),
  },
  iconStyle: {
    height: responsiveHeight(8),
    width: responsiveWidth(15),
    resizeMode: 'contain',
    marginHorizontal: responsiveWidth(2),
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(8),
    marginVertical: responsiveHeight(0.5),
  },
});
