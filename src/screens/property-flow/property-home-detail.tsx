import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {Box} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {NavigationButton} from '../../components/ui/button';
import {Images} from '../../utils/imgDetails';
import Card from '../../components/ui/card-home';
import {
  propertyDetail,
  buttonPropertyDetail,
} from '../../assets/local-dataset/local-dataset';
import {FontFamily} from '../../utils/fontDetails';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {PropertiesStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type NavigationProps = StackNavigationProp<
  PropertiesStackParamList,
  'PropertyHomeDetails'
>;
type ParamsType = RouteProp<PropertiesStackParamList, 'PropertyHomeDetails'>;

type Props = {
  address: string;
  flag: boolean;
  route: Function;
  params: Function;
  Image: any;
};

const PropertyHomeDetails = ({route}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    params: {address},
  } = useRoute<ParamsType>();
  const [data, setData] = useState(propertyDetail);
  const [buttonData, setButtonData] = useState(buttonPropertyDetail);
  const DeleteProp = () => {
    try {
      Alert.alert('', 'Are you sure you want to delete this property?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
        },
      ]);
    } catch (error) {
      console.log('Error while handling edit profile picture action: ', error);
    }
  };
  return (
    <MainWithHeader title={address} onClickBack={() => navigation.goBack()}>
      <Box mt={4}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FullDetails');
          }}
        >
          <Image source={Images.BED} style={styles.imageStyle} />
        </TouchableOpacity>
        <View style={styles.cardRow}>
          <Card
            title="Delete Property"
            image={Images.DELETE}
            onPress={() => {
              DeleteProp();
            }}
          />
          <Card
            title="Edit Property"
            image={Images.EDIT}
            onPress={() => {
              navigation.navigate('EditProperty');
            }}
          />
        </View>
      </Box>
    </MainWithHeader>
  );
};

export default PropertyHomeDetails;

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginTop: 15,
    alignSelf: 'center',
  },
  btnStyle: {
    backgroundColor: '#3F97A0',
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
  image1: {
    zIndex: 0,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  imageMain: {
    height: 60,
    width: 60,
    borderRadius: 40,
  },
  imageView: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  mainVIew: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  image2: {
    left: -25,
    zIndex: 1,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonMainView: {
    marginHorizontal: 10,
  },
  buttonFlatlistView: {
    alignItems: 'center',
    width: responsiveWidth(92),
    alignSelf: 'center',
  },
  titleView: {
    backgroundColor: '#3F97A0',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  textStyle: {
    marginLeft: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  imageStyle: {height: 260, width: 360, borderRadius: 20, alignSelf: 'center'},
});
