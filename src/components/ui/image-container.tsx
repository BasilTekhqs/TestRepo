import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {Box} from 'native-base';
import Icons from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'react-native-image-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

type Props = {
  title?: string;
  iconName?: any;
  btnStyle?: {};
  path:string[];
  totalimage: React.Dispatch<React.SetStateAction<string[]>>;
};

interface itemType {
  assets: {
    uri: string;
  }[];
}

const ImageContainer = ({totalimage, path}: Props) => {
  const launchCameras = async () => {
    const grantedcamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const grantedstorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (
      grantedcamera === PermissionsAndroid.RESULTS.GRANTED &&
      grantedstorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Camera & storage permission given');
      const options: CameraOptions = {
        mediaType: 'photo', //to allow only photo to select ...no video
        saveToPhotos: true, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
        includeBase64: false,
      };
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          totalimage([...path, response.assets[0].uri]);
        }
      });
    }
  };

  const selectFile = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else {
        console.log(res);
        totalimage([...path, res.assets[0].uri]);
      }
    });
  };

  const addPictures = () => {
    try {
      Alert.alert('', 'Please select option to change profile picture.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: () => launchCameras(),
        },
        {
          text: 'Gallery',
          onPress: () => selectFile(),
        },
      ]);
    } catch (error) {
      console.log('Error while handling edit profile picture action: ', error);
    }
  };
  return (
    <Box style={styles.InnerContainer}>
      <Box style={{paddingTop: '30%'}}>
        <TouchableOpacity onPress={() => addPictures()}>
          <Icons name="camera" size={40} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default ImageContainer;

const styles = StyleSheet.create({
  InnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
