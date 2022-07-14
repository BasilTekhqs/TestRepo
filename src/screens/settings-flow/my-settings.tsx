import {
  StyleSheet,
  FlatList,
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';
import React, {useRef} from 'react';
import SettingList from '../../components/ui/setting-list';
import {SettingsData} from '../../assets/local-dataset/local-dataset';
import AnimatedHeader from '../../components/ui/animated-header';
import {Images} from '../../utils/imgDetails';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Box} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {UserProfileStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
type Props = StackNavigationProp<UserProfileStackParamList, 'UserSettings'>;

const MySettings = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<Props>();

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
            <Text style={styles.alertsText}>My settings</Text>
            <ScrollView horizontal={true}>
              <FlatList
                data={SettingsData}
                renderItem={({item}) => (
                  <SettingList
                    title={item.name}
                    titleColor={item.textColor}
                    imageSource={item.imagePath}
                    navigation={navigation}
                    screenName={item.navigation}
                  />
                )}
              />
            </ScrollView>
          </ScrollView>
        </Box>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MySettings;

const styles = StyleSheet.create({
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
});
