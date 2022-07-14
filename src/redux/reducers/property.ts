import {
  SET_PROPERTY_DATA,
  SET_APPOINTMENT_DATA,
  SET_RENTAL_OFFER,
  SET_PROPERTY_COMPLIANCE_DATA,
} from '../constants/propertyConstants';

const propertyId = {
  propertyId: null,
  referenceNumber: null,
  landlordId: null,
  landlordName: null,
  tenantId: null,
  tenancyId: null,
  propertyFullAddress: {
    address: null,
    postcode: null,
  },
  accomodationStatus: null,
  roomName: null,
  type: null,
  furniture: null,
  garden: null,
  description: null,
  bedrooms: 1,
  bathroom: 1,
  ensuite: false,
  advertisedMonthlyRent: 0,
  advertisedDeposit: 0,
  advertisedTenancyTerm: 0,
  maxTenants: 1,
  advertisedTenancyRenewal: null,
  companyId: {},
  smoking: false,
  student: false,
  employmentStatus: null,
  advertisedMoveInDate: new Date(),
  images: {},
  propertyComplianceDocuments: {},
  propertyStatus: null,
  invitationId: {},
  advertId: {},
  createdDate: {},
  appointmentId: {},
  propertyUtilities: [
    {electricity: false},
    {gas: false},
    {tvLicence: false},
    {councilTax: false},
    {wiFi: false},
    {cleaning: false},
  ],
  propertyFeedback: null,
};
const appointmentId = {
  appointmentId: '',
  appointmentDateTime: null,
  tenantId: null,
  createdDate: null,
  appointmentStatus: null,
  rentalOffer: {
    moveInDate: null,
    totalTenants: null,
    monthlyRent: null,
    createdDate: null,
  },
};
const tenancyId = {};
const propertyComplianceDocuments = {
  eicrReport: {
    exemption: '',
    number: '',
    issueDate: '',
    reference: '',
    images: 'string',
    verified: false,
  },
  epcReport: {
    exemption: '',
    number: '',
    issueDate: '',
    images: 'string',
    verified: false,
  },
  gasSafety: {
    exemption: '',
    number: '',
    issueDate: '',
    reference: '',
    images: 'string',
    verified: false,
  },
  hmoLicence: {
    exemption: '',
    number: '',
    issueDate: '',
    images: 'string',
    verified: false,
  },
  insuranceDoc: {
    visible: '',
    number: '',
    insurerName: '',
    issueDate: Date,
    startDate: Date,
    endDate: Date,
    images: 'string',
  },
  selectiveLicence: {
    exemption: '',
    number: '',
    issueDate: '',
    images: 'string',
    verified: false,
  },
  floorPlan: {
    size: '',
    image: '',
  },
};
const initialState = {
  propertyId,
  appointmentId,
  tenancyId,
  propertyComplianceDocuments,
};
const property = (state = initialState, action: {type: any; payload: any}) => {
  switch (action.type) {
    case SET_PROPERTY_DATA:
      return {...state, propertyId: action.payload};
    case SET_APPOINTMENT_DATA:
      return {...state, appointmentId: action.payload};
    case SET_PROPERTY_COMPLIANCE_DATA:
      return {...state, propertyComplianceDocuments: action.payload};
    case SET_RENTAL_OFFER:
      return {
        ...state,
        appointmentId: {...state.appointmentId, rentalOffer: action.payload},
      };
    default:
      return state;
  }
};

export default property;
