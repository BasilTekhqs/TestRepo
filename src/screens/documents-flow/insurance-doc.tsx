import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Image, Container} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {RadioButton} from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import {DatePicker} from '../../components/ui/date-picker';
import ImageContainer from '../../components/ui/image-container';
import {FontFamily} from '../../utils/fontDetails';
import {BooleanData} from '../../assets/local-dataset/local-dataset';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {db} from '../../backend/firebase-config';
import {saveDataWithDocumentName} from '../../backend/firestore-actions';
import {
  PROPERTY_ID_STRING,
  PROPERTY_COMPLIANCE_DOCUMENTS,
} from '../../constants/firebase-constants';
import {setPropertyCompliance} from '../../redux/actions/propertyActions';

type Props = StackNavigationProp<
  PropertyDocumentsStackParamList,
  'InsuranceDoc'
>;

const InsuranceDoc = () => {
  const navigation = useNavigation<Props>();
  const [resourcePath, setResourcePath] = useState<
    Array<ImagePicker.ImagePickerResponse>
  >([]);
  const [date, setDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const dispatch = useDispatch();
  const {
    propertyComplianceDocuments: {insuranceDoc},
    propertyId,
  } = useSelector((state: any) => state.property);

  const initialValues = {
    exemption: insuranceDoc.exemption,
    number: insuranceDoc.number,
    issueDate: insuranceDoc.issueDate,
    reference: insuranceDoc.reference,
    images: insuranceDoc.images,
    verified: insuranceDoc.verified,
  };
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    //validate: values => exmptio(values),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async values => {
      const collectionReference = db
        .collection(PROPERTY_ID_STRING)
        .doc(propertyId.propertyId)
        .collection(PROPERTY_COMPLIANCE_DOCUMENTS);

      await saveDataWithDocumentName(
        'insuranceDocument',
        collectionReference,
        values,
        true,
      );
      dispatch(setPropertyCompliance({insuranceDocument: values}));
    },
  });
  return (
    <MainWithHeader
      title="Insurance documents"
      onClickBack={() => navigation.goBack()}
    >
      <>
        <RadioButton
          title="Do you have a valid report?"
          items={BooleanData}
          dir="row"
          onChange={handleChange}
          value={values.exemption}
          name={'exemption'}
        />
        <InputBox
          inputTitle="Please enter your policy number"
          dropdown={false}
          value={values.number}
          onChange={handleChange('number')}
        />
        <InputBox
          inputTitle="Please enter your certificate issue date"
          dropdown={true}
        />
        <DatePicker
          title="Please enter your certificate issue date"
          setDate={setDate}
        />

        <Text style={styles.texTstyle}>{'What is the coverage period?'}</Text>
        <Box mt={3}>
          <DatePicker title="Start date" setDate={setStartDate} />
        </Box>
        <Box mt={3}>
          <DatePicker title="End date" setDate={setEndDate} />
        </Box>
        <Text style={styles.TextStyle}>
          Please upload photos of your certificate
        </Text>
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
        <View style={styles.space} />
      </>
    </MainWithHeader>
  );
};
export default InsuranceDoc;

const styles = StyleSheet.create({
  texTstyle: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 15,
    fontWeight: '500',
  },
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
  TextStyle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    marginTop: 10,
    width: '88%',
    alignSelf: 'center',
  },
  space: {
    height: responsiveHeight(20),
  },
});
