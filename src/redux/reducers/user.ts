import {
  LOGGED_IN_USER,
  LOGGED_OUT_USER,
  SET_USER_TYPE,
  SET_PERSONAL_DETAILS_INFORMATION,
  SET_PERSONAL_DETAILS_ADDRESS,
  SET_PERSONAL_DETAILS_ERROR,
  SET_TENANTID,
  SET_LANDLORDID,
} from '../constants/userConstants';

const userId = {
  userId: '',
  landlordId: '',
  tenantId: '',
  gurantorId: '',
  email: '',
  title: '',
  createdAt: '',
  firstName: '',
  lastName: '',
  gdprApproval: false,
  termsOfUseApproval: false,
  mobileNumber: '',
  appointmentAvailabiilityDateTime: '',
  kycVerficationApproval: false,
  userFullAddress: {
    postCode: '',
    address: '',
  },
  customerAccountManagerId: '',
  createdDate: '',
  paymentMethods: '',
  totalRent: 1,
  dob: ' ',
  paymentId: ' ',
  userRating: '',
  notifications: '',
  userChatId: '',
};

const userType = 'landlord';

const intialState = {
  userId,
  userType,
};

const userReducer = (state = intialState, action: any) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return {...state, userId: {...state.userId, ...action.payload}};
    case LOGGED_OUT_USER:
      return {...state, userId};
    case SET_USER_TYPE:
      return {...state, userType: action.payload};
    case SET_PERSONAL_DETAILS_INFORMATION:
      return {
        ...state,
        userId: {
          ...state.userId,
          title: action.payload.title,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          dob: action.payload.dob,
        },
      };
    case SET_PERSONAL_DETAILS_ADDRESS:
      return {
        ...state,
        userId: {...state.userId, userFullAddress: action.payload},
      };
    case SET_TENANTID:
      return {
        ...state,
        userId: {...state.userId, tenantId: action.payload.tenantId},
      };
    case SET_LANDLORDID:
      return {
        ...state,
        userId: {...state.userId, landlordId: action.payload.landlordId},
      };
    case SET_PERSONAL_DETAILS_ERROR:
      return {...state, userId: action.payload};
    default:
      return state;
  }
};

export default userReducer;
