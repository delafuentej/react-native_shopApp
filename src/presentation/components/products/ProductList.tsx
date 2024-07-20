/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, List } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product.entity";
import { ProductCard } from "./ProductCard";

interface Props {
    products: Product[];
    // fetch nextPage
    fetchNextPage:() => void;
}

export const ProductList = ({products, fetchNextPage}:Props) => {
    return(
        <List
            data={products}
            numColumns={2}
            keyExtractor={(product, index) => `${product.id}-${index}`}
            renderItem= {({item:product})=> <ProductCard product={product} />}
            ListFooterComponent={()=><Layout style={{height:150}}/>}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.7}
        />
    );
}