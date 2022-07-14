import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import CardList from '../../components/ui/card-list';
import {PropertiesStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<PropertiesStackParamList, 'EditProperty'>;

const EditProperty = () => {
  const navigation = useNavigation<Props>();

  const cardsDetails = [
    {
      id: 1,
      title: 'Property details',
      screen: 'EditPropertyDetails',
    },
    {
      id: 3,
      title: 'Documents',
      screen: 'Documents',
    },
  ];

  return (
    <MainWithHeader
      title={'Property Overview'}
      onClickBack={() => navigation.goBack()}
    >
      <CardList
        cardsDetails={cardsDetails}
        navigation={navigation}
        btnName={'Edit'}
      />
    </MainWithHeader>
  );
};

export default EditProperty;
