/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Card, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product.entity";
import { Image, StyleSheet } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";

interface Props {
    product: Product;
}

export const ProductCard = ({ product } : Props) => {
    return(
        <Card 
            style={styles.cardContainer}
        >
            {
            (product.images.length === 0) ? 
            (<Image
                source={require('../../../assets/no-product-image.png')}
                style={styles.img}
            />) :
            (<FadeInImage
                uri={product.images[0]}
                style={[styles.img, { flex: 1} ]}
            />
            )
            }
            <Text style={styles.cardTitle} numberOfLines={2}>{product.title}</Text>


        </Card>
    );
}

const styles= StyleSheet.create({
    cardContainer: {
        flex:1,
        backgroundColor:'#f9f9f9',
        margin:3,
    },
    img: {
        width: '100%',
        height:200,
    },
    cardTitle: {
        textAlign:'center'
    }
})