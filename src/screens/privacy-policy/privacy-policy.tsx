import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import MainWithHeader from '../../components/layouts/main-with-header';
import Pdf from 'react-native-pdf';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<UserProfileStackParamList, 'PrivacyPolicy'>;

const PaymentDetails = () => {
  const navigation = useNavigation<Props>();

  return (
    <MainWithHeader onClickBack={() => navigation.goBack()}>
      <View>
        <Pdf
          source={require('../../assets/pdf/SucasaPrivacyPolicy.pdf')}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      </View>
    </MainWithHeader>
  );
};
export default PaymentDetails;
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
});
