import { ActivityIndicator, Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { TextArea, Box, Text, Container, Image } from 'native-base';
import ModalSelector from 'react-native-modal-selector'
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';
import { RadioButton } from '../../components/ui/radio-button';
import {
  BooleanData,
  furnishData,
  properties,
  bedroomsCount,
  alertData,
  protectionScheme
} from '../../assets/local-dataset/local-dataset';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { PropertOnboardingStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FontFamily } from '../../utils/fontDetails';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { NavigationButton } from '../../components/ui/button';
import { validationCheck } from '../../components/validation/validationCheck';
import propertyDetailFormValidation from '../../components/form-validations/property-details-form-validation';
import { validator } from '../../components/validation/validator';
import Config from 'react-native-config';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PROPERTY_COMPLIANCE_DOCUMENTS, PROPERTY_ID_STRING, TENANT_STRING } from '../../constants/firebase-constants';
import { saveDataWithDocumentName } from '../../backend/firestore-actions';
import { db, storage } from '../../backend/firebase-config';
import { setProperty, set_property_data } from '../../redux/actions';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import ImageContainer from '../../components/ui/image-container';
import { DatePicker } from '../../components/ui/date-picker';
import tenancyDetailsFormValidation from '../../components/form-validations/tenancy-details-form-validation';

type Props = StackNavigationProp<
  PropertOnboardingStackParamList,
  'AddTenancyDetails'
>;

