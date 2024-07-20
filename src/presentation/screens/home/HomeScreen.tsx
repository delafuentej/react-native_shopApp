/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */


import { useWindowDimensions } from 'react-native';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import {  useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from '@ui-kitten/components';


export const HomeScreen = () => {

  // const{  width } = useWindowDimensions();

  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products','infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour to update changes
    queryFn:() => getProductsByPage(0),
  });

  return(
    <MainLayout
      title='shopApi- Products'
      subTitle='Maintenance Application'
      rightAction={()=>{}}
      rightActionIcon='plus-outline'
    >
    {<Text>Welcome</Text>}


  </MainLayout>
  );
};

