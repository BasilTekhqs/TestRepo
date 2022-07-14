/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PropertyInformation from '../screens/property-screens/property-information';
import PropertyImagesPreview from '../screens/property-screens/property-details3';
import AddPropertyImages from '../screens/property-screens/add-property-images';
import AddPropertyDetails from '../screens/property-screens/add-property-details';
import Documents from '../screens/documents-screens/documents-screen';
import EPCReportScreen from '../screens/documents-screens/ecp-report-screen';
import PropertyHome from '../screens/property-screens/property-home';
import InsuranceDoc from '../screens/documents-screens/Insurance-doc';
import GasSafety from '../screens/documents-screens/gas-safety';
import EICRDocument from '../screens/documents-screens/eicr-report';
import HMODocument from '../screens/documents-screens/hmo-licence';
import SelectiveLicence from '../screens/documents-screens/selective-licence';
import FloorPlan from '../screens/documents-screens/floor-plan';
import FullDetails from '../screens/tenancy-flow/full-details';
import PropertyHomeDetails from '../screens/property-screens/property-home-detail';
import VideoTour from '../screens/tenancy-flow/video-tour';
import FloorPlanDetails from '../screens/tenancy-flow/floor-plan';
import EditProperty from '../screens/property-screens/edit-property';
import EditPropertyDetails from '../screens/property-screens/edit-property-details';
import InvitePartner from '../screens/property-screens/invite-partner';
import SettingsHome from '../screens/options-flow/more-options';
import HomeScreen from '../screens/home-flow/home-screen';
import ReferFriend from '../screens/referal-flow/refer-friend';
import MySettings from '../screens/settings-flow/my-settings';
import UserDetails from '../screens/user-profile/user-details';
import ChangePass from '../screens/user-profile/change-pass';
import EditAddress from '../screens/user-profile/edit-address';
import EditIdVerification from '../screens/user-profile/edit-id-verfication';
import EditPersonalDetails from '../screens/user-profile/edit-personal-detail';
import EditProfile from '../screens/user-profile/edit-profile';
import Feedback from '../screens/feedback-flow/feedback-screen';
import PrivacyPolicy from '../screens/privacy-policy/privacy-policy';
import TenancyDetails from '../screens/tenancy-flow/tenancy-details'
import {
  PropertiesStackParamList,
  PropertOnboardingStackParamList,
  PropertyDocumentsStackParamList,
  SettingsStackParamList,
  HomeStackParamList,
  UserProfileStackParamList,
} from './types';

const Properties = createStackNavigator<PropertiesStackParamList>();
const PropertOnboarding =
  createStackNavigator<PropertOnboardingStackParamList>();
const PropertyDocuments =
  createStackNavigator<PropertyDocumentsStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const UserProfileStack = createStackNavigator<UserProfileStackParamList>();

const DocumentsProperty = () => {
  return (
    <PropertyDocuments.Navigator
      initialRouteName="DocumentsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <PropertyDocuments.Screen name="DocumentsList" component={Documents} />
      <PropertyDocuments.Screen name="EPCReport" component={EPCReportScreen} />
      <PropertyDocuments.Screen name="InsuranceDoc" component={InsuranceDoc} />
      <PropertyDocuments.Screen name="GasSafety" component={GasSafety} />
      <PropertyDocuments.Screen name="EICRDocument" component={EICRDocument} />
      <PropertyDocuments.Screen name="HMO" component={HMODocument} />
      <PropertyDocuments.Screen
        name="SelectiveLicence"
        component={SelectiveLicence}
      />
      <PropertyDocuments.Screen name="FloorPlan" component={FloorPlan} />
      <PropertyDocuments.Screen name="VideoTour" component={VideoTour} />
    </PropertyDocuments.Navigator>
  );
};

const OnboardingProperty = () => {
  return (
    <PropertOnboarding.Navigator
      initialRouteName="Property"
      screenOptions={{
        headerShown: false,
        headerTitle: '',
      }}
    >
      <PropertOnboarding.Screen
        name="Property"
        component={PropertyInformation}
      />
      <PropertOnboarding.Screen
        name="AddPropertyDetails"
        component={AddPropertyDetails}
      />
      <PropertOnboarding.Screen
        name="AddPropertyImages"
        component={AddPropertyImages}
      />
      <PropertOnboarding.Screen
        name="PropertyImagesPreview"
        component={PropertyImagesPreview}
      />
      <PropertOnboarding.Screen
        name="Documents"
        component={DocumentsProperty}
      />
      <PropertOnboarding.Screen name="AddTenancyDetails" component={TenancyDetails} />

    </PropertOnboarding.Navigator>
  );
};

export const UserProfile = () => {
  return (
    <UserProfileStack.Navigator
      initialRouteName="UserSettings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserProfileStack.Screen name="UserSettings" component={MySettings} />
      <UserProfileStack.Screen name="UserDetails" component={UserDetails} />
      <UserProfileStack.Screen name="ChangePass" component={ChangePass} />
      <UserProfileStack.Screen
        name="EditIdVerification"
        component={EditIdVerification}
      />
      <UserProfileStack.Screen name="EditAddress" component={EditAddress} />
      <UserProfileStack.Screen
        name="EditPersonalDetails"
        component={EditPersonalDetails}
      />
      <UserProfileStack.Screen name="EditProfile" component={EditProfile} />
      <UserProfileStack.Screen name="Feedback" component={Feedback} />
      <UserProfileStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </UserProfileStack.Navigator>
  );
};

export const SettingsFlow = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="SettingsHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="SettingsHome" component={SettingsHome} />
      <SettingsStack.Screen name="ReferFriend" component={ReferFriend} />
      <SettingsStack.Screen
        name="OnboardingProperty"
        component={OnboardingProperty}
      />
    </SettingsStack.Navigator>
  );
};

export const HomeMainStack = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export const PropertiesNavigator = () => {
  return (
    <Properties.Navigator
      initialRouteName="PropertyHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Properties.Screen name="PropertyHome" component={PropertyHome} />
      <Properties.Screen name="AddProperty" component={OnboardingProperty} />
      <Properties.Screen
        name="PropertyHomeDetails"
        component={PropertyHomeDetails}
      />
      <Properties.Screen name="FloorPlanDetails" component={FloorPlanDetails} />
      <Properties.Screen name="EditProperty" component={EditProperty} />
      <Properties.Screen
        name="EditPropertyDetails"
        component={EditPropertyDetails}
      />
      <Properties.Screen name="FullDetails" component={FullDetails} />
      <Properties.Screen name="InvitePartner" component={InvitePartner} />
    </Properties.Navigator>
  );
};
