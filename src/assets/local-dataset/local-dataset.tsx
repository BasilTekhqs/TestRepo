import {Images} from '../../utils/imgDetails';

export const PayData = [
  {
    id: 1,
    title: 'Credit Card',
    image: Images.MASTERCARD,
    flag: true,
  },
  {
    id: 2,
    title: 'PayPal',
    image: Images.PAYPAL,
    flag: false,
  },
  {
    id: 3,
    title: 'Google Play',
    image: Images.GOOGLEPLAY,
    flag: false,
  },
  {
    id: 4,
    title: 'Stripe',
    image: Images.STRIP,
    flag: false,
  },
];
export const cardsDetails = [
  {
    id: 1,
    title: 'Personal details',
    text: 'Add',
    screen: 'personaldetails',
    flag: false,
  },
  {
    id: 2,
    title: 'Address details',
    text: 'Add',
    screen: 'addressdetails',
    flag: false,
  },
];
export const docInitalState = [
  {
    id: 1,
    title: 'EPC Report',
    screen: 'EPCReport',
    value: 'epcReport',
    flag: false,
  },
  {
    id: 2,
    title: 'Insurance documents',
    screen: 'InsuranceDoc',
    value: 'insuranceDocument',
    flag: false,
  },
  {
    id: 3,
    title: 'Gas safety certificate',
    screen: 'GasSafety',
    value: 'gasSafety',
    flag: false,
  },
  {
    id: 4,
    title: ' EICRDocument',
    screen: 'EICRDocument',
    value: 'eicrReport',
    flag: false,
  },
  {
    id: 5,
    title: 'HMO Licence',
    screen: 'HMO',
    value: 'hmoLicence',
    flag: false,
  },
  {
    id: 6,
    title: 'Selective Licence',
    screen: 'SelectiveLicence',
    value: 'selectiveLicence',
    flag: false,
  },
  {
    id: 7,
    title: 'Floorplan',
    screen: 'FloorPlan',
    value: 'floorPlan',
    flag: false,
  },
];
export const initalState = [
  {
    id: 1,
    title: 'Property details',
    screen: 'AddPropertyDetails',
    flag: false
  },
  {
    id: 2,
    title: 'Documents',
    screen: 'Documents',
    flag:false
  },
  {
    id: 3,
    title: 'Tenancy details',
    screen: 'AddTenancyDetails',
    flag: false
  },
];
export const propertyCardsDetails = [
  {
    id: 1,
    title: 'Property details',
    screen: 'AddPropertyDetails',
    flag: false
  },
  {
    id: 2,
    title: 'Documents',
    screen: 'Documents',
    flag:false
  },
  {
    id: 3,
    title: 'Tenancy details',
    screen: 'AddTenancyDetails',
    flag: false
  },
];
export const fullDetailDataset = [
  {
    bedrooms: 2,
    bathrooms: 3,
    size: 1000,
    furnished: true,
    type: 'Appartment',
    garden: true,
  },
];
export const propertyHome = [
  {
    id: 1,
    propertname: 'High Street Apartment',
    Tenant: 'Lisa White',
    Rent: '£1000 pcm',
    image: Images.BED,
    stutus: 'Vacant',
  },
  {
    id: 2,
    propertname: 'High Street Apartment',
    Tenant: 'Lisa White',
    Rent: '£1000 pcm',
    image: Images.BED,
    stutus: 'Vacant',
  },
];

