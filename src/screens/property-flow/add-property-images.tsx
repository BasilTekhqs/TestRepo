import React, {useState} from 'react';
import {Box, Image, Container} from 'native-base';
import {StyleSheet, Alert, View} from 'react-native';

import MainWithHeader from '../../components/layouts/main-with-header';
import {NavigationButton} from '../../components/ui/button';
import PrevAndNextButtons from '../../components/ui/prev-next-buttons';
import SubHeading from '../../components/ui/sub-heading';
import ImageContainer from '../../components/ui/image-container';
import {PropertOnboardingStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

type Props = StackNavigationProp<
  PropertOnboardingStackParamList,
  'AddPropertyImages'
>;

const AddPropertyImages = () => {
  const navigation = useNavigation<Props>();

  const [resourcePath, setResourcePath] = useState<
    Array<ImagePicker.ImagePickerResponse>
  >([]);

  return (
    <MainWithHeader
      title="Property Details"
      onClickBack={() => navigation.goBack()}
    >
      <Box style={{flex: 1, justifyContent: 'space-between'}}>
        <Box style={styles.InnerContainer}>
          <SubHeading subTitle="Adding photos of your property will attract more tenants. We suggest you include all rooms and any outside space your property has." />
          <ImageContainer totalimage={setResourcePath} path={resourcePath} />
          <View style={{marginBottom: 10}}>
            <Container alignSelf="center">
              <Box
                mt={'20%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                flexWrap="wrap"
              >
                {resourcePath &&
                  resourcePath.map((item: ImagePicker.ImagePickerResponse) => {
                    const sourcePath = item?.assets;
                    if (sourcePath) {
                      const uri = sourcePath[0].uri;
                      return (
                        <Image
                          source={{uri: uri}}
                          alt={'sucasa'}
                          m={2}
                          height={70}
                          width={70}
                        />
                      );
                    }
                  })}
              </Box>
            </Container>
          </View>
        </Box>
        <Box alignItems="center" marginTop={'38%'}>
          <NavigationButton
            text="Skip"
            btnStyle={styles.btnStyle}
            txtStyle={styles.txtStyle}
            onPress={() => console.log('skip')}
          />
          <Box>
            <PrevAndNextButtons
              onClickBack={() => navigation.goBack()}
              onClickNext={() =>
                navigation.navigate('PropertyImagesPreview', {
                  resourcePath: resourcePath,
                })
              }
            />
          </Box>
        </Box>
      </Box>
    </MainWithHeader>
  );
};

export default AddPropertyImages;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#fd9926',
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
  InnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
