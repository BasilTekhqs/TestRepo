import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Box} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  title: string;
  iconName?: any;
  btnStyle?: {};
  onPress: () => void;
};

const AuthButton = ({title, iconName, btnStyle, onPress}: Props) => {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
      <Box flexDirection="row" alignItems={'center'} alignSelf="center">
        <Icon name={iconName} size={30} color="#fff" style={styles.icon} />
        <Text style={styles.text}>{title}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#5890FF',
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: 'black',
    marginHorizontal: 10,
    width: 200,
    alignSelf: 'center',
    marginLeft: 5,
    marginVertical: 10,
  },
  icon: {
    width: 50,
  },
});
