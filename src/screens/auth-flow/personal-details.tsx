/* eslint-disable prettier/prettier */
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MainHeading from '../../components/ui/main-heading';
import {RadioButton} from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import {DatePicker} from '../../components/ui/date-picker';
import MainWithHeader from '../../components/layouts/main-with-header';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {Box, FormControl} from 'native-base';
import type {UserIdType} from '../../types/types';
import {useSelector} from 'react-redux';
import personalDetailFormValidation from '../../components/form-validations/personal-detail-form-validation';
import {NavigationButton} from '../../components/ui/button';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {saveDataWithDocumentName} from '../../backend/firestore-actions';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {validationCheck} from '../../components/validation/validationCheck';
import {validator} from '../../components/validation/validator';
import { alertData } from '../../assets/local-dataset/local-dataset';
import moment from 'moment';
import { useFormik } from 'formik';

type Props = StackNavigationProp<AuthStackParamList, 'personaldetails'>;

const PersonalDetails = () => {
  const navigation = useNavigation<Props>();

  const {userId} = useSelector((state: any) => state.user);
  const [showLoading, setShowLoading] = useState(false);

  const initialValues= {
    title:'',
    firstName:'',
    surname:'',
    dateOfBirth:''
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
    validate: personalDetailFormValidation,
    onSubmit:()=>{}
  });



  const onSubmit = async () => {
  
    if (isValid && Object.keys(touched).length > 0) {
      setShowLoading(true);
      const collectionRef = firestore().collection('userId');
      try {
        const obj: UserIdType = {
          userId: userId.userId,
          createdDate: userId.createdAt,
          dob: moment(values.dateOfBirth).format('DD-MM-YYYY'),
          firstName: values.firstName,
          surname: values.surname,
          title: values.title,
        };
        saveDataWithDocumentName(userId.userId, collectionRef, obj);
        navigation.navigate('onboarding');
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
      }
    }
  };

  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <ScrollView>
        <MainHeading
          title="Personal details"
          txtcontainer={{alignSelf: 'center'}}
        />
        <FormControl>
          <Box mt={5}>
            <RadioButton
              title="What is your title?"
              items={['Mr', 'Mrs', 'Miss', 'Ms']}
              dir="column"
              onChange={e => {
                setFieldValue('title', e);
              }}
              value={values.title}
              name={'title'}
            />
            {errors?.title && touched.title &&(
              <Text style={styles.errorText}>{errors?.title}</Text>
            )}
          </Box>
          <InputBox
            inputTitle="First name"
            dropdown={false}
            onChange={val => setFieldValue('firstName', val)}
            onBlur={()=>{setFieldTouched('firstName',true),
            setFieldTouched('firstName',true)
          }}
          />
          {errors?.firstName && touched.firstName &&(
            <Text style={styles.errorText}>{errors?.firstName}</Text>
          )}
          <InputBox
            inputTitle="Surname"
            dropdown={false}
            onChange={val => setFieldValue('surname', val)}
            onBlur={()=>setFieldTouched('surname',true)}
          />
          {errors?.surname && touched.surname &&(
            <Text style={styles.errorText}>{errors?.surname}</Text>
          )}
          <DatePicker
            title={'Date of Birth'}
            onChange={(e: string) => {
              setFieldValue('dateOfBirth',e);
              setFieldTouched('dateOfBirth',true)
            }}
          />
          {errors?.dateOfBirth && touched.dateOfBirth && (
            <Text style={styles.errorText}>{errors?.dateOfBirth}</Text>
          )}
          <NavigationButton
            text="Save"
            btnStyle={styles.buttonStyle}
            txtStyle={{}}
            onPress={() => onSubmit()}
          />
        </FormControl>
        <View style={styles.extraHeight} />
      </ScrollView>
    </MainWithHeader>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  dateStyle: {
    color: 'black',
    fontSize: 14,
  },
  dateView: {
    width: '90%',
    backgroundColor: '#E5E5E5',
    height: 40,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  TextStyle: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    width: '88%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#3F97A0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    width: Platform.OS === 'ios' ? '90%' : '85%',
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  extraHeight: {
    height: responsiveHeight(10),
  },
});
