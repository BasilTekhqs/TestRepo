import {Platform, StyleSheet, Text} from 'react-native';
import React from 'react';
import HeaderTop from '../ui/header-top';
import {Images} from '../../utils/imgDetails';
import {Box, Center, ScrollView, View} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
type Props = {
  children?: React.ReactNode;
  title?: string;
  onClickBack: () => void;
};

const MainWithHeader = ({children, title, onClickBack}: Props) => {
  return (
    <Center
      flex={1}
      style={{backgroundColor: '#fff', justifyContent: 'center'}}
    >
      <Box bg={'#fff'} flex={1} mt={Platform.OS === 'ios' ? 8 : null}>
        <HeaderTop
          BellIcon={Images.LINE}
          logo={Images.LOGO}
          onClickBack={onClickBack}
        />
        <Text style={styles.title}>{title}</Text>
        <Box marginTop={15}>
          <ScrollView horizontal={false} keyboardShouldPersistTaps="handled">
            {children}
            <View style={styles.extraHeight} />
          </ScrollView>
        </Box>
      </Box>
    </Center>
  );
};

export default MainWithHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(3.5),
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
    textAlign: 'center',
  },
  extraHeight: {height: responsiveHeight(20)},
});
