/* eslint-disable prettier/prettier */
// authenticity actions: login, register => http request to have access to the backend

import { shopApi } from "../../config/api/shopApi";
import { User } from "../../domain/entities/user.entity";
import type { AuthResponses } from "../../infrastructure/interfaces/auth.responses";


// login

const returnUserToken = (data : AuthResponses) => {
    // response mapping
    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles,
    };
        return{
            user: user,
            token: data.token,
        };
};



export const authLogin = async(email: string, password: string) => {
    email = email.toLowerCase();
    try{
        const {data} = await shopApi.post<AuthResponses>('/auth/login',{
            email,
            password,
        });
        return returnUserToken(data);
    }catch(error){
        console.log('EError', error);
        return null;
    }
};

export const authCheckStatus = async () => {
    try{
        const {data} = await shopApi.get<AuthResponses>('/auth/check-status');
        return returnUserToken(data);
    }catch(error){
        console.log(error);
        return null;
    }
}

