import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Image, Container} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';
import {NavigationButton} from '../../components/ui/button';
import ImageContainer from '../../components/ui/image-container';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { useFormik } from 'formik';
import { storage, db } from '../../backend/firebase-config';
import { saveDataWithDocumentName } from '../../backend/firestore-actions';
import selectiveLicenceFormValidation from '../../components/form-validations/selective-licence-form-validation';
import { PROPERTY_ID_STRING, PROPERTY_COMPLIANCE_DOCUMENTS } from '../../constants/firebase-constants';
import { setPropertyCompliance } from '../../redux/actions/propertyActions';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import floorPlanFormValidation from '../../components/form-validations/floor-plan-validation';

type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'FloorPlan'>;

const FloorPlan = () => {
  const navigation = useNavigation<Props>();
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    totalArea: '',
  }

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
    validate: floorPlanFormValidation,
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
      const url = uploadOne(item, `images/floorPlan-${Date.now()}-${index}-${property?.propertyid}`)
      return url
    })
    const propertyImages = await Promise.all(promises)
    return propertyImages
  };

  const onSubmit = async () => {
    console.log('here');
    
    if (isValid) {
      setLoading(true)
      const property = await AsyncStorage.getItem(PROPERTY_ID_STRING);
      const currentProperty = JSON.parse(property)
      const images = await uploadAll(currentProperty);
      const dataObj = {
        totalArea: values.totalArea,
        images: images
      }
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(currentProperty.propertyid)
        .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
      await saveDataWithDocumentName(
        'floorPlan',
        collectionReference,
        dataObj,
        true,
      );
      setLoading(false)
      navigation.goBack()

    }
  };

  return (
    <MainWithHeader title="Floorplan" onClickBack={() => navigation.goBack()}>
   
      <InputBox
          inputTitle="What is the sqft of your property?"
          dropdown={false}
          onChange={e => {
            setFieldValue('totalArea', e);
          }}
          onBlur={() =>
            setFieldTouched('totalArea', true)
          }
        />
        {errors?.totalArea && touched.totalArea && (
          <Text style={styles.errorText}>{errors?.totalArea}</Text>
        )}
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
    </MainWithHeader>
  );
};
export default FloorPlan;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fd9926',
    width: '93%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    height: 45,
  },
  txtStyle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  InnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
