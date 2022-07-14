import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AD from 'react-native-vector-icons/AntDesign';
import MTI from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title?: string;
  num?: string;
  SelectPress?: () => void;
};

const PaymentCard = ({title, num, SelectPress}: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.innerView}>
        <View style={styles.upper}>
          <AD name="creditcard" color={'black'} size={40} />
          <View style={styles.tectView}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.numText}>{num}</Text>
          </View>
          <View>
            <MTI name="circle-double" size={20} color={'#FD9926'} />
            <Text style={styles.add}>{'edit'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.newBottom} onPress={SelectPress}>
          <Text style={styles.add}>{'Add new'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymentCard;
const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    width: 360,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    borderColor: '#FD9926',
  },
  innerView: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 330,
    alignItems: 'center',
  },
  numText: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 3,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tectView: {
    width: '75%',
  },
  newBottom: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    marginHorizontal: -10,
    marginBottom: -10,
    borderTopColor: '#FD9926',
  },
  add: {
    marginVertical: 10,
    fontSize: 13,
    fontWeight: '400',
  },
});
