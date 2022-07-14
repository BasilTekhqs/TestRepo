import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {responsiveHeight} from 'react-native-responsive-dimensions';

type Props = {
  title: string;
  cardTitle: string;
  data: Array<{
    id: number;
    title: string;
    image: ImageSourcePropType;
    flag: boolean;
  }>;
  selected: () => void;
  setData: ([]) => void;
};

const PayComp: React.FC<Props> = ({data, selected, setData}) => {
  const Selection = (index: number) => {
    const copy = [...data];
    copy.forEach(E => {
      E.flag = false;
    });
    copy[index].flag = true;
    setData(copy);
  };
  return (
    <View style={styles.MainView}>
      <View style={styles.FlatVIew}>
        <FlatList
          data={data}
          renderItem={({index, item}) => {
            return (
              <View style={styles.mainFlatView}>
                <View style={styles.innerView}>
                  <View style={styles.leftSide}>
                    <Image
                      source={item.image}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <Text style={styles.titleText}> {item.title} </Text>
                  </View>
                  <TouchableOpacity onPress={() => Selection(index)}>
                    {item.flag ? (
                      <Icons
                        name="ios-radio-button-on"
                        size={25}
                        color="black"
                      />
                    ) : (
                      <Icons
                        name="ios-radio-button-off"
                        size={25}
                        color="black"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
export default PayComp;

const styles = StyleSheet.create({
  MainView: {
    width: '100%',
    alignSelf: 'center',
  },
  image: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
  },
  FlatVIew: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '90%',
  },
  innerView: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
  },
  titleText: {
    fontSize: 15,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '80%',
    fontWeight: '500',
  },
  mainFlatView: {
    marginVertical: 10,
  },
});
