import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  name?: string;
  statue?: string;
  onPress: () => void;
  image: any;
};

const ChatChard = ({image, onPress, name, statue}: Props) => {
  return (
    <>
      <TouchableOpacity style={styles.MainVIew} onPress={onPress}>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <View style={styles.nameView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>{statue}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
export default ChatChard;
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FD9926',
  },
  MainVIew: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameView: {
    width: '75%',
  },
  name: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
  status: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    marginTop: 5,
  },
});
