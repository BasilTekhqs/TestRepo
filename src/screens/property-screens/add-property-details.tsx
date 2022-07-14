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
  alertData
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
import { PROPERTY_ID_STRING } from '../../constants/firebase-constants';
import { saveDataWithDocumentName } from '../../backend/firestore-actions';
import { db, storage } from '../../backend/firebase-config';
import { setProperty, set_property_data } from '../../redux/actions';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import ImageContainer from '../../components/ui/image-container';

type Props = StackNavigationProp<
  PropertOnboardingStackParamList,
  'AddPropertyDetails'
>;

const AddPropertyDetails = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation<Props>();
  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);
  const [resourcePath, setResourcePath] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector((state: any) => state.user);

  const initialValues = {
    title: '',
    address: '',
    propertyType: '',
    residentialType: '',
    bedrooms: '',
    bathrooms: '',
    garden: '',
    description: '',
    furnished: '',
    videoLink: ''
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
    validate: propertyDetailFormValidation,
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
      const url = uploadOne(item, `images/property-${Date.now()}-${index}-${property?.propertyid}`)
      return url
    })
    const propertyImages = await Promise.all(promises)
    return propertyImages
  };

  const onSubmit = async (data: any) => {
    if (isValid && Object.keys(touched).length > 0) {
        setLoading(true)
        const collectionRef = firestore().collection(PROPERTY_ID_STRING);
        try {
          let obj: any = {
            landlordId: userId.userId,
            createdDate: moment().format('DD-MM-YYYY'),
            title: data.title,
            address: data.address,
            propertyType: data.propertyType,
            residentialType: data.residentialType,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            garden: data.garden,
            description: data.description,
            furnished: data.furnished,
            videoLink: data.videoLink
          }
          const propertyDoc = await db.collection(PROPERTY_ID_STRING).add(obj)
          const propertyid = { propertyid: propertyDoc.id }
          saveDataWithDocumentName(propertyDoc.id, collectionRef, propertyid);
          let values = { ...obj, ...propertyid }
          // dispatch(set_property_data({propertyId:values}));
          const images = await uploadAll(propertyid)
          saveDataWithDocumentName(propertyDoc.id, collectionRef, { images: images });
          const jsonValue = JSON.stringify(values)
          await AsyncStorage.setItem(PROPERTY_ID_STRING, jsonValue)
          setLoading(false)
          navigation.navigate('Property')

        } catch (error) {
          Alert.alert(error.message)
        }
     
    }
  };

  return (
    <MainWithHeader
      title={'Add information and start managing your property'}
      onClickBack={() => navigation.goBack()}
    >
      <InputBox
        inputTitle="Listing Title"
        dropdown={false}
        onChange={val => setFieldValue('title', val)}
        onBlur={() => setFieldTouched('title', true)}
      />
      {errors?.title && touched.title && (
        <Text style={styles.errorText}>{errors?.title}</Text>
      )}
      <Text style={styles.TextStyle2}>{'Address'}</Text>
      <ScrollView
        horizontal={true}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.horizontalScroll}
      >
        <GooglePlacesAutocomplete
          ref={placesRef}
          placeholder="Select Address"
          query={{
            key: Platform.OS === 'android' ? `${Config.GOOGLE_PLACES_API_KEY_ANDROID}` : `${Config.GOOGLE_PLACES_API_KEY}`,
            language: 'en',
            components: 'country:gb',
          }}
          styles={{
            textInput: styles.placesInput,
            listView: styles.placesList,
          }}
          onPress={data => {
            setFieldValue('address', data?.description);
            setFieldTouched('address', true)
          }}
          listViewDisplayed={false}
          keyboardShouldPersistTaps={'always'}
        />
      </ScrollView>
      {errors?.address && touched.address && (
        <Text style={styles.errorText}>{errors?.address}</Text>
      )}
      <Box mt={5}>
        <RadioButton
          title="Is this a private property or a shared property?"
          items={['Private', 'Shared']}
          dir="column"
          onChange={e => {
            setFieldValue('propertyType', e);
            setFieldTouched('propertyType', true)
          }}
          value={''}
          name={''}
        />
        {errors?.propertyType && touched.propertyType && (
          <Text style={styles.errorText}>{errors?.propertyType}</Text>
        )}
      </Box>
      <Text style={styles.TextStyle2}>{'What type of residential property do you have?'}</Text>
      <ModalSelector
        data={properties}
        initValue=""
        onChange={(value) => {
          setFieldValue('residentialType', value.label)
          setFieldTouched('residentialType', true)
        }}
        touchableStyle={styles.picker}
        selectStyle={styles.selectStyle}
      />
      {errors?.residentialType && touched.residentialType && (
        <Text style={styles.errorText}>{errors?.residentialType}</Text>
      )}
      <Text style={styles.TextStyle2}>{'How many bedrooms are in the property?'}</Text>
      <ModalSelector
        data={bedroomsCount}
        initValue=""
        onChange={(value) => {
          setFieldValue('bedrooms', value.label),
            setFieldTouched('bedrooms', true)
        }}
        touchableStyle={styles.picker}
        selectStyle={styles.selectStyle}
      />
      {errors?.bedrooms && touched.bedrooms && (
        <Text style={styles.errorText}>{errors?.bedrooms}</Text>
      )}
      <RadioButton
        title="Is the property furnished?"
        items={furnishData}
        dir="column"
        onChange={e => {
          setFieldValue('furnished', e);
          setFieldTouched('furnished', true)
        }}
        value={''}
        name={''}
      />
      {errors?.furnished && touched.furnished && (
        <Text style={styles.errorText}>{errors?.furnished}</Text>
      )}
      <Text style={styles.TextStyle2}>{'How many bathrooms are in the property?'}</Text>
      <ModalSelector
        data={bedroomsCount}
        initValue=""
        onChange={(value) => {
          setFieldValue('bathrooms', value.label)
          setFieldTouched('bathroom', true)
        }}
        touchableStyle={styles.picker}
        selectStyle={styles.selectStyle}
      />
      {errors?.bathrooms && touched.bathrooms && (
        <Text style={styles.errorText}>{errors?.bathrooms}</Text>
      )}
      <Box>
        <RadioButton
          title="Does the property have a garden?"
          items={BooleanData}
          dir="column"
          onChange={e => {
            setFieldValue('garden', e === 'No' ? false : true);
            setFieldTouched('garden', true)
          }}
          value={''}
          name={''}
        />
        {errors?.garden && touched.garden && (
          <Text style={styles.errorText}>{errors?.garden}</Text>
        )}
      </Box>
      <Box alignSelf="center" alignItems={'center'} w="100%" my={4}>
        <Text ml="-45" my="2" fontSize={'14px'} fontWeight="500">
          How would you best describe your property?
        </Text>
        <TextArea
          h={'40'}
          w="90%"
          bg={'#E8E8E8'}
          autoCompleteType={undefined}
          onChange={e => {
            setFieldValue('description', e.nativeEvent.text);
          }}
          onBlur={() => setFieldTouched('description', true)
          }
        />
      </Box>
      {errors?.description && touched.description && (
        <Text style={styles.errorText}>{errors?.description}</Text>
      )}
      <InputBox
        inputTitle="Youtube embedded link"
        dropdown={false}
        onChange={(value) => {
          setFieldValue('videoLink', value)
          setFieldTouched('videoLink', true)
        }}
      />
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
            onPress={() => onSubmit(values)}
          />
      }
      <View style={styles.space} />
    </MainWithHeader>
  );
};

export default AddPropertyDetails;

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
    marginLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  loaderStyle: {
    marginTop: responsiveHeight(4)
  }
});

