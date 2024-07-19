/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';


export const AuthProvider = ({children}: PropsWithChildren) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { checkStatus, status } = useAuthStore();

    useEffect(()=>{
        //call the checkstatus of storage when the component is mounted
        checkStatus();
    },[]);

    useEffect(()=> {
        if (status !== 'checking'){
            if(status === 'authenticated'){
                navigation.reset({
                    index:0,
                    routes: [{name: 'HomeScreen'}],
                });
            }else{
                navigation.reset({
                    index:0,
                    routes: [{name: 'LoginScreen'}],
                });
            }
        }

    },[status]);
    return(
        <>{children}</>
    );
}