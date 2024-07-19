/* eslint-disable prettier/prettier */
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';

export const API_URL = (STAGE === 'prod') ? PROD_URL :
    Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

    console.log('android',API_URL_ANDROID);
    console.log('ios',API_URL_IOS);
const shopApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
   
});
console.log('API_URL',API_URL);
// Interceptors => to help read the storage of the physical device and attach the access token.


export {
    shopApi,
}