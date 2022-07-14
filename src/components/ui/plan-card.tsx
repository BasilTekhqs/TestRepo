import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  PKGName: string;
  price: string;
};

const PlanCard: React.FC<Props> = ({PKGName, price}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.inner}>
        <Text style={styles.pkgText}>{PKGName}</Text>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </View>
  );
};
export default PlanCard;
const styles = StyleSheet.create({
  mainView: {
    width: responsiveWidth(90),
    marginVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#FD9926',
    borderRadius: 10,
  },
  inner: {
    marginVertical: 10,
    width: '92%',
    alignSelf: 'center',
  },
  pkgText: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: '300',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
