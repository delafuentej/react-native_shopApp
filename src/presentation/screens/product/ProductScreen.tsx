/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */

import { getProductsById } from '../../../actions/products/get-product-by-id';
import { MainLayout } from '../../layouts/MainLayout';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, StyleSheet } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product.entity';
import { CustomIcon } from '../../components/ui/CustomIcon';


const sizes: Size[] = [Size.S, Size.M, Size.L, Size.Xs, Size.Xl, Size.Xxl];
const genders : Gender[] = [Gender.Unisex, Gender.Kid, Gender.Men, Gender.Women]



 interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}



export const ProductScreen = ({route}:Props) => {

  const theme = useTheme();
  const productIdRef = useRef(route.params.productId);
  console.log('productIdRef', productIdRef);

  // if(!route || !route.params || !productIdRef){
  //   console.log('route', route);
  //   console.log('route.params', route.params);
  //   return <MainLayout title='Invalid Product Id' />;
  // }

  
  // to obtain the productId:
   //const {productId} = route.params;
  // to keep the productId as reference => to update and modify products on the same screen
   //const productIdRef = useRef(route.params.productId);

   const { isLoading, data:product} = useQuery({
     queryKey: ['product', productIdRef.current],
     queryFn: () => getProductsById(productIdRef.current),
   });
   if(isLoading){
     return(<MainLayout title= 'Loading...' />);
   }
   if(!product){
    return(<MainLayout title={`Product not found by Id: ${productIdRef.current}`}/>);
   }
  return(
    <MainLayout 
      title={product?.title}
      subTitle={`Price: $: ${product?.price}`}
    >
    <ScrollView style={{flex: 1}} >
    
    <Layout>
   
      {/* product images */}
       <Layout>
        <FlatList 
          data={product.images}
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
      </Layout> 
      {/* form: title, slug, and description*/}

      <Layout style={styles.space}>
        <Input
          label='Title'
          value={product.title}
          style={{marginVertical: 5}}
        />
        <Input
          label='Slug'
          value={product.slug}
          style={{marginVertical: 5}}
        />
        <Input
          label='Description'
          value={product.description}
          multiline
          numberOfLines={5}
          style={{marginVertical: 5}}
        />
      </Layout>

        {/* form: price & stock */}
      <Layout style={[styles.space, {flexDirection:'row', gap: 10}]}>

      <Input
          label='Price'
          value={product.price.toString()}
          style={{flex: 1}}
        />
        <Input
          label='Stock'
          value={product.stock.toString()}
          style={{flex: 1}}
        />
      </Layout>

      {/* Selectors: sizes & genders */}
      <ButtonGroup 
        size='small'
        appearance='outline'
        style={[styles.space, styles.selectorsContainer]}>
        {sizes.map( (size) =>
           <Button 
            style={{ 
              flex: 1, 
              backgroundColor: true ? theme['color-primary-200'] : undefined,
            }}
            key={size}>{size}</Button>)
        
        }


      </ButtonGroup>

      <ButtonGroup 
        size='small'
        appearance='outline'
        style={[styles.space, styles.selectorsContainer]}>
        {genders.map( (gender) =>
           <Button 
            style={{ 
              flex: 1, 
              backgroundColor: true ? theme['color-primary-200'] : undefined,
            }}
            key={gender}>{gender}</Button>)
        
        }


      </ButtonGroup>

      {/* save button */}
      <Button
        style={{margin: 15}}
        accessoryLeft={<CustomIcon name='save-outline' white />}
        onPress={()=>{}}
      >
          Save
      </Button>

    </Layout>
      

    </ScrollView>
    </MainLayout>

    );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: 300,
    height: 300,
    marginHorizontal: 7,
  },
  selectorsContainer: {
    margin:2, 
    marginTop: 20,
  },
  space: {
    marginHorizontal:15,
  }
});
