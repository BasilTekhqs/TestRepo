import {StyleSheet, View} from 'react-native';
import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import InputBox from '../../components/ui/input-box';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {SettingsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {NavigationButton} from '../../components/ui/button';

type Props = StackNavigationProp<SettingsStackParamList, 'ReferFriend'>;

const ReferFriend = () => {
  const navigation = useNavigation<Props>();

  return (
    <MainWithHeader
      title="Refer a friend"
      onClickBack={() => navigation.goBack()}
    >
      <>
        <View style={styles.body}>
          <InputBox inputTitle="First Name" dropdown={false} />
          <InputBox inputTitle="Last Name" dropdown={false} />
          <InputBox inputTitle="Email Address" dropdown={false} />
          <InputBox inputTitle="Mobile" dropdown={false} />
        </View>
        <View style={styles.buttons}>
          <NavigationButton
            text="Send Invitation"
            btnStyle={styles.buttonStyle}
            onPress={() => {}}
          />
          <View style={{height: responsiveHeight(20)}} />
        </View>
      </>
    </MainWithHeader>
  );
};
export default ReferFriend;
const styles = StyleSheet.create({
  body: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FD9926',
  },
  buttons: {
    marginTop: responsiveHeight(4),
  },
  buttonStyle: {
    backgroundColor: '#FD9926',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
});
