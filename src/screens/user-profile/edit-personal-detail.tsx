import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Box} from 'native-base';
import MainWithHeader from '../../components/layouts/main-with-header';
import PrevAndNextButtons from '../../components/ui/prev-next-buttons';
import {RadioButton} from '../../components/ui/radio-button';
import InputBox from '../../components/ui/input-box';
import {DatePicker} from '../../components/ui/date-picker';
import {Initials} from '../../assets/local-dataset/local-dataset';
import {FontFamily} from '../../utils/fontDetails';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<
  UserProfileStackParamList,
  'EditPersonalDetails'
>;

const EditPersonalDetails = () => {
  const [date, setDate] = useState('');
  const navigation = useNavigation<Props>();

  return (
    <MainWithHeader
      title="Personal details"
      onClickBack={() => navigation.goBack()}
    >
      <View style={styles.body}>
        <Box mt={3}>
          <RadioButton
            title="What is your title?"
            items={Initials}
            dir="column"
            onChange={function (e: any): void {
              throw new Error('Function not implemented.');
            }}
            value={''}
            name={''}
          />
        </Box>
        <InputBox inputTitle="First name" dropdown={false} />
        <InputBox inputTitle="Surname" dropdown={false} />
        <DatePicker
          title="Please enter your certificate issue date"
          setDate={setDate}
        />
        <InputBox inputTitle="Email" dropdown={false} />
        <InputBox inputTitle="Mobile" dropdown={false} />
      </View>
      <Box mt={10}>
        <PrevAndNextButtons
          title="Save"
          onClickBack={() => {
            navigation.goBack();
          }}
          onClickNext={() => {
            navigation.navigate('EditProfile');
          }}
        />
      </Box>
    </MainWithHeader>
  );
};

export default EditPersonalDetails;

const styles = StyleSheet.create({
  body: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FD9926',
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
});
