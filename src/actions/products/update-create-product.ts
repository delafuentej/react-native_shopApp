/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import {  isAxiosError } from "axios";
import { shopApi } from "../../config/api/shopApi";
import { Product } from "../../domain/entities/product.entity";

    


export const updateCreateProduct = (product: Partial<Product>)=> {
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);

    if(product.id && product.id !== 'new'){
        return updateProduct(product);
    }
    return  createProduct(product);
};
const prepareImgs = async(imgs: string[]) => {

    const fileImages = imgs.filter( img => img.includes('file://'));
    const currentImages = imgs.filter( img => !img.includes('file://'));

    if(fileImages.length > 0){
        const uploadPromises = fileImages.map( img => uploadImg(img));
        const uploadedImgs = await Promise.all(uploadPromises);
        currentImages.push(...uploadedImgs);
    }
    return currentImages.map(
        img => img.split('/').pop()
    );
};

const uploadImg = async(imgUri: string) =>{
    const formData = new FormData();
    formData.append('file', {
        uri: imgUri,
        type: 'image/jpeg',
        name: imgUri.split('/').pop(),
    });
    const {data} = await shopApi.post<{ imgUri : string}>('/files/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data.imgUri;
};

const updateProduct = async(product: Partial<Product>) => {
    console.log('product', product);
    const {id, images = [], ...rest} = product;

    try{
        const checkedImgs = await prepareImgs(images);
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

const createProduct = async(product : Partial<Product>)  =>{
   
    const {id, images = [], ...rest} = product;

    try{
        const checkedImgs = await prepareImgs(images);
        
        const {data} = await shopApi.post(`/products/`, {
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
}
