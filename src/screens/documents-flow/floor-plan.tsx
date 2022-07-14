import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Image, Container} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';

import PrevAndNextButtons from '../../components/ui/prev-next-buttons';
import {NavigationButton} from '../../components/ui/button';
import ImageContainer from '../../components/ui/image-container';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'FloorPlan'>;

const FloorPlan = () => {
  const navigation = useNavigation<Props>();

  const [resourcePath, setResourcePath] = useState<
    Array<ImagePicker.ImagePickerResponse>
  >([]);
  const [date, setDate] = useState<string>('');

  return (
    <MainWithHeader title="Floorplan" onClickBack={() => navigation.goBack()}>
      <Box mt={4}>
        <InputBox
          inputTitle="What is the sqft of your property?"
          dropdown={false}
        />
      </Box>
      <Box style={{flex: 1, justifyContent: 'space-between'}}>
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
        <Box alignItems="center" marginTop={'12%'}>
          <NavigationButton
            text="Skip"
            btnStyle={styles.btnStyle}
            txtStyle={styles.txtStyle}
            onPress={() => console.log('skip')}
          />
        </Box>
      </Box>
    </MainWithHeader>
  );
};
export default FloorPlan;

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
});
