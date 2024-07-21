/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */

import { StackScreenProps } from '@react-navigation/stack';
import { MainLayout } from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getProductsById } from '../../../actions/products/get-product-by-id';
import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product.entity';
import { CustomIcon } from '../../components/ui/CustomIcon';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}

const sizes : Size[] = [Size.S, Size.M, Size.L, Size.Xs, Size.Xl, Size.Xxl];
const genders : Gender[] = [Gender.Unisex, Gender.Kid, Gender.Men, Gender.Women];

export const ProductScreen = ({navigation, route}: Props) => {
  //theme
  const theme = useTheme();

  // to obtain the productId:
  const {productId} = route.params;

  // to keep the productId as reference => to update and modify products on the same screen
  // const productIdRef = useRef(route.params.productId);

  const {isLoading, data:product} = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductsById(productId),
  });
  if(isLoading){
    return(<MainLayout title= 'Loading...' />)
  }
  return(
   <MainLayout
    title={product!.title}
    subTitle={`Price: ${product?.price}`}
   >
    <ScrollView style={{ flex: 1 }}>
      {/* images product */}
      <Layout>
        <FlatList
            data= {product?.images}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>(
              <FadeInImage
                  uri={item}
                  style={styles.productImages}
              />
            )}
        />
      </Layout>

      {/* form  : title, slug, description*/}
      <Layout style={{marginHorizontal: 10}}>
          <Input 
              label='Title'
              value={product?.title}
              style={styles.marginVertical}
          />
           <Input 
              label='Slug'
              value={product?.slug}
              style={styles.marginVertical}
          />
           <Input 
              label='Description'
              value={product?.description}
              multiline
              numberOfLines={5}
              style={styles.marginVertical}
          />
      </Layout>

              {/* form  : price, stock */}
      <Layout style={{marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10}}> 
        
        <Input
              label='Price'
              value={product?.price}
              style={{flex: 1}}
          />
          <Input 
              label='Stock'
              value={product?.stock}
              style={{flex: 1}}
          />
      </Layout>
      <Layout style={{height:150}}/>

      {/* selectors: sizes */}

      <ButtonGroup 
        size='small'
        appearance='outline'
        style={styles.selectorButtons}
      >
       {
        sizes.map( size => <Button 
                            key={size}
                            style={{
                              flex:1,
                              backgroundColor: true ? theme['color-primary-200'] : undefined,
                            }}
                            >{size}</Button>)
       }



      </ButtonGroup>
          {/* selectors: genders */}
      <ButtonGroup 
        size='small'
        appearance='outline'
        style={styles.selectorButtons}
      >
       {
        genders.map( gender => <Button 
                            key={gender}
                            style={{
                              flex:1,
                              backgroundColor: true ? theme['color-primary-200'] : undefined,
                            }}
                            >{gender.toUpperCase()}</Button>)
       }



      </ButtonGroup>

      {/* save button */}
      <Button
        onPress={()=>{}}
        accessoryLeft={<CustomIcon name='save-outline' white/>}

      >
        Save
      </Button>

      <Text>{JSON.stringify(product, null, 2)}</Text>



    </ScrollView>


   </MainLayout>
  );
};

const styles = StyleSheet.create({
  selectorButtons: {
    marginTop:20,
    marginHorizontal:15,
  },
    productImages: {
      width: 300,
      height: 300,
      marginHorizontal: 5,
    },
    marginVertical: {
      marginVertical:5,
    },

});