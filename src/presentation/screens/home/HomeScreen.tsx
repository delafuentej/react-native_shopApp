/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */


// import { useWindowDimensions } from 'react-native';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import {  useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { Text } from '@ui-kitten/components';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';


export const HomeScreen = () => {

  // const{  width } = useWindowDimensions();

  // const {isLoading, data: products = []} = useQuery({
  //   queryKey: ['products','infinite'],
  //   staleTime: 1000 * 60 * 60, // 1 hour to update changes
  //   queryFn:() => getProductsByPage(0),
  // });
  //USEINFINITEQUERY => INFINITESCROLL OF PRODUCTS
  const {isLoading, data} = useInfiniteQuery({
    queryKey: ['products','infinite'],
    staleTime: 1000 * 60 * 60, // 1 hour to update changes
    initialPageParam: 0,
    queryFn: async(params) => {
      console.log({'params':params});
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return(
    <MainLayout
      title='shopApi- Products'
      subTitle='Maintenance Application'
      rightAction={()=>{}}
      rightActionIcon='plus-outline'
    >
      {isLoading ? (<FullScreenLoader/>) : (
       <ProductList products={data?.pages.flat() ?? []}/>
      )}
    

  </MainLayout>
  );
};

