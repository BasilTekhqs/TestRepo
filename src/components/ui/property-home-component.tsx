import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  propertyName?: string;
  status?: string;
  tenant?: string;
  deposit?: string;
  onPress: () => void;
  image: any;
};

const PropertyHomeComponent = ({
  image,
  propertyName,
  status,
  tenant,
  deposit,
  onPress,
}: Props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={onPress}>
        <Image
          // source={Images.BED}
          source={image}
          style={styles.imageStyle}
        />
        <View style={styles.bacView}>
          <Text style={styles.statusView}>{status}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.appView}>
        <Text style={styles.place}>{propertyName}</Text>
        <Text style={styles.status}>{'Status:' + ' ' + status}</Text>
      </View>
      <View style={styles.appView2}>
        <Text style={styles.tenant}>{'Tenant :' + ' ' + tenant}</Text>
        <Text style={styles.status}>{'Rent :' + ' ' + deposit}</Text>
      </View>
    </View>
  );
};
export default PropertyHomeComponent;

const styles = StyleSheet.create({
  appView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 10,
  },
  appView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    marginTop: 5,
  },
  place: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: 'black',
  },
  tenant: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: 'black',
  },
  status: {
    fontSize: 13,
    fontFamily: FontFamily.regular,
  },
  bacView: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#FD9926',
    borderRadius: 5,
  },
  statusView: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  mainView: {
    marginVertical: 10,
  },
  imageStyle: {height: 180, width: 360, borderRadius: 20},
});
