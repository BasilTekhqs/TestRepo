import {Box} from 'native-base';
import React from 'react';
import {StyleSheet, Text, FlatList, View, Image} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';

type Props = {
  data: Array<{
    id: string;
    image: string;
    name: string;
    status: boolean;
  }>;
  subData: Array<{
    id: number;
    title: string;
    description: string;
  }>;
};

const TenancyCard = ({data, subData}: Props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.aboveCard}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Box mt={3} mb={3} mr={2} ml={3}>
                <View>
                  <Image source={{uri: item.image}} style={styles.image} />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </Box>
            );
          }}
        />
      </View>
      <View style={styles.belowCard}>
        <FlatList
          data={subData}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Box mt={3} mb={3} mr={2} ml={3}>
                <View style={styles.mainDesView}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.desText}>{item.description}</Text>
                </View>
              </Box>
            );
          }}
        />
      </View>
    </View>
  );
};
export default TenancyCard;

const styles = StyleSheet.create({
  mainView: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FD9926',
    marginBottom: 20,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  aboveCard: {
    backgroundColor: 'transparent',
    width: '100%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginVertical: 5,
  },
  belowCard: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopWidth: 1,
    borderColor: '#FD9926',
  },
  mainDesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  desText: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
});
