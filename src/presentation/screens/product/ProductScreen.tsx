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
import {  useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Image, StyleSheet } from 'react-native';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Product, Size } from '../../../domain/entities/product.entity';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { Formik } from 'formik';
import { updateCreateProduct } from '../../../actions/products/update-create-product';


const sizes: Size[] = [Size.S, Size.M, Size.L, Size.Xs, Size.Xl, Size.Xxl];
const genders : Gender[] = [Gender.Unisex, Gender.Kid, Gender.Men, Gender.Women]



 interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'>{}



export const ProductScreen = ({route}:Props) => {

  const theme = useTheme();
  const productIdRef = useRef(route.params.productId);
  const queryClient = useQueryClient();
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

   const { isLoading, data:product, error} = useQuery({
     queryKey: ['product', productIdRef.current],
     queryFn: () => getProductsById(productIdRef.current),
   });

   //useMutation
   const mutation = useMutation({
      mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
      onSuccess(data: Product) {
        productIdRef.current = data.id;// for creation
        //when invalidating the queries the request for data update is redone.
        queryClient.invalidateQueries({queryKey:['products', 'infinite']});
        queryClient.invalidateQueries({queryKey:['product', data.id]});
        console.log('Success');
        console.log({'data': data});
        
      },
   });

  //  useEffect(()=>{
  //   console.log(error);
  //  },[error]);

   if(isLoading){
     return(<MainLayout title= 'Loading...' />);
   }
   if(!product){
    return(<MainLayout title={`Product not found by Id: ${productIdRef.current}`}/>);
   }


  return(
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}
    >
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
     
          <MainLayout 
          // title={product?.title}
          // subTitle={`Price: $: ${product?.price}`}
          title={values.title}
          subTitle={`Price: $: ${values.price}`}
        >

        <ScrollView style={{flex: 1}} >
        
        <Layout style={styles.centeredImg}>
       
          {/* product images */}
          {

            (values.images.length === 0) ? 
              <Image 
                source={require('../../../assets/no-product-image.png')} 
                style={{height: 300, width: 300}}
                />
                : (
                  <FlatList 
                  data={values.images}
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
           
          </Layout> 
          {/* form: title, slug, and description*/}
    
          <Layout style={styles.space}>
            <Input
              label='Title'
              // value={product.title}
              style={{marginVertical: 5}}
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <Input
              label='Slug'
              // value={product.slug}
              style={{marginVertical: 5}}
              value={values.slug}
              onChangeText={handleChange('slug')}
            />
            <Input
              label='Description'
              // value={product.description}
              multiline
              numberOfLines={5}
              style={{marginVertical: 5}}
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </Layout>
    
            {/* form: price & stock */}
          <Layout style={[styles.space, {flexDirection:'row', gap: 10}]}>
    
          <Input
              label='Price'
              // value={product.price.toString()}
              style={{flex: 1}}
              value={values.price.toString()}
              onChangeText={handleChange('price')}
              keyboardType='numeric'
            />
            <Input
              label='Stock'
              // value={product.stock.toString()}
              style={{flex: 1}}
              value={values.stock.toString()}
              onChangeText={handleChange('stock')}
              keyboardType='numeric'
            />
          </Layout>
    
          {/* Selectors: sizes & genders */}
          <ButtonGroup 
            size='small'
            appearance='outline'
            style={[styles.space, styles.selectorsContainer]}>
            {sizes.map( (size) =>
               <Button 
                onPress = { ()=> setFieldValue(
                  'sizes', 
                  values.sizes.includes(size) ? values.sizes.filter( s => s !== size) :
                  [...values.sizes, size]
                ) 
                }
                style={{ 
                  flex: 1, 
                  backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined,
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
                onPress={()=> setFieldValue('gender', gender)}
                style={{ 
                  flex: 1, 
                  backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined,
                }}
                key={gender}>{gender}</Button>)
            
            }
    
    
          </ButtonGroup>
    
          {/* save button */}
          <Button
            style={{margin: 15}}
            accessoryLeft={<CustomIcon name='save-outline' white />}
            disabled={mutation.isPending}
            onPress={() => handleSubmit()}
          >
              Save
          </Button>
          <Text>{JSON.stringify(values, null, 2)}</Text>
    
   
          
    
        </ScrollView>
        </MainLayout>
        )
      }
   
    </Formik>
    );
};

const styles = StyleSheet.create({
  centeredImg: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
});
