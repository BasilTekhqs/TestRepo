import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {Text} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type Props = {
  title: string;
  titleColor?: string;
  screenName: string;
  imageSource: ImageSourcePropType;
  navigation: {
    navigate: Function;
  };
};

const SettingList = ({
  title,
  titleColor,
  imageSource,
  navigation,
  screenName,
}: Props) => {
  const handleClick = (screenName: string) => {
    {
      screenName ? navigation.navigate(screenName) : null;
    }
  };

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => handleClick(screenName)}
    >
      <View style={styles.leftRow}>
        <Image source={imageSource} style={styles.imageStyle} />
        <Text
          style={[styles.title, {color: titleColor ? titleColor : 'black'}]}
        >
          {title}
        </Text>
      </View>
      <Octicons name={'chevron-right'} color={'black'} size={20} />
    </TouchableOpacity>
  );
};

export default SettingList;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(90),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    marginVertical: responsiveHeight(0.5),
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveFontSize(1.9),
    marginLeft: responsiveWidth(3),
  },
  imageStyle: {
    height: responsiveHeight(2),
    width: responsiveHeight(2),
    resizeMode: 'contain',
  },
});
