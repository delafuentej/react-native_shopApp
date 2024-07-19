/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../config/theme/globalStyles";


export const LoginScreen = () => {
  const{ height, width } = useWindowDimensions();
  
  return (
    <Layout style={globalStyles.centeredContainer}>
      <ScrollView>
          <Layout style={{paddingTop: height * 0.35}}>
            <Text category='h1' style={{textAlign:'center'}}>Login</Text>
          </Layout>
          {/* inputs */}
          <Layout style={{marginTop: 30}}>
            <Input 
              placeholder="Email"
              keyboardType='email-address'
              autoCapitalize='none'
              style={{marginBottom: 10, width: width * 0.7}}

            />
            <Input 
              placeholder='Password'
              secureTextEntry
              autoCapitalize='none'
              style={{marginBottom: 10, width: width * 0.7}}

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
              <Text style={{marginRight:5}}>Don't have an account?</Text>
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