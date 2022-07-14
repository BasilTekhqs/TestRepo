import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import CardList from '../../components/ui/card-list';
import {Box} from 'native-base';
import {PropertOnboardingStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<PropertOnboardingStackParamList, 'Property'>;

const PropertyInformation = () => {
  const navigation = useNavigation<Props>();
  const cardsDetails = [
    {
      id: 1,
      title: 'Property details',
      screen: 'AddPropertyDetails',
    },
    {
      id: 3,
      title: 'Documents',
      screen: 'Documents',
    },
  ];

  return (
    <MainWithHeader
      title={'Add information and start managing your property'}
      onClickBack={() => navigation.goBack()}
    >
      <CardList cardsDetails={cardsDetails} navigation={navigation} />
    </MainWithHeader>
  );
};

export default PropertyInformation;
