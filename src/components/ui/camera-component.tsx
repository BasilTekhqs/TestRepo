import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const Camera = () => {
  const [imagepath, setimagepath] = useState('');
  const takePicture = async function (camera: any) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    setimagepath(data.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <RNCamera
          type={RNCamera.Constants.Type.back}
          style={styles.preview}
          ratio={'1:1'}
        >
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        <View>
          {/* <Image source={{uri: imagepath}} style={{width: 100, height: 100}} />
        <Text style={{fontSize: 25, color: 'red'}}>{imagepath}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Camera;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    margin: 20,
  },
  cameraContainer: {
    flex: 1,
    // flexDirection: 'column'
  },
});
