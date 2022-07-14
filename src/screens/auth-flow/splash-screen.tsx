import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Image, Text, View} from 'native-base';

import {Images} from '../../utils/imgDetails';
import AuthButton from '../../components/ui/auth-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<AuthStackParamList, 'splash'>;

const Splash = () => {
  const navigation = useNavigation<Props>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={Images.LoGo}
        style={styles.imageStyles}
        resizeMode="contain"
      />
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FD9926',
    flex: 1,
  },
  imageStyles: {
    height: 100,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 2,
  },
});
