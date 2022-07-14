import {Box} from 'native-base';
import React, {useRef, useState} from 'react';
import {
  ScrollView,
  Animated,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Images} from '../../utils/imgDetails';
import AnimatedHeader from '../../components/ui/animated-header';
import {NavigationButton} from '../../components/ui/button';
import PropertyHomeComponent from '../../components/ui/property-home-component';
import {propertyHome} from '../../assets/local-dataset/local-dataset';

import {PropertiesStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<PropertiesStackParamList, 'PropertyHome'>;

const HomeScreen = () => {
  const navigation = useNavigation<Props>();

  const offset = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState(propertyHome);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AnimatedHeader
          animatedValue={offset}
          backgroundImage={Images.PROPERTYMAIN}
        />
        <Box style={styles.cardContainer}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.containerScrollView}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}
            horizontal={false}
          >
            <Image source={Images.LOGO} style={styles.imageStyle} />
            <>
              <ScrollView horizontal={true}>
                <FlatList
                  data={data}
                  renderItem={({item}) => {
                    return (
                      <PropertyHomeComponent
                        status={item.stutus}
                        tenant={item.Tenant}
                        deposit={item.Rent}
                        image={item.image}
                        propertyName={item.propertname}
                        onPress={() => {
                          navigation.navigate('PropertyHomeDetails', {
                            address: item.propertname,
                          });
                        }}
                      />
                    );
                  }}
                />
              </ScrollView>
            </>
          </ScrollView>
        </Box>
        <Box
          flex={0}
          alignItems="center"
          justifyContent={'flex-end'}
          mb="2"
          backgroundColor={'#fff'}
        >
          <NavigationButton
            text="Add a property"
            btnStyle={{
              backgroundColor: '#3F97A0',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
            }}
            txtStyle={{}}
            onPress={() => {
              navigation.navigate('AddProperty');
            }}
          />
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgoundColor: '#fff',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginTop: 10,
  },
  container: {flex: 1, backgroundColor: '#fff'},
  containerScrollView: {
    alignItems: 'center',
    paddingTop: 300,
  },
  imageStyle: {height: 65, width: 63},
});
