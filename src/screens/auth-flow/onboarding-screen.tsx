import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardList from '../../components/ui/card-list';
import {cardsDetails} from '../../assets/local-dataset/local-dataset';
import MainWithHeader from '../../components/layouts/main-with-header';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {checkDocumentFields} from '../../backend/firestore-actions';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {NavigationButton} from '../../components/ui/button';
import {responsiveHeight} from 'react-native-responsive-dimensions';

type Props = StackNavigationProp<AuthStackParamList, 'onboarding'>;

const OnboardingScreen = () => {
  const navigation = useNavigation<Props>();
  const {userId} = useSelector((state: any) => state.user);
  const [cardData, setCardData] = useState(cardsDetails);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkData();
    });
    return unsubscribe;
  }, []);
  const checkData = async () => {
    const collectionRef = firestore().collection('userId').doc(userId.userId);
    const {matches} = await checkDocumentFields(collectionRef, [
      'title',
      'userFullAddress',
    ]);
    if (matches.title) {
      const arr = cardData;
      arr[0].flag = true;
      setCardData([...arr]);
    }
    if (matches.userFullAddress) {
      const arr = cardData;
      arr[1].flag = true;
      setCardData([...arr]);
    }
    if (matches.title && matches.userFullAddress) {
      setFlag(true);
    }
  };
  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <CardList navigation={navigation} cardsDetails={cardData} />
      </View>
      {flag ? (
        <NavigationButton
          text="Confirm"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => navigation.navigate('App')}
        />
      ) : null}
    </MainWithHeader>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
  },
  buttonStyle: {
    backgroundColor: '#3F97A0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    marginTop: responsiveHeight(15),
  },
});
