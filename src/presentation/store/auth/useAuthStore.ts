/* eslint-disable prettier/prettier */
import { create } from 'zustand';
import { User } from '../../../domain/entities/user.entity';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authLogin } from '../../../actions/auth/auth';


export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;
    login: (email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set)=>({
    status: 'checking',
    user: undefined,
    token: undefined,

    login: async(email: string, password: string) => {
        const res = await authLogin(email, password);

        if(!res){
            set({status:'unauthenticated', user: undefined, token:undefined});
            return false;
        }
        //todo: save token & user in storage
        console.log('res',res);

        set({status:'authenticated', user: res.user, token:res.token});
        return true;
    },

}))