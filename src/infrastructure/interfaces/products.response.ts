/* eslint-disable prettier/prettier */
export interface ProductsResponse {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        string[];
    images:      string[];
    user:        ShopUser;
}

export enum Gender {
    Kid = 'kid',
    Men = 'men',
    Unisex = 'unisex',
    Women = 'women',
}

export enum Size {
    L = 'L',
    M = 'M',
    S = 'S',
    Xl = 'XL',
    Xs = 'XS',
    Xxl = 'XXL',
}



export interface ShopUser {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}

