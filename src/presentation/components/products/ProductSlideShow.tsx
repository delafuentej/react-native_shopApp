/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import { FlatList, Image, StyleSheet } from "react-native"
import { FadeInImage } from "../ui/FadeInImage"


interface Props {
    images: string[],
}

export const ProductSlideShow = ({images}:Props) => {
    return(
        <>
            {

                (images.length === 0) ? 
                <Image 
                    source={require('../../../assets/no-product-image.png')} 
                    style={{height: 300, width: 300}}
                    />
                    : (
                    <FlatList 
                    data={images}
                    // data={product.images}
                    horizontal
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={ ({item}) => (
                        <FadeInImage 
                        style={styles.imgContainer}
                        uri={item}
                        />
                    )}
                    />
                    )
}
        </>
    );

};

const styles = StyleSheet.create({
        imgContainer: {
            width: 300,
            height: 300,
            marginHorizontal: 7,
          },
})