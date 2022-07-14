/* eslint-disable prettier/prettier */
import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import MainHeading from '../../components/ui/mainHeading';
import {Box} from 'native-base';
import {NavigationButton} from '../../components/ui/button';
import InputBox from '../../components/ui/inputBox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FontFamily} from '../../utils/fontDetails';
import MainWithHeader from '../../components/layouts/main-with-header';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {UserIdType} from '../../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {db} from '../../backend/firebase-config';
import {
  USER_ID_STRING,
  LANDLORD_ID_STRING,
} from '../../constants/firebase-constants';
import {
  setLandlordId,
  setPersonalDetailsInformation,
} from '../../redux/actions/userActions';
import {docIdGenerator} from '../../backend/firestore-actions';
import {useFormik} from 'formik';
import addressEditFormValidation from '../../components/form-validations/address-edit-form-validation';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GetLocation from 'react-native-get-location';
import Config from 'react-native-config';
import {ScrollView} from 'react-native-gesture-handler';
import {geocoder as conf} from '../../../env.json';
import Geocoder from '@timwangdev/react-native-geocoder';

type Props = StackNavigationProp<AuthStackParamList, 'addressdetails'>;

const AddresDetails = () => {
  const navigation = useNavigation<Props>();
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const {userId} = useSelector((state: any) => state.user);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const intialValues = {
    postcode: '',
  };
  const {handleChange, handleSubmit, handleBlur, values, errors} = useFormik({
    initialValues: intialValues,
    validate: values => addressEditFormValidation(values),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => {
      dispatch(setPersonalDetailsInformation({values}));
    },
  });

  const onSubmit = async () => {
    setShowLoading(true);
    const batch = db.batch();
    const docId = await docIdGenerator(LANDLORD_ID_STRING);

    dispatch(setLandlordId({landlordId: docId}));

    //batch write
    const UserIdBatchRef = db.collection(USER_ID_STRING).doc(userId.userId);
    try {
      const payload = () => {
        const payloadObject: UserIdType = {
          email: userId.email,
          userId: userId.userId,
          createdDate: userId.createdAt,
          dob: userId.dob,
          firstName: userId.firstName,
          surname: userId.surname,
          userFullAddress: userId.userFullAddress,
          title: userId.title,
          mobileNumber: userId.mobileNumber,
        };
        payloadObject.landlordId = docId;
        return payloadObject;
      };
      batch.set(UserIdBatchRef, {...payload()});
      batch.update(db.collection(LANDLORD_ID_STRING).doc(docId), {
        landlordId: docId,
      });
      batch.commit();
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
    }
  };

  const requestLocation = async () => {
    try {
      const Location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
      });
      geocodePosition(
        Location.latitude.toString(),
        Location.longitude.toString(),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const geocodePosition = async (lat: string, lng: string) => {
    try {
      const value = await Geocoder.geocodePosition(
        {
          lat: Number(lat),
          lng: Number(lng),
        },
        conf,
      );

      setResult(value[0].formattedAddress);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <ScrollView horizontal={false}>
        <MainHeading
          title="Your Address"
          txtcontainer={{alignSelf: 'center'}}
        />
        <NavigationButton
          text="Use current location"
          btnStyle={styles.buttonStyleLine}
          txtStyle={{
            color: '#3F97A0',
          }}
          onPress={() => requestLocation()}
        />
        {result ? (
          <InputBox inputTitle="Address" dropdown={false} value={result} />
        ) : null}
        <Box
          flexDirection="row"
          alignItems={'center'}
          alignSelf="center"
          justifyContent={'center'}
          w="90%"
          my={'10'}
          h={5}
        >
          <Box borderWidth={0.5} flex={1} h={0} mr={2} />
          <Text style={styles.seperator}>Or</Text>
          <Box borderWidth={0.5} flex={1} ml={2} h={0} />
        </Box>
        <InputBox
          inputTitle="Postcode"
          dropdown={false}
          onChange={handleChange('postcode')}
          value={values.postcode}
        />
        <NavigationButton
          text="Find my address"
          btnStyle={styles.buttonStyle2}
          txtStyle={{
            color: '#000',
            fontWeight: 'bold',
          }}
          onPress={() =>
            console.log('You have add functionality to find address ')
          }
        />
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <GooglePlacesAutocomplete
            placeholder="Select Address"
            query={{
              key: `${Config.GOOGLE_PLACES_API_KEY}`,
              language: 'en',
              components: 'country:gb',
            }}
            styles={{
              textInput: styles.placesInput,
              listView: styles.placesList,
            }}
          />
        </ScrollView>

        <Box
          w="90%"
          alignSelf={'center'}
          flexDirection="row"
          alignItems={'center'}
        >
          <AntDesign name="caretup" color="#000" />
          <Text style={styles.manual}>Enter manually</Text>
        </Box>
      </ScrollView>

      <NavigationButton
        text="Save"
        btnStyle={styles.buttonStyle}
        txtStyle={{}}
        onPress={() => navigation.navigate('onboarding')}
      />
    </MainWithHeader>
  );
};

export default AddresDetails;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#3F97A0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
    width: '90%',
  },
  buttonStyleLine: {
    marginTop: 25,
    borderColor: '#3F97A0',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: '90%',
  },
  buttonStyle2: {
    marginTop: 15,
    backgroundColor: '#FD9926',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginBottom: responsiveHeight(40),
  },
  placesInput: {
    backgroundColor: '#E8E8E8',
    // marginHorizontal: responsiveWidth(5),
    marginLeft: responsiveWidth(5),
    color: 'black',
    fontSize: 16,
    borderRadius: 10,
  },
  placesList: {
    marginHorizontal: responsiveWidth(5),
  },
  resText: {
    padding: 8,
    backgroundColor: '#ccffcc',
  },
  horizontalScroll: {
    width: responsiveWidth(95),
  },
  seperator: {
    fontFamily: FontFamily.regular,
  },
  manual: {
    fontSize: 11,
    fontWeight: '300',
    marginBottom: responsiveHeight(10),
  },
});