export const propertyDetail = [
  {
    id: '1',
    image: 'https://randomuser.me/api/portraits/women/57.jpg',
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/women/49.jpg',
  },
];
export const buttonPropertyDetail = [
  {
    id: 1,
    title: 'Chat',
    screen: 'chatHome',
  },
  {
    id: 2,
    title: 'Maintenance',
    screen: '',
  },
  {
    id: 1,
    title: 'Tenancy',
    screen: 'AddedTenantDetails',
  },
];
export const inboxData = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/57.jpg',
    name: 'Lisa White',
    status: 'Available',
  },
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'Lisa Jacob',
    status: 'Available',
  },
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Marie Jacob',
    status: 'Available',
  },
];
export const TenancyData = [
  {
    id: '1',
    image: 'https://randomuser.me/api/portraits/women/57.jpg',
    name: 'Lisa White',
    status: true,
  },
  {
    id: '2',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    name: 'Lisa Jacob',
    status: false,
  },
  {
    id: '3',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Marie Jacob',
    status: false,
  },
];
export const TenancyDataset = [
  {
    id: 1,
    title: 'Tenancy Start Date',
    description: '20/04/2022',
  },
  {
    id: 2,
    title: 'Deposit',
    description: '£500',
  },
  {
    id: 3,
    title: 'Rent',
    description: '£1,000',
  },
  {
    id: 4,
    title: 'Rent Due Date',
    description: '1st of each month',
  },
  {
    id: 5,
    title: 'Tenancy Due Date',
    description: '20/10/2022',
  },
  {
    id: 6,
    title: 'Break Clause',
    description: 'No break clause',
  },
  {
    id: 7,
    title: 'Premises',
    description: 'High Street Apartment',
  },
];
export const onBoardingItem = ['Tenant', 'Landlord'];
export const genderData = ['Mr', 'Mrs', 'Miss', 'Ms'];
export const optionData = ['Yes', 'No', 'Exempt'];
export const BooleanData = ['Yes', 'No'];
export const itemArray = [1, 2, 3];
export const privateData = ['Private', 'Shared'];
export const furnishData = ['Furnished', 'Semi-Furnshed', 'Unfurnished'];
export const studentData = ['Students', 'Unemployed', 'Smokers', 'Pet owner'];
export const billData = [
  'Electricity',
  'Gas',
  'TV Licence',
  'Council Tax',
  'WiFi',
  'Cleaning',
  'None of the above',
];
export const termsData = ['Rolling monthly contract', 'Fixed term'];
export const tenancy = ['New tenancy', 'Existing tenancy'];

export const SettingsData = [
  {
    id: 1,
    name: 'Account',
    textColor: 'black',
    imagePath: Images.USERSETTINGS,
    navigation: 'UserDetails',
  },
  {
    id: 2,
    name: 'Privacy Policy',
    textColor: 'black',
    imagePath: Images.PRIVACY,
    navigation: 'PrivacyPolicy',
  },
  {
    id: 3,
    name: 'Leave Feedback',
    textColor: 'black',
    imagePath: Images.FEEDBACK,
    navigation: 'Feedback',
  },
  {
    id: 4,
    name: 'Log out',
    textColor: '#FD9926',
    imagePath: Images.LOGOUT,
    navigation: 'login',
  },
];

export const Initials = ['Mr', 'Mrs', 'Miss', 'Ms'];

export const alertData = [
  {
    id: 1,
    title: 'Payment details require updating',
  },
  {
    id: 2,
    title: 'ID require verifaction',
  },
  {
    id: 3,
    title: 'Property maintenance job logged',
  },
  {
    id: 4,
    title: 'Viewing appointment requested',
  },
];


let index = 1;
export const properties = [
  { key: index++, label: 'Studio' },
  { key: index++, label: 'House' },
  { key: index++, label: 'Villa' },
];
export const bedroomsCount = [
  { key: index++, label: '1' },
  { key: index++, label: '2' },
  { key: index++, label: '3' },
  { key: index++, label: '4' },
  { key: index++, label: '5' },
  { key: index++, label: '6' },
  { key: index++, label: '7' },
  { key: index++, label: '8' },
  { key: index++, label: '9' },
  { key: index++, label: '10' },
  { key: index++, label: '11' },
  { key: index++, label: '12' },
  { key: index++, label: '13' },
  { key: index++, label: '14' },
  { key: index++, label: '15' },
  { key: index++, label: '16' },
  { key: index++, label: '17' },
  { key: index++, label: '18' },
  { key: index++, label: '19' },
  { key: index++, label: '20' },

];

export const EPCrating = [
  { key: index++, label: '92+ A' },
  { key: index++, label: '81-91 B' },
  { key: index++, label: '69-80 C' },
  { key: index++, label: '55-68 D' },
  { key: index++, label: '39-54 E' },
  { key: index++, label: '21-38 F' },
  { key: index++, label: '1-20 G' },
]

export const protectionScheme = [
  { key: index++, label: 'Deposit Protection Scheme' },
  { key: index++, label: 'MyDeposits' },
  { key: index++, label: 'Tenancy Deposit Scheme' },
];
