import React, {useState} from 'react';
import {Radio, FormControl, Container, Text} from 'native-base';
import {FontFamily} from '../../utils/fontDetails';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

type Props = {
  title?: string;
  items: string[];
  dir?: 'row' | 'column';
  onChange: (e: any) => void;
  value: string;
  name: string;
};

export const RadioButton = ({
  title,
  items,
  dir = 'column',
  name,
  onChange,
}: Props) => {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Radio.Group
        flexDirection={dir}
        name={name}
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          onChange(nextValue);
        }}
      >
        <FormControl.Label
          _text={{
            fontSize: 14,
            fontFamily: FontFamily.bold,
          }}
        >
          {title}
        </FormControl.Label>

        {items.map(itemName => (
          <Radio key={itemName} value={itemName} my={1} mr={3} bg="white">
            <Text marginRight={5}>{itemName}</Text>
          </Radio>
        ))}
      </Radio.Group>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
   marginLeft:responsiveWidth(6)
  },
});