const AddTenancyDetails = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state: any) => state.user);

  const initialValues = {
    startDate: '',
    rent: '',
    terms: '',
    deposit: '',
    protectionScheme: '',
    refrence: '',
    registrationDate: '',
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
    validate: tenancyDetailsFormValidation,
    onSubmit: () => { }
  });

  const uploadOne = async (uri: string, name: any) => {
    try {
      const response = await fetch(uri, name);
      const blob = await response.blob();
      const ref = storage.ref(name);
      const task = ref.put(blob);
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          () => { },
          err => {
            reject(err);
          },
          async () => {
            const url = await task.snapshot.ref.getDownloadURL();
            resolve(url);
            return url
          },
        );
      });
    } catch (err) {
      console.log('uploadImage error: ' + err.message);
    }
  }

  const uploadAll = async (property: any) => {
    const promises = resourcePath.map((item, index) => {
      const url = uploadOne(item, `images/tenancyDetials-${Date.now()}-${index}-${property?.propertyid}`)
      return url
    })
    const propertyImages = await Promise.all(promises)
    return propertyImages
  };

  const onSubmit = async () => {
    if (isValid && Object.keys(touched).length > 0) {
      setLoading(true)
      const property = await AsyncStorage.getItem(PROPERTY_ID_STRING);
      const currentProperty = JSON.parse(property)
      const images = await uploadAll(currentProperty);
      const dataObj = {
        startDate: values.startDate,
        rent: values.rent,
        terms: values.terms,
        deposit: values.deposit,
        refrence: values.refrence,
        protectionScheme: values.protectionScheme,
        registrationDate: values.registrationDate,
        images:images
      }      
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(currentProperty.propertyid)
        .collection(TENANT_STRING);
      await saveDataWithDocumentName(
        'tenancyDetails',
        collectionReference,
        dataObj,
        true,
      );
      setLoading(false)
      navigation.goBack()
    }
  };

  return (
    <MainWithHeader
      title={'Tenancy Details'}
      onClickBack={() => navigation.goBack()}
    >
      <DatePicker
        title="Tenancy Start Date"
        onChange={(e: string) => {
          setFieldValue('startDate', e);
          setFieldTouched('startDate', true)
        }}
      />
      {errors?.startDate && touched.startDate && (
          <Text style={styles.errorText}>{errors?.startDate}</Text>
        )}
      <InputBox
        inputTitle="Rent"
        dropdown={false}
        onChange={val => setFieldValue('rent', val)}
        onBlur={() => setFieldTouched('rent', true)}
      />
      {errors?.rent && touched.rent && (
        <Text style={styles.errorText}>{errors?.rent}</Text>
      )}

      <Box mt={5}>
        <RadioButton
          title="What are the tenancy renewal terms??"
          items={['Rolling monthly contract', 'Fixed term']}
          dir="column"
          onChange={e => {
            setFieldValue('terms', e);
            setFieldTouched('terms', true)
          }}
          value={''}
          name={''}
        />
        {errors?.terms && touched.terms && (
          <Text style={styles.errorText}>{errors?.terms}</Text>
        )}
      </Box>
      <InputBox
        inputTitle="Deposit"
        dropdown={false}
        onChange={val => setFieldValue('deposit', val)}
        onBlur={() => setFieldTouched('deposit', true)}
      />
      {errors?.deposit && touched.deposit && (
        <Text style={styles.errorText}>{errors?.deposit}</Text>
      )}
      <Text style={styles.TextStyle2}>{'Deposit protection scheme'}</Text>
      <ModalSelector
        data={protectionScheme}
        initValue=""
        onChange={(value) => {
          setFieldValue('protectionScheme', value.label)
          setFieldTouched('protectionScheme', true)
        }}
        touchableStyle={styles.picker}
        selectStyle={styles.selectStyle}
      />
      {errors?.protectionScheme && touched.protectionScheme && (
        <Text style={styles.errorText}>{errors?.protectionScheme}</Text>
      )}

      <InputBox
        inputTitle="Refrence"
        dropdown={false}
        onChange={val => setFieldValue('refrence', val)}
        onBlur={() => setFieldTouched('refrence', true)}
      />
      {errors?.refrence && touched.refrence && (
        <Text style={styles.errorText}>{errors?.refrence}</Text>
      )}
      <DatePicker
        title="Registration Date"
        onChange={(e: string) => {
          setFieldValue('registrationDate', e);
          setFieldTouched('registrationDate', true)
        }}
      />
      {errors?.registrationDate && touched.registrationDate && (
          <Text style={styles.errorText}>{errors?.registrationDate}</Text>
        )}
      <ImageContainer totalimage={setResourcePath} path={resourcePath} />
      <Container alignSelf="center">
        <Box
          mt={'20%'}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'center'}
          flexWrap="wrap"
        >
          {resourcePath &&
            resourcePath.map((item: string) => {
              return (
                <Image
                  source={{ uri: item }}
                  alt={'sucasa'}
                  m={2}
                  height={70}
                  width={70}
                />
              );
            })}
        </Box>
      </Container>
      {
        loading ?
          <ActivityIndicator style={styles.loaderStyle} color={'#FD9926'} />
          :
          <NavigationButton
            text="Save"
            btnStyle={styles.buttonStyle}
            txtStyle={{}}
            onPress={() => onSubmit()}
          />
      }
      <View style={styles.space} />
    </MainWithHeader>
  );
};

export default AddTenancyDetails;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#FD9926',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  txtStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  space: {
    height: responsiveHeight(20),
  },
  picker: {
    backgroundColor: '#e8e8e8',
    height: responsiveHeight(7),
    width: Platform.OS === 'ios' ? responsiveWidth(90) : responsiveWidth(80),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
  },
  selectStyle: {
    borderWidth: 0,
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(1.2)
  },
  TextStyle2: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: 'black',
    marginLeft: Platform.OS === 'ios' ? responsiveWidth(6) : responsiveWidth(7),
    marginVertical: responsiveHeight(1),
  },
  horizontalScroll: {
    width: Platform.OS === 'ios' ? responsiveWidth(95) : responsiveWidth(80),
  },
  placesInput: {
    backgroundColor: '#e8e8e8',
    height: responsiveHeight(6.8),
    width: Platform.OS === 'ios' ? responsiveWidth(90) : responsiveWidth(100),
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
    marginLeft: responsiveWidth(7)
  },
  placesList: {
    marginHorizontal: responsiveWidth(5),
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    width: Platform.OS === 'ios' ? '90%' : '85%',
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(8),
    marginVertical: responsiveHeight(1),
  },
  loaderStyle: {
    marginTop: responsiveHeight(4)
  }
});

