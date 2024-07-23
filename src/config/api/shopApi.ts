/* eslint-disable prettier/prettier */
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { AsyncStorageAdapter } from '../adapters/async-storage';

export const API_URL = (STAGE === 'prod') ? PROD_URL :
    Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

    // console.log('android',API_URL_ANDROID);
    // console.log('ios',API_URL_IOS);
export const shopApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// console.log('API_URL',API_URL);
// Interceptors => to help read the storage of the physical device and attach the access token.
    shopApi.interceptors.request.use(
        async(config) =>{
        // to verify the storage:
        const token = await AsyncStorageAdapter.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
            return config;
        }
    );

