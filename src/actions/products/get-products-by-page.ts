/* eslint-disable prettier/prettier */
import { shopApi } from "../../config/api/shopApi";
import { ProductsResponse } from "../../infrastructure/interfaces/products.response";
import { ProductMapper } from '../../infrastructure/mappers/product.mapper';



export const getProductsByPage = async( page: number, limit: number = 20) =>{
    console.log({'page':page, 'limit':limit});
    try{
        const { data } = await shopApi.get<ProductsResponse[]>(`/products?offset=${page * 10}&limit=${limit}`)
        // const products =  data.map( product => ProductMapper.productToEntity(product));
        const products =  data.map( ProductMapper.productToEntity);
        console.log('products', products);
        return products;
    }catch(error){
        console.log('error getting products', error);
        throw new Error('Error getting products');
    }
}