/* eslint-disable prettier/prettier */
import { API_URL } from "../../config/api/shopApi";
import type { Product } from "../../domain/entities/product.entity";
import type { ProductsResponse } from "../interfaces/products.response";




export class ProductMapper {
    static productToEntity (product: ProductsResponse): Product{
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            slug: product.slug,
            stock: product.stock,
            sizes: product.sizes,
            gender: product.gender,
            tags: product.tags,
            images: product.images.map( image => `${API_URL}/files/product/${image}`),

        };
    }
}