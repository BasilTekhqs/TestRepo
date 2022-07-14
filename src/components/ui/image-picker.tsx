import {Container} from 'native-base';
import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

export const ImgPick = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     resourcePath: [],
  //   };
  // }
  const [resourcePath, setResourcePath] = useState([]);
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
      const options = {
        mediaType: 'photo', //to allow only photo to select ...no video
        saveToPhotos: true, //to store captured photo via camera to photos or else it will be stored in temp folders and will get deleted on temp clear
        includeBase64: false,
      };
      ImagePicker.launchCamera(options, response => {
        console.log('Response Camera= ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const source = response;
          console.log('response', JSON.stringify(response));
          setResourcePath([...resourcePath, response]);
        }
      });
    }
  };

  const selectFile = () => {
    const options = {
      title: 'Select Image',

      customButtons: [
        {
          name: 'customOptionKey',

          title: 'Choose file from Custom Option',
        },
      ],

      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);

        alert(res.customButton);
      } else {
        const source = res;
        setResourcePath([...resourcePath, res]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + resourcePath.data,
          }}
          style={{width: 100, height: 100}}
        />
        <Container
          maxWidth="350px"
          w={'350px'}
          h={'350px'}
          flexDirection="row"
          flexWrap={'wrap'}
        >
          {resourcePath?.map(item => (
            <Image
              source={{uri: item?.assets[0]?.uri}}
              style={styles.imageStyle}
            />
          ))}
        </Container>
        <Text style={{alignItems: 'center'}}>{resourcePath.uri}</Text>

        <TouchableOpacity onPress={selectFile} style={styles.button}>
          <Text style={styles.buttonText}>Select File</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={launchCameras} style={styles.button}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 30,

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#fff',
  },

  button: {
    width: 250,

    height: 60,

    backgroundColor: '#3740ff',

    alignItems: 'center',

    justifyContent: 'center',

    borderRadius: 4,

    marginBottom: 12,
  },

  buttonText: {
    textAlign: 'center',

    fontSize: 15,

    color: '#fff',
  },
  imageStyle: {width: 100, height: 100, marginHorizontal: 5},
});
