import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {Center} from 'native-base';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  subTitle: string;
};
const Subheading = ({subTitle}: Props) => {
  return (
    <Center style={styles.container}>
      <Text style={styles.Text}>{subTitle}</Text>
    </Center>
  );
};
export default Subheading;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  Text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
});
