import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Smallcard from './small-card';
import {Box} from 'native-base';
import {NavigationButton} from './button';
import {FontFamily} from '../../utils/fontDetails';
import {Images} from '../../utils/imgDetails';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  cardsDetails: Array<{
    id: number;
    title: string;
    flag?: boolean;
    text?: string;
    screen?: string;
  }>;
  navigation: {
    navigate: Function;
  };
  title2?: string;
  btnName?: string;
};

export default function CardList({
  navigation,
  cardsDetails,
  title2,
  btnName,
}: Props) {
  const handleClick = (screenName: string) => {
    {
      screenName
        ? navigation.navigate(screenName)
        : console.log(' You should add Screen To Navigate ');
    }
  };

  return (
    <Box alignItems={'center'}>
      {cardsDetails.map((card: any) => {
        return (
          <Smallcard
            key={card.id}
            title={card.title}
            title2={title2}
            children={
              card.flag ? (
                <Image source={Images.CHECK} style={styles.checkStyle} />
              ) : (
                <NavigationButton
                  text={btnName ? btnName : 'Add'}
                  btnStyle={styles.btnStyle}
                  txtStyle={styles.txtStyle}
                  onPress={() => handleClick(card.screen)}
                />
              )
            }
          />
        );
      })}
    </Box>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#429EA6',
    height: 31,
    width: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: {color: '#fff', fontSize: 14, fontFamily: FontFamily.bold},
  navBtn: {
    backgroundColor: '#429EA6',
    height: 44,
    width: 174,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkStyle: {
    height: 30,
    width: 30,
    right: responsiveWidth(8),
  },
});
