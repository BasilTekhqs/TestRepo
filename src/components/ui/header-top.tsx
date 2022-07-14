import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';

import {Box} from 'native-base';

type Props = {
  BellIcon: number;
  logo: ImageSourcePropType;
  onClickBack: () => void;
};

const HeaderTop = ({BellIcon, logo, onClickBack}: Props) => {
  return (
    <Box
      style={{
        marginHorizontal: 40,
      }}
      marginTop={30}
      width={310}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <TouchableOpacity onPress={onClickBack}>
        <Image source={BellIcon} style={styles.userICon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={logo} style={styles.logoImage} />
      </TouchableOpacity>
      <View style={styles.emptyView} />
    </Box>
  );
};

export default HeaderTop;

const styles = StyleSheet.create({
  imageStyle: {width: 40, height: 40, borderRadius: 50},
  logoImage: {width: 65, height: 63},
  userICon: {width: 20, height: 20, borderRadius: 50},
  emptyView: {width: 20},
});
