import {Platform} from 'react-native';

export const FontFamily = {
  black: Platform.OS === 'android' ? 'Raleway-Black' : 'Raleway-Black',
  bold: Platform.OS === 'android' ? 'Raleway-Bold' : 'Raleway-Bold',
  extraBold:
    Platform.OS === 'android' ? 'Raleway-ExtraBold' : 'Raleway-ExtraBold',
  extraLight:
    Platform.OS === 'android' ? 'Raleway-ExtraLight' : 'Raleway-ExtraLight',
  light: Platform.OS === 'android' ? 'Raleway-Light' : 'Raleway-Light',
  medium: Platform.OS === 'android' ? 'Raleway-Medium' : 'Raleway-Medium',
  regular: Platform.OS === 'android' ? 'Raleway-Regular' : 'Raleway-Regular',
  thin: Platform.OS === 'android' ? 'Raleway-Thin' : 'Raleway-Thin',
};
