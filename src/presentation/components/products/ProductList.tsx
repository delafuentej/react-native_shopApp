/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, List } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product.entity';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[];
    // fetch nextPage
    fetchNextPage:() => void;
}

export const ProductList = ({products, fetchNextPage}:Props) => {
    const queryClient = useQueryClient();
    const [ isRefreshing, setIsRefreshing ] = useState(false);

    // onPullToRefresh =>to update the data
    const onPullToRefresh = async() => {
        setIsRefreshing(true);
        // sleep 2 seconds
        await new Promise(resolve => setTimeout(resolve, 200));
        //to invalidate cache :
        queryClient.invalidateQueries({queryKey: ['products','infinite']});
        setIsRefreshing(false);
    };
    return(
        <List
            data={products}
            numColumns={2}
            keyExtractor={(product, index) => `${product.id}-${index}`}
            renderItem= {({item:product})=> <ProductCard product={product} />}
            ListFooterComponent={()=><Layout style={{height:150}}/>}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.7}
            refreshControl={
                <RefreshControl 
                    refreshing={isRefreshing}
                    onRefresh={onPullToRefresh}
                />
            }
        />
    );
}