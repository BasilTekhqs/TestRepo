import React, { useEffect, useState } from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import CardList from '../../components/ui/card-list';
import { PropertOnboardingStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { initalState, propertyCardsDetails } from '../../assets/local-dataset/local-dataset';
import { checkCollection, checkDocumentFields } from '../../backend/firestore-actions';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { PROPERTY_COMPLIANCE_DOCUMENTS, PROPERTY_ID_STRING, TENANT_STRING } from '../../constants/firebase-constants';
import { db } from '../../backend/firebase-config';
import { NavigationButton } from '../../components/ui/button';
import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

type Props = StackNavigationProp<PropertOnboardingStackParamList, 'Property'>;




const PropertyInformation = () => {
  const navigation = useNavigation<Props>();
  const { propertyId } = useSelector((state: any) => state.property);
  const [cardData, setCardData] = useState(propertyCardsDetails);
  const [flag, setFlag] = useState(false);
  const cardKeys = ["epcReport", "insuranceDocument", "gasSafety", "eicrReport", "hmoLicence", "selectiveLicence", "floorPlan"]

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCurrentProperty()
    });
    return unsubscribe;
  }, []);

  const getCurrentProperty = async () => {
    const jsonValue = await AsyncStorage.getItem(PROPERTY_ID_STRING)
    if (jsonValue) {
      checkData(JSON.parse(jsonValue))
    }
    else {
      setCardData([...initalState])
    }

  }
  const checkData = async (item: object) => {

    const collectionRef = firestore().collection(PROPERTY_ID_STRING).doc(item?.propertyid);
    const { matches } = await checkDocumentFields(collectionRef, [
      'title',
    ]);
    const collectionReference = db
      .collection(PROPERTY_ID_STRING)
      .doc(item?.propertyid)
      .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
    const DocumentMatches = await checkCollection(collectionReference, cardKeys);

    const tenancyCollectionReference = db
      .collection(PROPERTY_ID_STRING)
      .doc(item?.propertyid)
      .collection(TENANT_STRING);
    const tenancyDocumentMatches = await checkCollection(tenancyCollectionReference, ['tenancyDetails']);

    if (matches.title) {
      const arr = cardData;
      arr[0].flag = true;
      setCardData([...arr]);
    }
    if (Object.keys(DocumentMatches).length === 7) {
      const arr = cardData;
      arr[1].flag = true;
      setCardData([...arr]);
    }
    if (Object.keys(tenancyDocumentMatches).length === 1) {
      const arr = cardData;
      arr[2].flag = true;
      setCardData([...arr]);
    }
    if (matches.title && Object.keys(DocumentMatches).length === 7 && Object.keys(tenancyDocumentMatches).length === 1) {
      setFlag(true);
    }
  };

  const clearProperty = async () => {
    await AsyncStorage.removeItem(PROPERTY_ID_STRING)
    navigation.goBack()
  }
  return (
    <MainWithHeader
      title={'Add information and start managing your property'}
      onClickBack={() => navigation.goBack()}
    >
      <CardList cardsDetails={cardData} navigation={navigation} />
      {flag ? (
        <NavigationButton
          text="Confirm"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => clearProperty()}
        />
      ) : null}
    </MainWithHeader>
  );
};

export default PropertyInformation;

const styles = StyleSheet.create({

  buttonStyle: {
    backgroundColor: '#3F97A0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    alignSelf: 'center',
    marginTop: responsiveHeight(15),
  },
});