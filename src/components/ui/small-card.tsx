import {Box} from 'native-base';
import React, {ReactChild} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  title: string;
  children?: ReactChild;
  title2?: string;
};

const Smallcard = ({children, title, title2}: Props) => {
  return (
    <Box style={styles.container}>
      <Box>
        <Text style={styles.txt}>{title}</Text>
        {title2 && <Text style={styles.txt}>{title2}</Text>}
      </Box>
      {children}
    </Box>
  );
};

export default Smallcard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginVertical: Dimensions.get('window').height * 0.01,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#FD9926',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#FD9926',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 20,
  },
  txt: {
    width: 141,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#000',
  },
});
