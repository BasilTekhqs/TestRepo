import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Box, Text, Image, Container } from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import { RadioButton } from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import { DatePicker } from '../../components/ui/date-picker';
import ImageContainer from '../../components/ui/image-container';
import { FontFamily } from '../../utils/fontDetails';
import { BooleanData } from '../../assets/local-dataset/local-dataset';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { PropertyDocumentsStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../backend/firebase-config';
import { saveDataWithDocumentName } from '../../backend/firestore-actions';
import {
  PROPERTY_ID_STRING,
  PROPERTY_COMPLIANCE_DOCUMENTS,
} from '../../constants/firebase-constants';
import { setPropertyCompliance } from '../../redux/actions/propertyActions';
import { validator } from '../../components/validation/validator';
import insuranceDocFormValidation from '../../components/form-validations/insurance-document-validation-form';
import { NavigationButton } from '../../components/ui/button';
import { validationCheck } from '../../components/validation/validationCheck';
import AsyncStorage from '@react-native-community/async-storage';

type Props = StackNavigationProp<
  PropertyDocumentsStackParamList,
  'InsuranceDoc'
>;

const InsuranceDoc = () => {
  const navigation = useNavigation<Props>();
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const {
  //   propertyComplianceDocuments: {insuranceDoc},
  //   propertyId,
  // } = useSelector((state: any) => state.property);

  const initialValues = {
    validity: '',
    number: '',
    insurerName: '',
    issueDate: '',
    startDate: '',
    endDate: '',
    reference: '',
    images: '',
    verified: '',
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
    validate: insuranceDocFormValidation,
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
      const url = uploadOne(item, `images/insurance-${Date.now()}-${index}-${property?.propertyid}`)
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
        validity: values.validity,
        number: values.number,
        issueDate: values.issueDate,
        startDate:values.startDate,
        endDate:values.endDate,
        reference: values.reference,
        verified: values.verified,
        insurerName:values.insurerName,
        images:images
      }
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(currentProperty.propertyid)
        .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
      await saveDataWithDocumentName(
        'insuranceDocument',
        collectionReference,
        dataObj,
        true,
      );
      dispatch(setPropertyCompliance({ insuranceDocument: dataObj }));
      setLoading(false)
      navigation.goBack()

    
   
  }
  };
  return (
    <MainWithHeader
      title="Insurance documents"
      onClickBack={() => navigation.goBack()}
    >
      <>
        <Box>
          <RadioButton
            title="Do you have a valid Insurance?"
            items={BooleanData}
            dir='column'
            onChange={e => {
              setFieldValue('validity', e);
              setFieldTouched('validity', true)
            }}
            value={''}
            name={''}
          />
          {errors?.validity && touched.validity && (
            <Text style={styles.errorText}>{errors?.validity}</Text>
          )}
        </Box>
        <InputBox
          inputTitle="Please enter your policy number"
          dropdown={false}
          onChange={e => {
            setFieldValue('number', e);
          }}
          onBlur={() =>
            setFieldTouched('number', true)
          }
        />
        {errors?.number && touched.number && (
          <Text style={styles.errorText}>{errors?.number}</Text>
        )}
        <InputBox
          inputTitle="Please enter name of insurer"
          dropdown={false}
          onChange={e => {
            setFieldValue('insurerName', e);
          }}
          onBlur={() =>
            setFieldTouched('insurerName', true)
          }
        />
        {errors?.insurerName && touched.insurerName && (
          <Text style={styles.errorText}>{errors?.insurerName}</Text>
        )}

        <DatePicker
          title="Please enter your certificate issue date"
          onChange={(e: string) => {
            setFieldValue('issueDate', e);
            setFieldTouched('issueDate', true)

          }}
        />
        {errors?.issueDate && touched.issueDate && (
          <Text style={styles.errorText}>{errors?.issueDate}</Text>
        )}

        <Text style={styles.texTstyle}>{'What is the coverage period?'}</Text>
        <DatePicker
          title="Start date"
          onChange={(e: string) => {
            setFieldValue('startDate', e);
            setFieldTouched('startDate', true)
          }}
        />
        {errors?.startDate && touched.startDate && (
          <Text style={styles.errorText}>{errors?.startDate}</Text>
        )}
        <DatePicker
          title="End date"
          onChange={(e: string) => {
            setFieldValue('endDate', e);
            setFieldTouched('endDate', true)
          }}
        />
        {errors?.endDate && touched.endDate && (
          <Text style={styles.errorText}>{errors?.endDate}</Text>
        )}
        <Text style={styles.TextStyle}>
          Please upload photos of your certificate
        </Text>
        <ImageContainer totalimage={setResourcePath} path={resourcePath} />
        <View style={{ marginBottom: 10 }}>
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
        </View>
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
      </>
    </MainWithHeader>
  );
};
export default InsuranceDoc;

const styles = StyleSheet.create({
  texTstyle: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 15,
    fontWeight: '500',
  },
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
    fontFamily: FontFamily.bold,
    marginTop: 10,
    width: '88%',
    alignSelf: 'center',
  },
  space: {
    height: responsiveHeight(20),
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  loaderStyle: {
    marginTop: responsiveHeight(4)
  }
});
