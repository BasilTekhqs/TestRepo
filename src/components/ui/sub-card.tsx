import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MTI from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  cost: string;
  des: string;
  buttonTitle: string;
  property: string;
  flag: boolean;
  SelectPress: () => void;
};

const SubCard = ({
  title,
  cost,
  property,
  des,
  buttonTitle,
  flag,
  SelectPress,
}: Props) => {
  return (
    <View
      style={[
        styles.mainView,
        {borderColor: flag === true ? '#FD9926' : '#000'},
      ]}
    >
      <View style={styles.innerVIew}>
        <View style={styles.TitleView}>
          <Text style={styles.titleText}>{title}</Text>
          {flag === true ? (
            <View style={[styles.CircleView, {backgroundColor: 'transparent'}]}>
              <MTI name="circle-double" size={20} color={'#FD9926'} />
            </View>
          ) : (
            <TouchableOpacity style={styles.buttonView} onPress={SelectPress}>
              <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.costView}>
          <Text style={styles.costText}>{cost}</Text>
        </View>
        <View style={styles.costView}>
          <Text style={styles.propertyText}>{property}</Text>
        </View>
        <View style={styles.costView}>
          <Text style={styles.titleText}>{des}</Text>
        </View>
      </View>
    </View>
  );
};
export default SubCard;
const styles = StyleSheet.create({
  mainView: {
    borderWidth: 1,
    width: 360,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  innerVIew: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '200',
  },
  TitleView: {
    marginBottom: 5,
  },
  costView: {
    marginTop: 10,
  },
  costText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
  },
  propertyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FD9926',
  },
  buttonView: {
    height: 35,
    backgroundColor: '#3F97A0',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  CircleView: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
