import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Box, Input, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/Feather';

type Props = {
  inputTitle: string;
  icon: boolean;
  inputStyle: Record<string, unknown>;
};

const PayInput = ({inputTitle, icon, inputStyle}: Props) => {
  return (
    <Box mb={2}>
      <Text
        mx="2"
        my="2"
        style={{fontSize: 14, fontWeight: '500'}}
        maxWidth="100%"
      >
        {inputTitle}
      </Text>
      <View style={[styles.inputVIew, inputStyle]}>
        <Input w={icon ? '85%' : '95%'} variant="unstyled" />

        {icon ? (
          <>
            <Box height="90%"></Box>
            <Box alignItems={'center'} mr={2}>
              <TouchableOpacity>
                <AntDesign name="camera" color="black" size={20} />
              </TouchableOpacity>
            </Box>
          </>
        ) : null}
      </View>
    </Box>
  );
};

export default PayInput;

const styles = StyleSheet.create({
  inputVIew: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 5,
  },
});
