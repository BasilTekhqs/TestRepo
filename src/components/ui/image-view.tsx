import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {FontFamily} from '../../utils/fontDetails';
import {Icon} from 'react-native-elements';

type Props = {
  image: any;
  btnStyle?: Record<string, unknown>;
  txtStyle?: Record<string, unknown>;
  onPress?: () => void;
  data: Array<{
    imagePath: string;
  }>;
  detailedData: Array<{
    bedrooms: number;
    bathrooms: number;
    size: number;
    furnished: boolean;
    type: string;
    garden: boolean;
  }>;
  title?: string;
  price?: string;
  date?: string;
};

export const ImageView = ({
  image,
  data,
  title,
  detailedData,
  price,
  date,
}: Props) => {
  return (
    <>
      <Image source={image} style={styles.image} />
      <ScrollView
        style={styles.flatVIew}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item: any) => {
          return (
            <View style={{height: 130}}>
              <Image
                source={item.imagePath}
                style={styles.fdStyle}
                resizeMode="center"
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.titelView}>
        <Text style={styles.titelText}>{title}</Text>
        <Text style={styles.priceTxt}>{price}</Text>
      </View>
      <View style={styles.card}>
        {detailedData.map((item: any) => {
          return (
            <>
              <View style={styles.iconMainView}>
                <View style={styles.innerView}>
                  <Icon
                    name={'bed-king-outline'}
                    type={'material-community'}
                    color={'black'}
                    size={20}
                    tvParallaxProperties={undefined}
                  />
                  <Text style={styles.title}>
                    {item.bedrooms + ' bedrooms'}
                  </Text>
                </View>
                <Text style={styles.typeText}>{item.size + ' sqft'}</Text>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
              <View style={styles.iconMainView}>
                <View style={styles.innerView}>
                  <Icon
                    name={'bath'}
                    type={'font-awesome-5'}
                    color={'black'}
                    size={18}
                    tvParallaxProperties={undefined}
                  />
                  <Text style={styles.title}>
                    {item.bathrooms + ' bathrooms'}
                  </Text>
                </View>
                <Text style={styles.typeText}>
                  {item.furnished ? 'Furnished' : 'Not Furnished'}
                </Text>
                <Text style={styles.typeText}>
                  {item.garden ? 'Garden' : 'No Garden'}
                </Text>
              </View>
            </>
          );
        })}
      </View>
      <View style={styles.date}>
        <Text style={styles.dateTexxt}>{'Date available:' + ' ' + date}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 370,
    alignSelf: 'center',
    borderRadius: 20,
  },
  fdStyle: {
    height: 90,
    width: 90,
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 20,
  },
  imageView: {
    width: '90%',
    backgroundColor: 'white',
  },
  flatVIew: {
    marginVertical: 10,
  },
  titelView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titelText: {
    width: '80%',
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  priceTxt: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
  },
  iconMainView: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 10,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '39%',
    marginRight: 15,
  },
  title: {
    fontSize: 14,
    width: '75%',
    fontFamily: FontFamily.medium,
  },
  typeText: {
    fontSize: 14,
    width: '30%',
    fontFamily: FontFamily.medium,
  },
  card: {
    marginTop: 15,
  },
  date: {
    marginTop: 20,
    marginLeft: 15,
  },
  dateTexxt: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
  },
});
