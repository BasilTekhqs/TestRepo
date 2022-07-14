/* eslint-disable prettier/prettier */
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Box, Input, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  inputTitle: string;
  dropdown: boolean;
  secured?:boolean;
  multilneFlag?: boolean;
  inputHeight?: number;
  onChange?: (val: string) => any;
  onBlur?: () => void;
  value?: string;
};

const InputBox = ({
  inputTitle,
  dropdown,
  multilneFlag,
  inputHeight,
  value,
  onChange,
  onBlur,
  secured
}: Props) => {
  return (
    <Box w={Platform.OS === 'ios' ? '90%' : '85%'} mb={3} alignSelf={'center'}>
      <Text
        mx="1"
        my="2"
        style={styles.TextStyle}
        maxWidth="86%"
        fontWeight={500}
      >
        {inputTitle}
      </Text>
      <Box
        bg="#E8E8E8"
        pt={2}
        pb={2}
        flexDirection="row"
        alignItems="center"
        borderRadius={8}
      >
        <Input
          w="90%"
          value={value}
          variant="unstyled"
          style={{textAlignVertical: 'top'}}
          height={inputHeight ? inputHeight : '10'}
          multiline={multilneFlag}
          onChangeText={onChange}
          onBlur={onBlur}
          autoCorrect={false}
          secureTextEntry={secured}
        />
        {dropdown ? (
          <>
            <Box
              borderWidth={1}
              height="90%"
              mx="1"
              borderColor="#C8C8C8"
            ></Box>
            <Box mr="2">
              <TouchableOpacity>
                <AntDesign name="caretup" color="grey" />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="caretdown" color="grey" />
              </TouchableOpacity>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  TextStyle: {fontSize: 14, fontFamily: FontFamily.bold},
});
