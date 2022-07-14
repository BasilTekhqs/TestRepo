import React from 'react';
import {Box, Checkbox, FlatList, Text} from 'native-base';

type Props = {
  items: string[];
  title: string;
};

export const CheckBox = ({items, title}: Props) => {
  return (
    <>
      <Text
        ml={-7}
        alignSelf={'center'}
        w={'80%'}
        mt={2}
        mb={3}
        fontSize={14}
        fontWeight={400}
      >
        {title}
      </Text>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Box
            alignSelf="center"
            flexDirection={'row'}
            justifyContent={'space-between'}
            w={'87%'}
            my={3}
          >
            {item}
            <Checkbox value={item} accessibilityLabel="pick item" />
          </Box>
        )}
        // keyExtractor={item => item.id}
      />
    </>
  );
};
