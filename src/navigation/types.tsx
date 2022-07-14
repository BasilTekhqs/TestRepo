import * as ImagePicker from 'react-native-image-picker';

export type AuthStackParamList = {
  login: undefined;
  emailAuthScreen: undefined;
  onboarding: undefined;
  splash: undefined;
  personaldetails: undefined;
  addressdetails: undefined;
  idverification: undefined;
  signin: undefined;
  App: undefined;
};

export type ChatStackParamList = {
  ChatHome: undefined;
  Inbox: undefined;
  GiftedChat: undefined;
  MySettings: undefined;
};

export type PropertyDocumentsStackParamList = {
  DocumentsList: undefined;
  EPCReport: undefined;
  InsuranceDoc: undefined;
  GasSafety: undefined;
  EICRDocument: undefined;
  HMO: undefined;
  SelectiveLicence: undefined;
  FloorPlan: undefined;
  MySettings: undefined;
  VideoTour: undefined;
};

export type PropertOnboardingStackParamList = {
  Property: undefined;
  AddPropertyDetails: undefined;
  AddPropertyImages: undefined;
  PropertyImagesPreview: {
    resourcePath: ImagePicker.ImagePickerResponse[];
  };
  Documents: undefined;
  AddTenancyDetails: undefined;
  MySettings: undefined;
};

export type PropertiesStackParamList = {
  PropertyHome: undefined;
  AddProperty: undefined;
  PropertyHomeDetails: {
    address: string;
  };
  FloorPlanDetails: undefined;
  EditProperty: undefined;
  EditPropertyDetails: undefined;
  AddInfo: undefined;
  FullDetails: undefined;
  TDetails: undefined;
  AddTenancy: undefined;
  AgreementTenancy: undefined;
  DepositProtection: undefined;
  AddedTenantDetails: undefined;
  InvitePartner: undefined;
  MySettings: undefined;
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  ReferFriend: undefined;
  MySettings: undefined;
  UserDetails: undefined;
  OnboardingProperty: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  Payment: undefined;
};
export type UserProfileStackParamList = {
  UserSettings: undefined;
  UserDetails: undefined;
  ChangePass: undefined;
  EditIdVerification: undefined;
  EditAddress: undefined;
  EditPersonalDetails: undefined;
  EditProfile: undefined;
  Feedback: undefined;
  PrivacyPolicy: undefined;
};
