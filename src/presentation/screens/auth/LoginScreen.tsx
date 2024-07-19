/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */

import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../../config/theme/globalStyles";
import { CustomIcon } from "../../components/ui/CustomIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { API_URL, STAGE } from "@env";


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {

}

export const LoginScreen = ({navigation}:Props) => {
  const{ height, width } = useWindowDimensions();
  console.log({apiUrl: API_URL, stage: STAGE});
  
  return (
    <Layout style={globalStyles.centeredContainer}>
      <ScrollView>
          <Layout style={{paddingTop: height * 0.35}}>
            <Text category='h1' style={{textAlign:'center'}}>Login</Text>
          </Layout>
          {/* inputs */}
          <Layout style={[globalStyles.centeredContainer,{marginTop: 30}]}>
            <Input 
              placeholder="Email"
              keyboardType='email-address'
              autoCapitalize='none'
              accessoryLeft={<CustomIcon name='email-outline' />}
              style={{marginBottom: 10, width: width * 0.7}}

            />
            <Input 
              placeholder='Password'
              secureTextEntry
              autoCapitalize='none'
              accessoryLeft={<CustomIcon name='lock-outline' />}
              style={{marginBottom: 10, width: width * 0.7}}
            />

            {/* button */}
            <Layout style={[globalStyles.centeredContainer,{marginTop: 30}]}>
                <Button
                  onPress={()=>{}}
                  accessoryRight={<CustomIcon name='arrow-forward-outline' white/>}
                  style={{width: width * 0.7}}
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
                justifyContent:'center',
              }}
            >
              <Text style={{marginRight:5}}>Don't have an account?</Text>
              <Text 
                status='primary'
                category='s1'
                onPress={()=>navigation.navigate('RegisterScreen')}
                >Create an account</Text>

            </Layout>
          </Layout>

      </ScrollView>
    </Layout>
  );
};