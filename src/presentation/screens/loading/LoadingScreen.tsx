/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export const LoadingScreen = () => {

  const{ top } = useSafeAreaInsets();
  const{ height } = useWindowDimensions();
  
  return (
    <Layout style={{flex: 1}}>
      <ScrollView>
          <Layout style={{paddingTop: height * 0.35}}>
            <Text category='h1'>Login</Text>
          </Layout>
          {/* inputs */}
          <Layout style={{marginTop: 20}}>
            <Input 
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              style={{marginBottom: 10}}

            />
            <Input 
              placeholder='Password'
              secureTextEntry
              autoCapitalize='none'
              style={{marginBottom: 10}}

            />
            {/* space */}
            <Layout style={{height: 20}} />

            {/* button */}
            <Layout>
                <Button
                  onPress={()=>{}}
                  
                >
                  Login
                </Button>
            </Layout>

            {/* space */}
              <Layout style={{height: 20}} />

            {/* info to create an account */}
            <Layout 
              style={{
                alignItems:'flex-end',
                flexDirection:'row',
                justifyContent:'center'
              }}
            >
              <Text>Don't have an account?</Text>
              <Text 
                status='primary' 
                category='s1'
                onPress={()=>{}}
                >Create an account</Text>

            </Layout>
          </Layout>

      </ScrollView>
    </Layout>
  );
};