/* eslint-disable prettier/prettier */
import { shopApi } from "../../config/api/shopApi";
import { Gender, Product } from "../../domain/entities/product.entity";
import { ProductsResponse, Size } from '../../infrastructure/interfaces/products.response';
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";





const emptyProduct: Product = {
    id:'',
    title:'New Product',
    description:'',
    price: 0,
    images: [],
    slug:'',
    gender: Gender.Unisex,
    sizes:[],
    stock:0,
    tags: [],
};



export const getProductsById = async( id: string): Promise<Product> => {
    if (id === 'new') return emptyProduct;


    try{
        const { data } = await shopApi.get<ProductsResponse>(`/products/${id}`);
        console.log('data-getProductById', data);
        // const products =  data.map( product => ProductMapper.productToEntity(product));
        // const product =  ProductMapper.productToEntity(data);
        // console.log('products', products);
        // return product;
        return ProductMapper.productToEntity(data);
    }catch(error){
        console.log('error getting products', error);
        throw new Error(`Error getting product by  Id:${id}`);
    }
}