import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/imgDetails';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  title: string;
  cardTitle: string;
  press: () => void;
  cardNum: string;
};

const CardDetailComp: React.FC<Props> = ({
  title,
  cardTitle,
  press,
  cardNum,
}) => {
  return (
    <View style={styles.MainView}>
      <Text style={styles.txt}>{title}</Text>
      <View style={styles.CardView}>
        <View style={styles.innerVIew}>
          <Image
            source={Images.VISA}
            style={styles.imageStyle}
            resizeMode="contain"
          />
          <View style={styles.CardTextView}>
            <Text style={styles.titleText}>{cardTitle}</Text>
            <Text style={styles.numb}>{'....' + cardNum}</Text>
          </View>
          <TouchableOpacity style={styles.buttonVIew} onPress={press}>
            <Text style={styles.changes}>{'Change details'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardDetailComp;

const styles = StyleSheet.create({
  txt: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
  },
  icon: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  MainView: {
    width: '95%',
    alignSelf: 'center',
  },
  CardView: {
    width: responsiveWidth(90),
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FD9926',
    borderRadius: 10,
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  innerVIew: {
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardTextView: {
    width: '35%',
  },
  buttonVIew: {
    backgroundColor: '#FD9926',
    borderRadius: 10,
  },
  changes: {
    fontSize: 14,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  numb: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 5,
  },
});
