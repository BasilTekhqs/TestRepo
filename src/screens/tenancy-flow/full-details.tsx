import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Box} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {NavigationButton} from '../../components/ui/button';
import {ImageView} from '../../components/ui/image-view';
import {Images} from '../../utils/imgDetails';
import {fullDetailDataset} from '../../assets/local-dataset/local-dataset';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {FontFamily} from '../../utils/fontDetails';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {PropertiesStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<PropertiesStackParamList, 'FullDetails'>;

const FullDetails = () => {
  const navigation = useNavigation<Props>();

  const [data, setData] = useState([
    {
      id: '1',
      image: Images.CHAIR,
    },
    {
      id: '2',
      image: Images.CHAIR,
    },
    {
      id: '3',
      image: Images.CHAIR,
    },
    {
      id: '4',
      image: Images.CHAIR,
    },
  ]);
  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <ImageView
        image={Images.BED}
        data={data}
        title={'10 Roman House, Main Street Manchester, M2 1RH'}
        price={'£750/mo'}
        detailedData={fullDetailDataset}
        date={'15/04/2022'}
      />
      <Box w={'95%'} alignSelf={'center'} mt={2}>
        <Text style={styles.boxView}>
          {
            'A stunning apartment located in the popular Education Quarter with easy access to all the main University buildings. A spacious living room with views over the City separate modern kitchen, two large double bedrooms with ample wardrobe space. Separate bathroom with shower and ample practical storage throughout Fully furnished to a high standard.'
          }
        </Text>
      </Box>
      <View style={styles.mapContainer}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null} // remove if not using Google
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        ></MapView>
      </View>

      <Box alignItems="center" marginTop={18}>
        <NavigationButton
          text="Documents"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => {
            navigation.navigate('DocumentsAdded');
          }}
        />
        <Box mt={3} mb={3}>
          <NavigationButton
            text="Floorplan"
            btnStyle={styles.btnStyle2}
            txtStyle={styles.txtStyle}
            onPress={() => {
              navigation.navigate('FloorPlanDetails');
            }}
          />
        </Box>
        <NavigationButton
          text="Video tour"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => {
            navigation.navigate('VideoTour');
          }}
        />
        <View style={styles.space} />
      </Box>
    </MainWithHeader>
  );
};
export default FullDetails;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fd9926',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    height: 40,
  },
  btnStyle2: {
    backgroundColor: '#fd9926',
    width: 370,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    height: 40,
  },
  txtStyle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  nextText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    width: '95%',
  },
  nextstyle: {
    backgroundColor: '#fd9926',
  },
  boxView: {
    marginTop: 10,
    fontSize: 14.5,
    fontFamily: FontFamily.regular,
  },
  mapContainer: {
    height: 200,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  space: {
    height: responsiveHeight(20),
  },
});
