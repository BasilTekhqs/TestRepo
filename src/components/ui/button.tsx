import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  text?: string;
  btnStyle?: Object;
  txtStyle?: Object;
  onPress: () => void;
};

export const NavigationButton = ({
  text,
  btnStyle,
  txtStyle,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
      <View style={{alignItems: 'flex-start'}}>
        <Text style={[styles.txt, txtStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fff',
    width: 100,
    height: 50,
    borderRadius: 10,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  icon: {
    marginRight: 15,
    marginBottom: 15,
  },
});
