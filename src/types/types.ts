import {ImageSourcePropType} from 'react-native';

export type UserIdType = {
  userId: string;
  tenantId?: string;
  landlordId?: string;
  gurantorId?: string;
  email?: string;
  title?: string;
  firstName?: string;
  surname?: string;
  password?: string;
  mobileNumber?: string;
  appointmentAvailabiilityDateTime?: Date;
  kycVerficationApproval?: boolean;
  userFullAddress?: string;
  customerAccountManagerId?: customerAccountManagerId;
  createdDate?: Date;
  totalRent?: number;
  dob?: string;
  userRating?: string;
  notifications?: Notifications;
  userChatId?: UserChatId;
};

export type Notifications = {
  type: string;
  message: string;
  reference: string;
  link: string;
  createdDate: string;
};
export type customerAccountManagerId = {
  customerAccountManagerId: string;
  csmFirstName: string;
  csmSurname: string;
  csmEmail: string;
  csmContactNumber: string;
};

export type UserChatId = {
  userChatId: string;
};

export type UserSettings = {
  id: number;
  name: string;
  textColor: string;
  imagePath: ImageSourcePropType;
  navigation: string;
};
