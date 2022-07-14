import {View} from 'react-native';
import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import CardList from '../../components/ui/card-list';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<UserProfileStackParamList, 'EditProfile'>;

const EditProfile = () => {
  const navigation = useNavigation<Props>();

  const cardsDetails = [
    {
      id: 1,
      title: 'Security details',
      text: 'Change',
      flag: false,
      screen: 'ChangePass',
    },
    {
      id: 2,
      title: 'Personal details',
      text: 'Edit',
      flag: false,
      screen: 'EditPersonalDetails',
    },
    {
      id: 3,
      title: 'Address details',
      text: 'Edit',
      flag: false,
      screen: 'EditAddress',
    },
    {
      id: 4,
      title: 'ID verification ',
      text: 'Verify',
      flag: false,
      screen: 'EditIdVerification',
    },
  ];

  return (
    <MainWithHeader title="" onClickBack={() => navigation.goBack()}>
      <View>
        <CardList navigation={navigation} cardsDetails={cardsDetails} />
      </View>
    </MainWithHeader>
  );
};
export default EditProfile;
