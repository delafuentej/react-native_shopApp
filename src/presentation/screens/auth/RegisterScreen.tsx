/* eslint-disable jsx-quotes */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyles } from '../../../config/theme/globalStyles';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useWindowDimensions } from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {

}
export const RegisterScreen = ({navigation}: Props) => {
  const{ height, width } = useWindowDimensions();
  
  return (
    <Layout style={globalStyles.centeredContainer}>
      <ScrollView>
          <Layout style={{paddingTop: height * 0.25}}>
            <Text category='h1' style={{textAlign:'center'}}>Create an account</Text>
          </Layout>
          {/* inputs */}
          <Layout style={[globalStyles.centeredContainer,{marginTop: 30}]}>
            <Input 
                placeholder="Full Name"
                keyboardType='email-address'
                autoCapitalize='none'
                accessoryLeft={<CustomIcon name='person-outline' />}
                style={{marginBottom: 10, width: width * 0.7}}

              />
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
                  Create
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
              <Text style={{marginRight:5}}>Already have an account?</Text>
              <Text 
                status='primary'
                category='s1'
                onPress={()=>navigation.goBack()}
                >Log in</Text>

            </Layout>
          </Layout>

      </ScrollView>
    </Layout>
  );
};