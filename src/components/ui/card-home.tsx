import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  title: string;
  onPress: any;
  txtStyle?: {};
  image: any;
};

const cardHome: React.FC<Props> = ({
  title,
  onPress,
  txtStyle,
  image,
}: Props) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <View style={styles.txtView}>
        <Text style={[styles.txt, txtStyle]}>{title}</Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={image} style={styles.imgStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default cardHome;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#FD9926',
    borderRadius: 28,
    padding: 20,
    marginVertical: Platform.OS === 'android' ? 5 : 6,
    width: Platform.OS === 'android' ? 175 : 168,
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txt: {
    color: '#000',
    fontSize: 17,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  imgStyle: {
    width: 45,
    height: 44,
    marginVertical: 2,
    resizeMode: 'contain',
  },
  txtView: {
    height: 50,
  },
});
