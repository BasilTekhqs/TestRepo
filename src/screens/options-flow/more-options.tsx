import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Box} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Images} from '../../utils/imgDetails';
import Card from '../../components/ui/card-home';
import AnimatedHeader from '../../components/ui/animated-header';
import {SettingsStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type Props = StackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

const MoreOptions = () => {
  const navigation = useNavigation<Props>();

  const offset = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <AnimatedHeader animatedValue={offset} backgroundImage={Images.IMG} />
        <Box style={styles.cardContainer}>
          <ScrollView
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
            <View style={styles.cardRow}>
              <Card
                title="Add your first Property"
                image={Images.HomePlus}
                onPress={() => {
                  navigation.navigate('OnboardingProperty');
                }}
              />
            </View>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default MoreOptions;

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: '#3F97A0',
    height: 50,
    width: 350,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  innerButtonView: {
    height: 50,
    width: 350,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    opacity: 0.2,
  },
  flatView: {
    marginVertical: 10,
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '92%',
    marginTop: 15,
    alignSelf: 'center',
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});
