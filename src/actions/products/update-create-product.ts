/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import {  isAxiosError } from "axios";
import { shopApi } from "../../config/api/shopApi";
import { Product } from "../../domain/entities/product.entity";

    


export const updateCreateProduct = (product: Partial<Product>)=> {
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);

    if(product.id){
        return updateProduct(product);
    }
};

const updateProduct = async(product: Partial<Product>) => {
    console.log('product', product);
    const {id, images = [], ...rest} = product;

    try{
        const checkedImgs = prepareImgs(images);
        console.log('checkedImgs', checkedImgs);
    
        const {data} = await shopApi.patch(`/products/${id}`, {
            images: checkedImgs,
            ...rest,
        });
        return data;

    }catch(error){
        if(isAxiosError(error)){
            console.log('Error Update Axios', error.response?.data);
        }
        console.log(error);
        throw new Error(`Cannot update product with id: ${id}`);
    }

   
};

const prepareImgs = (imgs: string[]) => {
    return imgs.map(
        img => img.split('/').pop()
    );
}