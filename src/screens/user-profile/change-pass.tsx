import {StyleSheet, View} from 'react-native';
import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';
import {NavigationButton} from '../../components/ui/button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<UserProfileStackParamList, 'ChangePass'>;

const ChangePass = () => {
  const navigation = useNavigation<Props>();

  return (
    <MainWithHeader
      title="Change Password"
      onClickBack={() => navigation.goBack()}
    >
      <>
        <View style={styles.body}>
          <InputBox inputTitle="Enter current password" dropdown={false} />
          <InputBox inputTitle="Enter new password" dropdown={false} />
          <InputBox inputTitle="Re-enter  new password" dropdown={false} />
        </View>
        <NavigationButton
          text="Save"
          btnStyle={styles.buttonStyle}
          txtStyle={{}}
          onPress={() => navigation.goBack()}
        />
      </>
    </MainWithHeader>
  );
};
export default ChangePass;
const styles = StyleSheet.create({
  body: {
    marginVertical: 10,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FD9926',
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: responsiveHeight(5),
  },
});
