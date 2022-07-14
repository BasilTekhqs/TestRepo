import { ActivityIndicator, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Box, Text, Image, Container } from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import { RadioButton } from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import { DatePicker } from '../../components/ui/date-picker';
import ImageContainer from '../../components/ui/image-container';
import { FontFamily } from '../../utils/fontDetails';
import { optionData, EPCrating } from '../../assets/local-dataset/local-dataset';
import { PropertyDocumentsStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyCompliance } from '../../redux/actions/propertyActions';
import { saveDataWithDocumentName } from '../../backend/firestore-actions';
import { db, storage } from '../../backend/firebase-config';
import {
  PROPERTY_ID_STRING,
  PROPERTY_COMPLIANCE_DOCUMENTS,
} from '../../constants/firebase-constants';
import * as ImagePicker from 'react-native-image-picker';
import { NavigationButton } from '../../components/ui/button';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ModalSelector from 'react-native-modal-selector';
import epcRatingFormValidation from '../../components/form-validations/epcRating-validation-form';
import AsyncStorage from '@react-native-community/async-storage';

type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'EPCReport'>;

const EPCReportScreen = () => {
  const navigation = useNavigation<Props>();
  const [property, setProperty] = useState({});
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const {
  //   propertyComplianceDocuments: { epcReport },
  //   propertyId,
  // } = useSelector((state: any) => state.property);
  const initialValues = {
    validity: '',
    number: '',
    issueDate: '',
    rating: '',
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
    validate: epcRatingFormValidation,
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
      const url = uploadOne(item, `images/ecp-${Date.now()}-${index}-${property?.propertyid}`)
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
        rating: values.rating,
        images:images
      }      
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(currentProperty.propertyid)
        .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
      await saveDataWithDocumentName(
        'epcReport',
        collectionReference,
        dataObj,
        true,
      );
      dispatch(setPropertyCompliance({ epcReport: dataObj }));
      setLoading(false)
      navigation.goBack()
  }
  };

  return (
    <MainWithHeader title="EPC Report" onClickBack={() => navigation.goBack()}>
      <ScrollView>
        <Box>
          <RadioButton
            title="Do you have a valid report?"
            items={optionData}
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
          inputTitle="Please enter your 20-digit EPC code"
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
        <Text style={styles.TextStyle2}>{'EPC Rating'}</Text>
        <ModalSelector
          data={EPCrating}
          initValue=""
          onChange={(value) => { setFieldValue('rating', value.label),setFieldTouched('rating',true) }}
          touchableStyle={styles.picker}
          selectStyle={styles.selectStyle}
        />
        {errors?.rating && touched.rating &&(
          <Text style={styles.errorText}>{errors?.rating}</Text>
        )}
        <DatePicker
          title={'Issue Date'}
          onChange={(e: string) => {
            setFieldValue('issueDate', e);
            setFieldTouched('issueDate',true)
          }}
        />
        {errors?.issueDate && touched.issueDate && (
          <Text style={styles.errorText}>{errors?.issueDate}</Text>
        )}

        <Text style={styles.textStyle}>
          Please upload photos of your report
        </Text>
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
          <ActivityIndicator style={styles.loaderStyle} color={'#FD9926'}/>
          :
          <NavigationButton
            text="Save"
            btnStyle={styles.buttonStyle}
            txtStyle={{}}
            onPress={() => onSubmit()}
          />
      }
        <View style={{ height: responsiveHeight(20) }} />
      </ScrollView>
    </MainWithHeader>
  );
};

export default EPCReportScreen;

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
  textStyle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    marginTop: 10,
    width: '88%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
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
    marginLeft: responsiveWidth(6),
    marginVertical: responsiveHeight(1),
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  loaderStyle:{
    marginTop:responsiveHeight(4)
  }
});
