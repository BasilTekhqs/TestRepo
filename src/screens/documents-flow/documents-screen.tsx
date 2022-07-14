import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Box} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import CardList from '../../components/ui/card-list';
import PrevAndNextButtons from '../../components/ui/prev-next-buttons';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {
  checkCollection,
  checkDocumentFields,
  getDocumentSnap,
} from '../../backend/firestore-actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  PROPERTY_COMPLIANCE_DOCUMENTS,
  PROPERTY_ID_STRING,
} from '../../constants/firebase-constants';
import {db} from '../../backend/firebase-config';
import {setPropertyCompliance} from '../../redux/actions/propertyActions';

type Props = StackNavigationProp<
  PropertyDocumentsStackParamList,
  'DocumentsList'
>;

const cardsDetails = [
  {
    id: 1,
    title: 'EPC Report',
    screen: 'EPCReport',
    value: 'epcReport',
    flag: false,
  },
  {
    id: 2,
    title: 'Insurance documents',
    screen: 'InsuranceDoc',
    value: 'insuranceDocument',
    flag: false,
  },
  {
    id: 3,
    title: 'Gas safety certificate',
    screen: 'GasSafety',
    value: 'gasSafety',
    flag: false,
  },
  {
    id: 4,
    title: ' EICRDocument',
    screen: 'EICRDocument',
    value: 'eicrDocument',
    flag: false,
  },
  {
    id: 5,
    title: 'HMO Licence',
    screen: 'HMO',
    value: 'hmoLicence',
    flag: false,
  },
  {
    id: 6,
    title: 'Selective Licence',
    screen: 'SelectiveLicence',
    value: 'selectiveLicence',
    flag: false,
  },
  {
    id: 7,
    title: 'Floorplan',
    screen: 'FloorPlan',
    value: 'floorPlan',
    flag: false,
  },
];
const Documents = () => {
  const navigation = useNavigation<Props>();
  const dispatch = useDispatch();
  const {propertyId, propertyComplianceDocuments} = useSelector(
    (state: any) => state.property,
  );
  const [cards, setCards] = useState(cardsDetails);

  const updateComplianceDocuments = useCallback(async () => {
    const cardKeys = cards.map(card => card.value);
    const collectionReference = db
      .collection(PROPERTY_ID_STRING)
      .doc(propertyId.propertyId)
      .collection(PROPERTY_COMPLIANCE_DOCUMENTS);
    const matches = await checkCollection(collectionReference, cardKeys);
    const updatedCardDetails = cards.map(card => {
      if (matches[card.value]) {
        card.flag = true;
        dispatch(setPropertyCompliance({[card.value]: matches[card.value]}));
      }
      return card;
    });
    setCards(updatedCardDetails);
  }, [propertyId.propertyId]);
  useEffect(() => {
    try {
      updateComplianceDocuments();
    } catch (error) {
      console.log(error);
    }
  }, [updateComplianceDocuments]);

  return (
    <>
      <MainWithHeader
        title="Add information and start managing your property"
        onClickBack={() => navigation.goBack()}
      >
        <>
          <CardList
            navigation={navigation}
            cardsDetails={cards}
            title2="Upload Document"
          />
          <Box alignItems={'center'} marginTop={35} right={2}>
            <View style={styles.space}>
              <Box></Box>
            </View>
          </Box>
        </>
      </MainWithHeader>
    </>
  );
};

export default Documents;

const styles = StyleSheet.create({
  space: {
    height: responsiveHeight(20),
  },
});
