import React, {useState} from 'react';
import {Box} from 'native-base';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import MainWithHeader from '../../components/layouts/main-with-header';
import {Images} from '../../utils/imgDetails';
import {NavigationButton} from '../../components/ui/button';
import ImageView from 'react-native-image-view';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'FloorPlan'>;

const FloorPlanDetails = () => {
  const [imageView, setImageView] = useState(false);
  const navigation = useNavigation<Props>();

  const images = [
    {
      source: Images.FLOORPLAN,
    },
  ];
  return (
    <MainWithHeader
      title={'Floor Plan'}
      onClickBack={() => navigation.goBack()}
    >
      <>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            setImageView(true);
          }}
        >
          <Image
            source={Images.FLOORPLAN}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {imageView === true ? (
          <ImageView
            images={images}
            imageIndex={0}
            isVisible={imageView}
            onClose={() => setImageView(false)}
          />
        ) : null}
      </>
      <Box position={'absolute'} bottom={0} alignSelf="center">
        <NavigationButton
          text="Back"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Box>
    </MainWithHeader>
  );
};
export default FloorPlanDetails;

const styles = StyleSheet.create({
  imageStyle: {
    height: 400,
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnStyle: {
    backgroundColor: '#3F97A0',
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  txtStyle: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
});
