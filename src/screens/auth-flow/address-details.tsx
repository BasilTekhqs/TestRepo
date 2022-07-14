import {Platform, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MainHeading from '../../components/ui/main-heading';
import {Box} from 'native-base';
import {NavigationButton} from '../../components/ui/button';
import InputBox from '../../components/ui/input-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FontFamily} from '../../utils/fontDetails';
import MainWithHeader from '../../components/layouts/main-with-header';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {UserIdType} from '../../types/types';
import {useDispatch, useSelector} from 'react-redux';
import {LANDLORD_ID_STRING} from '../../constants/firebase-constants';
import {setLandlordId} from '../../redux/actions/userActions';
import {
  docIdGenerator,
  saveDataWithDocumentName,
} from '../../backend/firestore-actions';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  GooglePlaceData,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import GetLocation from 'react-native-get-location';
import Config from 'react-native-config';
import {ScrollView} from 'react-native-gesture-handler';
import {geocoder as conf} from '../../../env.json';
import Geocoder from '@timwangdev/react-native-geocoder';
import firestore from '@react-native-firebase/firestore';

type Props = StackNavigationProp<AuthStackParamList, 'addressdetails'>;

const AddresDetails = () => {
  const navigation = useNavigation<Props>();
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();
  const {userId} = useSelector((state: any) => state.user);
  const [result, setResult] = useState('');
  const [address, setAddress] = useState<GooglePlaceData>();
  const [addressError, setAddressError] = useState('');
  const [postCode, setPostcode] = useState('');
  const [error, setError] = useState<{[key: string]: string}>({});

  const placesRef = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    placesRef.current?.setAddressText(result);
    placesRef.current?.focus();
  }, [result]);

  const onSubmit = async () => {
    if (address) {
      const collectionRef = firestore().collection('userId');
      const docId = await docIdGenerator(LANDLORD_ID_STRING);

      dispatch(setLandlordId({landlordId: docId}));

      try {
        const obj: UserIdType = {
          userId: userId.userId,
          userFullAddress: address,
        };

        saveDataWithDocumentName(userId.userId, collectionRef, obj);
        navigation.navigate('onboarding');
        setShowLoading(false);
      } catch (error) {
        setShowLoading(false);
      }
    } else {
      setAddressError('Address is required');
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
      placesRef.current?.setAddressText(value[0].formattedAddress);
      setResult(value[0].formattedAddress);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <ScrollView horizontal={false} keyboardShouldPersistTaps="handled">
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
        <Box
          flexDirection="row"
          alignItems={'center'}
          alignSelf="center"
          justifyContent={'center'}
          w="90%"
          my={'10'}
          h={5}
        >
          <Box borderWidth={0.5} flex={1} h={0} mr={2}></Box>
          <Text style={styles.seperator}>Or</Text>
          <Box borderWidth={0.5} flex={1} ml={2} h={0}></Box>
        </Box>
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
              key: Platform.OS === 'android' ?`${Config.GOOGLE_PLACES_API_KEY_ANDROID}`: `${Config.GOOGLE_PLACES_API_KEY}`,
              language: 'en',
              components: 'country:gb',
            }}
            styles={{
              textInput: styles.placesInput,
              listView: styles.placesList,
            }}
            onPress={data => {
              setAddress(data?.description);
              setAddressError('');
            }}
            listViewDisplayed={false}
            keyboardShouldPersistTaps={'always'}
          />
        </ScrollView>
        <Text style={styles.errorText}>{addressError}</Text>
        <View style={styles.manualContainer}>
          <AntDesign name="caretup" color="#000" />
          <Text style={styles.manual}>Enter manually</Text>
        </View>
        <NavigationButton
          text="Save"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => onSubmit()}
        />
        <View style={styles.extraHeight} />
      </ScrollView>
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
    width: Platform.OS === 'ios' ? '90%' : '85%',
  },
  buttonStyleLine: {
    marginTop: 25,
    borderColor: '#3F97A0',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: Platform.OS === 'ios' ? '90%' : '85%',
  },
  buttonStyle2: {
    marginTop: 15,
    backgroundColor: '#FD9926',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? '90%' : '85%',
    marginBottom: responsiveHeight(4),
  },
  placesInput: {
    backgroundColor: '#E8E8E8',
    color: 'black',
    fontSize: 16,
    borderRadius: 10,
    alignSelf: 'center',
  },
  placesList: {
    marginHorizontal: responsiveWidth(5),
  },
  resText: {
    padding: 8,
    backgroundColor: '#ccffcc',
  },
  horizontalScroll: {
    width: responsiveWidth(88.5),
    paddingLeft: responsiveWidth(7.5),
    alignSelf: 'center',
  },
  seperator: {
    fontFamily: FontFamily.regular,
  },
  errorText: {
    color: 'red',
    marginLeft: responsiveWidth(5),
    marginVertical: responsiveHeight(1),
  },
  extraHeight: {
    height: responsiveHeight(10),
  },
  addressText: {
    color: '#000',
    fontWeight: 'bold',
  },
  manual: {
    fontSize: 11,
    fontWeight: '300',
    marginBottom: responsiveHeight(8),
  },
  manualContainer:{
    flexDirection:'row',
    marginLeft:responsiveWidth(8),
    width:responsiveWidth(25),
    justifyContent:'space-around',
    bottom:responsiveHeight(2)


  }
});
