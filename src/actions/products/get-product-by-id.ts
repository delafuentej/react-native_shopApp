/* eslint-disable prettier/prettier */
import { shopApi } from "../../config/api/shopApi";
import { Product } from "../../domain/entities/product.entity";
import { ProductsResponse } from "../../infrastructure/interfaces/products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";



export const getProductsById = async( id: string): Promise<Product> => {
    
    try{
        const { data } = await shopApi.get<ProductsResponse>(`/products/${id}`)
        // const products =  data.map( product => ProductMapper.productToEntity(product));
        const product =  ProductMapper.productToEntity(data);
        // console.log('products', products);
        return product;
    }catch(error){
        console.log('error getting products', error);
        throw new Error(`Error getting product by  Id:${id}`);
    }
}