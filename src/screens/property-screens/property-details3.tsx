import React from 'react';
import {Box, Container, Image} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import Subheading from '../../components/ui/sub-heading';

import {PropertOnboardingStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

type NavigationProps = StackNavigationProp<
  PropertOnboardingStackParamList,
  'PropertyImagesPreview'
>;
type ParamsType = RouteProp<
  PropertOnboardingStackParamList,
  'PropertyImagesPreview'
>;

interface itemType {
  assets: {
    uri: string;
  }[];
}

const PropertyImagesPreview = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    params: {resourcePath},
  } = useRoute<ParamsType>();
  return (
    <MainWithHeader
      title="Property Details"
      onClickBack={() => navigation.goBack()}
    >
      <Subheading subTitle="Adding photos of your property will attract more tenants. We suggest you include all rooms and any outside space your property has." />
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
    </MainWithHeader>
  );
};

export default PropertyImagesPreview;
