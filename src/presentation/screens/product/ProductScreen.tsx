/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */

import { StackScreenProps } from '@react-navigation/stack';
import { MainLayout } from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getProductsById } from '../../../actions/products/get-product-by-id';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

export const ProductScreen = ({navigation, route}: Props) => {
  // useQuery
  // useMutation
  // to obtain the productId:
  const {productId} = route.params;

  const {isLoading, data:product} = useQuery({
    queryKey: ['product', productId],
    staleTime: 1000 * 60 * 60, //update data: 1 h
    queryFn: () => getProductsById(productId),
  });
  if(!product){
    return(<MainLayout title='Loading...' />)
  }
  return(
   <MainLayout
    title={product.title}
    subTitle={`Price: ${product.price}`}
   >


   </MainLayout>
  );
};