import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Image, Container} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {RadioButton} from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import {DatePicker} from '../../components/ui/date-picker';
import PrevAndNextButtons from '../../components/ui/prev-next-buttons';
import ImageContainer from '../../components/ui/image-container';
import {FontFamily} from '../../utils/fontDetails';
import {BooleanData} from '../../assets/local-dataset/local-dataset';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {db, storage} from '../../backend/firebase-config';
import {saveDataWithDocumentName} from '../../backend/firestore-actions';
import {
  PROPERTY_ID_STRING,
  PROPERTY_COMPLIANCE_DOCUMENTS,
} from '../../constants/firebase-constants';
import {setPropertyCompliance} from '../../redux/actions/propertyActions';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationButton } from '../../components/ui/button';
import eicrFormValidation from '../../components/form-validations/eicr-form-validation';

type Props = StackNavigationProp<
  PropertyDocumentsStackParamList,
  'EICRDocument'
>;

const EICRDocument = () => {
  const navigation = useNavigation<Props>();
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const {
  //   propertyComplianceDocuments: {eicrReport},
  //   propertyId,
  // } = useSelector((state: any) => state.property);

  // const {handleChange, values} = useFormik({
  //   initialValues: initialValues,
  //   //validate: values => exmptio(values),
  //   validateOnBlur: true,
  //   validateOnChange: true,
  //   onSubmit: async values => {
  //     const collectionReference = db
  //       .collection(PROPERTY_ID_STRING)
  //       .doc(propertyId.propertyId)
  //       .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
  //     await saveDataWithDocumentName(
  //       'eicrReport',
  //       collectionReference,
  //       values,
  //       true,
  //     );
  //     dispatch(setPropertyCompliance({eicrReport: values}));
  //   },
  // });

  const initialValues = {
    validity: '',
    number: '',
    refrence: '',
    issueDate: '',
    images: '',
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
    validate: eicrFormValidation,
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
      const url = uploadOne(item, `images/eicr-${Date.now()}-${index}-${property?.propertyid}`)
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
        refrence: values.refrence,
        images: images
      }
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(currentProperty.propertyid)
        .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
      await saveDataWithDocumentName(
        'eicrReport',
        collectionReference,
        dataObj,
        true,
      );
      dispatch(setPropertyCompliance({eicrReport: dataObj}));
      setLoading(false)
      navigation.goBack()
      
    }
  };
  return (
    <MainWithHeader
      title="EICR Document Report"
      onClickBack={() => navigation.goBack()}
    >
      <>
      <Box>
          <RadioButton
            title="Do you have a valid Report?"
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
          inputTitle="Please enter your EICR Document number"
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
          inputTitle="Please enter certificate reference"
          dropdown={false}
          onChange={e => {
            setFieldValue('refrence', e);
          }}
          onBlur={() =>
            setFieldTouched('refrence', true)
          }
        />
        {errors?.refrence && touched.refrence && (
          <Text style={styles.errorText}>{errors?.refrence}</Text>
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
        <Text style={styles.TextStyle}>
          Please upload photos of your report
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
export default EICRDocument;
const styles = StyleSheet.create({
  InnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateStyle: {
    color: 'black',
    fontSize: 14,
    fontFamily: FontFamily.bold,
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
