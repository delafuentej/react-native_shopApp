/* eslint-disable prettier/prettier */
import { create } from 'zustand';
import { User } from '../../../domain/entities/user.entity';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authCheckStatus, authLogin, authRegister } from '../../../actions/auth/auth';
import { AsyncStorageAdapter } from '../../../config/adapters/async-storage';


export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get)=>({
    status: 'checking',
    user: undefined,
    token: undefined,

    login: async(email: string, password: string) => {
        const res = await authLogin(email, password);

        if(!res){
            set({status:'unauthenticated', user: undefined, token:undefined});
            return false;
        }
        // save token & user in storage: with @react-native-async-storage
        await AsyncStorageAdapter.setItem('token', res.token);
        // const storedToken = await AsyncStorageAdapter.getItem('token');
        // console.log('storedToken', storedToken);

        set({status:'authenticated', user: res.user, token:res.token});
        return true;
    },
    checkStatus: async()=> {
        const res = await authCheckStatus();
        if(!res){
            set({status:'unauthenticated', user: undefined, token:undefined});
            return;
        }
        await AsyncStorageAdapter.setItem('token', res.token);
        //update by new token when res exists.
        set({status:'authenticated', user: res.user, token:res.token});
    },
    logout: async()=> {
        await AsyncStorageAdapter.removeItem('token');
        set({status: 'unauthenticated', user: undefined, token: undefined});
    },
    register: async(email:string, password:string, fullName:string) => {
        const res = await authRegister(email, password, fullName);

        if(!res){
            set({status:'unauthenticated', user: undefined, token:undefined});
            return false;
        }
         // save token & user in storage: with @react-native-async-storage
         await AsyncStorageAdapter.setItem('token', res.token);
         // const storedToken = await AsyncStorageAdapter.getItem('token');
         // console.log('storedToken', storedToken);
         set({status:'unauthenticated', user: res.user, token:res.token});
         return true;

    },

}))