import {StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';
import {Images} from '../../utils/imgDetails';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Box} from 'native-base';

import {PropertiesStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {NavigationButton} from '../../components/ui/button';

type Props = StackNavigationProp<PropertiesStackParamList, 'InvitePartner'>;

const InvitePartner = () => {
  const navigation = useNavigation<Props>();

  const [date, setDate] = useState('');

  return (
    <MainWithHeader
      title={'Add Partner'}
      onClickBack={() => navigation.goBack()}
    >
      <Image
        source={Images.propertyHome}
        style={styles.cover}
        resizeMode="contain"
      />

      <InputBox inputTitle="First name" dropdown={false} />
      <InputBox inputTitle="Surname" dropdown={false} />
      <InputBox inputTitle="Email Address" dropdown={false} />
      <InputBox inputTitle="Mobile" dropdown={false} />
      <Box marginTop={5} alignItems={'center'}>
        <NavigationButton
          text="Save"
          btnStyle={styles.buttonStyle}
          onPress={() => {}}
        />
        <View style={{height: responsiveHeight(20)}} />
      </Box>
    </MainWithHeader>
  );
};

export default InvitePartner;

const styles = StyleSheet.create({
  dateStyle: {
    color: 'black',
    fontSize: 14,
  },
  dateView: {
    width: '90%',
    backgroundColor: '#E5E5E5',
    height: 40,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  cover: {
    height: 200,
    width: 350,
    alignSelf: 'center',
    marginLeft: responsiveWidth(2),
  },
});
