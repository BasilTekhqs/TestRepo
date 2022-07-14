import {StyleSheet, Text} from 'react-native';
import {Container} from 'native-base';
import React from 'react';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  title: string;
  txtcontainer: Object;
  textStyle?: Object;
};

const MainHeading = ({title, txtcontainer = {}, textStyle = {}}: Props) => {
  return (
    <Container style={[styles.textContainer, txtcontainer]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Container>
  );
};

export default MainHeading;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    fontFamily: FontFamily.bold,
  },
  textContainer: {
    alignSelf: 'center',
  },
});
