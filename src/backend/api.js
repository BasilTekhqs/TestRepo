import axios from 'axios';

export const API = {
  BASE_URL: 'https://sucasa.pnrhost.com/api/v1/',
  INVITES_BASE_URL:
    'https://europe-west2-sucasa-6c3e7.cloudfunctions.net/invites/',
  PAYMENTS_BASE_URL:
    'https://europe-west2-sucasa-6c3e7.cloudfunctions.net/payments/',
  INVITES_DEBUG_URL: 'http://localhost:5001/sucasa-6c3e7/europe-west2/invites/',
  PAYMENT_DEBUG_URL:
    'http://localhost:5000/sucasa-6c3e7/europe-west2/payments/',
  AUTH_GOOGLE: 'auth/firebase',
  AUTH_FACEBOOK: 'auth/firebase',
  GeocodingUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
  PostalUrl:
    'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:',
  API_KEY: 'AIzaSyBmzTGh5pQiwmMqmUuy7H4AcGH5xEF8J8I',
  STRIPE_PUBLISHABLE_KEY:
    'pk_live_51IIWqcD6ZVv12InTwkiwQC4xL2tQnkw4aEkZdsnmk68OMn3axsM6qq5T1xn0FqYupPoSYCjOk4PJFphnfjCYfka600lyD61nL0',
};

export function createInvite(data) {
  return axios.post(API.INVITES_DEBUG_URL + 'create', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}
export const makeStripePayment = async saleData => {
  const response = await axios.post(
    `${API.PAYMENT_DEBUG_URL}stripe-payment`,
    saleData,
  );
  return response.data;
};

export async function fetchPublishableKey() {
  const response = await axios.get(`${API.PAYMENT_DEBUG_URL}fetch-key`);
  return response.data;
}
