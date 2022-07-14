import {StyleSheet} from 'react-native';
import React from 'react';
import OnBoardingLayout from '../../components/layouts/on-boarding';
import MainHeading from '../../components/ui/main-heading';
import {Box, Text} from 'native-base';
import {NavigationButton} from '../../components/ui/button';
import InputBox from '../../components/ui/input-box';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<UserProfileStackParamList, 'EditAddress'>;

const EditAddress = () => {
  const navigation = useNavigation<Props>();

  return (
    <OnBoardingLayout
      onClickBack={() => navigation.goBack()}
      onClickNext={() => navigation.navigate('EditProfile')}
    >
      <MainHeading title="Your Address" txtcontainer={{alignSelf: 'center'}} />
      <NavigationButton
        text="Use current location"
        btnStyle={styles.locBtn}
        txtStyle={{
          color: '#3F97A0',
        }}
        onPress={() => console.log('You have add functionality of location ')}
      />
      <Box
        flexDirection="row"
        alignItems={'center'}
        alignSelf="center"
        justifyContent={'center'}
        w="90%"
        my={'10'}
        h={5}
      >
        <Box borderWidth={0.5} flex={1} h={0} mr={2}></Box>
        <Text>Or</Text>
        <Box borderWidth={0.5} flex={1} ml={2} h={0}></Box>
      </Box>
      <InputBox inputTitle="Postcode" dropdown={false} />
      <NavigationButton
        text="Find my address"
        btnStyle={styles.addBtn}
        txtStyle={{
          color: '#000',
          fontWeight: 'bold',
        }}
        onPress={() =>
          console.log('You have add functionality to find address ')
        }
      />
      <InputBox inputTitle="Select address" dropdown={true} />
      <Box
        w="90%"
        alignSelf={'center'}
        flexDirection="row"
        alignItems={'center'}
      >
        <AntDesign name="caretup" color="#000" />
        <Text ml={'1'} fontSize={'11px'} fontWeight="300">
          Enter manually
        </Text>
      </Box>
    </OnBoardingLayout>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  locBtn: {
    marginTop: 25,
    borderColor: '#3F97A0',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: '90%',
  },
  addBtn: {
    marginTop: 15,
    backgroundColor: '#FD9926',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
});
