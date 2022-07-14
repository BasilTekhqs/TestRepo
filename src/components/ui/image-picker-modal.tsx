import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Modal,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as ImagePicker from 'react-native-image-picker';

type Props = {
  isVisible: boolean;
  setVisble: any;
  setImageUri: any;
};

const ModalComponent = ({isVisible, setVisble, setImageUri}: Props) => {
  const onClose = () => {
    setVisble(false);
  };

  const openCameraFromModal = async () => {
    if (Platform.OS === 'android') {
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

        ImagePicker.launchCamera(options, res => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            console.log('cam res uri==', res);

            setVisble(false);
            setImageUri(res.assets[0].uri);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } else {
      const options = {
        title: 'ImagePicker',
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
        mediaType: 'image',
      };

      ImagePicker.launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          setVisble(false);
          setImageUri(response.assets[0].uri);
        }
      });
    }
  };
  const openGaleryFromModal = () => {
    const options = {
      title: 'ImagePicker',
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
      mediaType: 'image',
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('>>>>RES', response);
        setVisble(false);
        setImageUri(response.assets[0].uri);
      }
    });
  };
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalMain}>
        <View style={styles.imageModalContainer}>
          <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
            <AntDesign
              name="closecircle"
              size={responsiveHeight(3.5)}
              color="#000000"
            />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.picOption}
              onPress={openCameraFromModal}
            >
              <MaterialIcons
                name="photo-camera"
                size={responsiveWidth(7)}
                color="black"
              />
              <Text style={styles.picOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.picOption}
              onPress={openGaleryFromModal}
            >
              <MaterialIcons
                name="insert-photo"
                size={responsiveWidth(7)}
                color="black"
              />
              <Text style={styles.picOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalComponent;

const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageModalContainer: {
    backgroundColor: 'white',
    width: responsiveWidth(70),
    borderRadius: 20,
    alignSelf: 'center',
    paddingBottom: responsiveHeight(3),
    marginTop: '80%',
    elevation: 10,
  },
  closeContainer: {
    width: responsiveWidth(70),
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginTop: responsiveWidth(4),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  buttonContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(15),
    justifyContent: 'space-evenly',
  },
  picOption: {
    paddingLeft: responsiveWidth(12),
    alignItems: 'center',
    flexDirection: 'row',
  },
  picOptionText: {
    marginLeft: responsiveWidth(2),
    fontSize: responsiveWidth(4),
  },
  line: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: 'gray',
    height: 0.5,
  },
});
