import React, {useState} from 'react';
import {Box} from 'native-base';
import {StyleSheet, View} from 'react-native';
import MainWithHeader from '../../components/layouts/main-with-header';
import {NavigationButton} from '../../components/ui/button';
import YouTube from 'react-native-youtube';
import {StackNavigationProp} from '@react-navigation/stack';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'VideoTour'>;

const VideoTour = () => {
  const [videoURl, setVideoURL] = useState('v=1hMWc7jyRNg');
  const navigation = useNavigation<Props>();

  return (
    <>
      <MainWithHeader onClickBack={() => navigation.goBack()}>
        <>
          <View style={{backgroundColor: 'red'}}>
            <YouTube
              videoId={videoURl}
              apiKey={''}
              style={{alignSelf: 'stretch', height: 300}}
            />
          </View>
        </>
      </MainWithHeader>
      <Box position={'absolute'} bottom={10} alignSelf={'center'}>
        <NavigationButton
          text="Back"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => {}}
        />
      </Box>
    </>
  );
};
export default VideoTour;

const styles = StyleSheet.create({
  imageStyle: {
    height: 500,
    width: '100%',
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
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
