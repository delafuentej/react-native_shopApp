/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { Layout, Text} from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import {  useQuery } from '@tanstack/react-query';


export const HomeScreen = () => {

  const{  width } = useWindowDimensions();

  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products','infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour to update changes
    queryFn:() => getProductsByPage(0),
  });

  const { logout } = useAuthStore();
 

  return(
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>{JSON.stringify(products, null, 2)}</Text>
    
  </Layout>
  );
};

