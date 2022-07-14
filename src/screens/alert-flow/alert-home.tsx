import {
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import React, {useRef} from 'react';
import {Box} from 'native-base';
import AlertCard from '../../components/ui/alert-card';
import {alertData} from '../../assets/local-dataset/local-dataset';
import AnimatedHeader from '../../components/ui/animated-header';
import {Images} from '../../utils/imgDetails';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

type Props = {
  navigation: {
    goBack(): void;
    navigate: (name: string) => void;
  };
};

const AlertHome = ({navigation}: Props) => {
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <AnimatedHeader animatedValue={offset} backgroundImage={Images.IMG} />
        <Box style={styles.cardContainer}>
          <ScrollView
            horizontal={false}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewConttainerStyle}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}
          >
            <Image source={Images.LOGO} style={{height: 65, width: 63}} />
            <Text style={styles.alertsText}>My alerts</Text>
            <ScrollView horizontal={true}>
              <FlatList
                data={alertData}
                horizontal={false}
                renderItem={({item, index}) => {
                  return (
                    <AlertCard
                      title={item.title}
                      icon={true}
                      onpress={() => {
                        navigation.navigate('AccountVerification');
                      }}
                    />
                  );
                }}
              />
            </ScrollView>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default AlertHome;

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertsText: {
    fontSize: responsiveFontSize(3.5),
    marginVertical: responsiveHeight(1),
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewConttainerStyle: {
    alignItems: 'center',
    paddingTop: 300,
  },
});
