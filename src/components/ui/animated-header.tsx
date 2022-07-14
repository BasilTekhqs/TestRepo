import React from 'react';
import {Animated, ImageBackground, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const HEADER_HEIGHT = 300;

type Props = {
  backgroundImage: any;
  animatedValue: any;
};
const AnimatedHeader = ({animatedValue, backgroundImage}: Props) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 60],
    extrapolate: 'clamp',
  });

  const animateHeaderBackgroundColor = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: ['#4286F4', '#00BCD4'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          height: headerHeight,
        },
      ]}
    >
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </Animated.View>
  );
};

export default AnimatedHeader;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? responsiveHeight(4) : 0,
  },
  animated: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'lightblue',
  },
});
