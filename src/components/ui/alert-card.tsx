import {Box} from 'native-base';
import React, {ReactChild} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';
import ICons from 'react-native-vector-icons/FontAwesome';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  title: string;
  children?: ReactChild;
  icon?: boolean;
  onpress: () => void;
};

const AlertCard = ({children, title, icon, onpress}: Props) => {
  return (
    <Box style={styles.container}>
      <TouchableOpacity style={styles.inner} onPress={onpress}>
        <Text style={styles.txt}>{title}</Text>
        {icon && (
          <View style={styles.notifiView}>
            <ICons name="bell" size={25} color={'white'} />
          </View>
        )}
      </TouchableOpacity>
      {children}
    </Box>
  );
};

export default AlertCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginVertical: Dimensions.get('window').height * 0.01,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: responsiveWidth(90),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E44232',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#E44232',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  txt: {
    width: '100%',
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#000',
  },
  notifiView: {
    backgroundColor: '#E44232',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
});
