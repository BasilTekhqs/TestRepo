import {Box} from 'native-base';
import React, {useRef} from 'react';
import {
  ScrollView,
  View,
  Animated,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Images} from '../../utils/imgDetails';
import Card from '../../components/ui/card-home';
import AnimatedHeader from '../../components/ui/animated-header';
import {FontFamily} from '../../utils/fontDetails';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {itemArray} from '../../assets/local-dataset/local-dataset';

import {HomeStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = () => {
  const navigation = useNavigation<Props>();

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <AnimatedHeader animatedValue={offset} backgroundImage={Images.IMG} />
        <Box style={styles.cardContainer}>
          <ScrollView
            horizontal={false}
            style={{flex: 1, backgroundColor: 'white'}}
            contentContainerStyle={{
              alignItems: 'center',
              paddingTop: 300,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}
          >
            <Image source={Images.LOGO} style={{height: 65, width: 63}} />
            <ScrollView horizontal={true}>
              <FlatList
                data={itemArray}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={() => {
                  return (
                    <Image
                      source={Images.TIPS}
                      style={styles.tipsImage}
                      resizeMode="contain"
                    />
                  );
                }}
              />
            </ScrollView>
            <View style={styles.cardRow}>
              <Card
                title="Add your first property"
                image={Images.HomePlus}
                onPress={() => {}}
              />
              <Card
                title="Refer a friend"
                image={Images.UserPlus}
                onPress={() => {}}
              />
            </View>
            <View style={styles.cardRow}>
              <Card
                title="Select your package"
                image={Images.PACKAGECHANGE}
                onPress={() => {}}
              />
              <Card
                title="Add your payment details"
                image={Images.WALLET}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    flex: 0.5,
    borderWidth: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
  },
  heading: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    fontFamily: FontFamily.bold,
    color: 'black',
    fontSize: 30,
    marginVertical: 15,
  },
  tipsImage: {
    height: 200,
    width: 380,
    marginBottom: 30,
    marginLeft: responsiveWidth(2),
  },
});
