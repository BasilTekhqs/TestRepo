import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Box, Text, Image, Container} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import {RadioButton} from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import {DatePicker} from '../../components/ui/date-picker';
import ImageContainer from '../../components/ui/image-container';
import {FontFamily} from '../../utils/fontDetails';
import {optionData} from '../../assets/local-dataset/local-dataset';
import {PropertyDocumentsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setPropertyCompliance} from '../../redux/actions/propertyActions';
import {saveDataWithDocumentName} from '../../backend/firestore-actions';
import {db} from '../../backend/firebase-config';
import {
  PROPERTY_ID_STRING,
  PROPERTY_COMPLIANCE_DOCUMENTS,
} from '../../constants/firebase-constants';
import * as ImagePicker from 'react-native-image-picker';
import {NavigationButton} from '../../components/ui/button';
import {responsiveHeight} from 'react-native-responsive-dimensions';

type Props = StackNavigationProp<PropertyDocumentsStackParamList, 'EPCReport'>;

const EPCReportScreen = () => {
  const navigation = useNavigation<Props>();

  const [resourcePath, setResourcePath] = useState<
    Array<ImagePicker.ImagePickerResponse>
  >([]);

  const dispatch = useDispatch();
  const {
    propertyComplianceDocuments: {epcReport},
    propertyId,
  } = useSelector((state: any) => state.property);

  const initialValues = {
    exemption: epcReport.exemption,
    number: epcReport.number,
    issueDate: epcReport.issueDate,
    images: epcReport.images,
    verified: epcReport.verified,
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
        'epcReport',
        collectionReference,
        values,
        true,
      );
      dispatch(setPropertyCompliance({epcReport: values}));
    },
  });

  const handleDateChange = name => {
    value => setFieldValue(name, value);
  };

  return (
    <MainWithHeader title="EPC Report" onClickBack={() => navigation.goBack()}>
      <ScrollView>
        <RadioButton
          title="Do you have a valid report?"
          items={optionData}
          dir="row"
          onChange={handleChange}
          value={''}
          name={''}
        />
        <InputBox
          inputTitle="Please enter your 9-digit EPC code"
          dropdown={false}
          value={''}
        />
        <InputBox inputTitle="EPC Rating" dropdown={true} value={''} />

        <DatePicker
          title="Please enter your certificate issue date"
          onChange={handleChange('issueDate')}
        />

        <Text style={styles.textStyle}>
          Please upload photos of your report
        </Text>
        <ImageContainer totalimage={setResourcePath} path={resourcePath} />
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
        <NavigationButton
          text="Save"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => {}}
        />
        <View style={{height: responsiveHeight(20)}} />
      </ScrollView>
    </MainWithHeader>
  );
};

export default EPCReportScreen;

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
  textStyle: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    marginTop: 10,
    width: '88%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
});
