import React from 'react';
import {NavigationButton} from './button';
import {Box} from 'native-base';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

type Props = {
  onClickBack: () => void;
  onClickNext: () => void;
  nextBtnStyle?: Record<string, unknown>;
  nextTextStyle?: Record<string, unknown>;
  backstyle?: Record<string, unknown>;
  title?: string;
  backTitle?: string;
};
const PrevAndNextButtons = ({
  onClickBack,
  onClickNext,
  backTitle,
  title,
  nextBtnStyle,
  nextTextStyle,
  backstyle,
}: Props) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      alignSelf={'center'}
      width={responsiveWidth(90)}
      marginBottom={15}
    >
      <NavigationButton
        text={backTitle ? backTitle : 'Back'}
        btnStyle={styles.navBtn}
        txtStyle={[styles.navTxt, backstyle]}
        onPress={onClickBack}
      />
      <NavigationButton
        text={title ? title : 'Next'}
        btnStyle={[styles.navBtn, nextBtnStyle]}
        txtStyle={[styles.navTxt, nextTextStyle]}
        onPress={onClickNext}
      />
    </Box>
  );
};

export default PrevAndNextButtons;

const styles = StyleSheet.create({
  txtStyle: {color: '#fff', fontSize: 14, fontWeight: '500'},
  navBtn: {
    backgroundColor: '#429EA6',
    height: responsiveHeight(5),
    width: responsiveWidth(35),
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
