/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LogInScreen from '../screens/auth-flow/logIn-screen';
import EmailAuthScreen from '../screens/auth-flow/email-auth-screen';
import OnboardingScreen from '../screens/auth-flow/onboarding-screen';
import PersonalDetails from '../screens/auth-flow/personal-details';
import AddresDetails from '../screens/auth-flow/address-details';
import IdVerification from '../screens/auth-flow/id-verification';
import Splash from '../screens/auth-flow/splash-screen';
import Signin from '../screens/auth-flow/signIn-screen';

import {AuthStackParamList} from './types';

const Stack = createStackNavigator<AuthStackParamList>();
const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="splash"
    >
      <Stack.Screen name="login" component={LogInScreen} />
      <Stack.Screen name="emailAuthScreen" component={EmailAuthScreen} />
      <Stack.Screen name="onboarding" component={OnboardingScreen} />
      <Stack.Screen name="splash" component={Splash} />
      <Stack.Screen name="personaldetails" component={PersonalDetails} />
      <Stack.Screen name="addressdetails" component={AddresDetails} />
      <Stack.Screen name="idverification" component={IdVerification} />
      <Stack.Screen name="signin" component={Signin} />
    </Stack.Navigator>
  );
};
export default Auth;
