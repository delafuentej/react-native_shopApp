/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, List, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product.entity";
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];

    // fetch nextPage
}

export const ProductList = ({products}:Props) => {
    return(
        <List
            data={products}
            numColumns={2}
            keyExtractor={(product, index) => `${product.id}-${index}`}
            renderItem= {({item:product})=> (
                <ProductCard product={product}>{product.title}</ProductCard>
            )}
            ListFooterComponent={()=><Layout style={{height:150}}/>}
        />
    );
}