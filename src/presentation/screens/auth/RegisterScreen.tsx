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
import { Alert, useWindowDimensions } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useState } from 'react';


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {

}
export const RegisterScreen = ({navigation}: Props) => {
  //authStore consumption
  const { register } = useAuthStore();

  const[isPosting, setIsPosting] = useState(false);

  const[ form , setForm ] = useState({
        email:'',
        password:'',
        fullName: '',
  });
  const{ height, width } = useWindowDimensions();

  const onRegister = async() => {
    if(form.email.length === 0 || form.password.length === 0){
      return;
    }
    setIsPosting(true);
    const success = await register(form.email,form.password,form.fullName);
    setIsPosting(false);
    if(success) return;
    //   { 
    //    Alert.alert('Account created', 'Your account was successfully created');
    //    navigation.goBack();
    // }

      Alert.alert('Error', 'Account could not be created');


  };

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
                value={form.fullName}
                onChangeText={(fullName) => setForm({...form, fullName})}
              />
            <Input 
              placeholder="Email"
              keyboardType='email-address'
              autoCapitalize='none'
              accessoryLeft={<CustomIcon name='email-outline' />}
              style={{marginBottom: 10, width: width * 0.7}}
              value={form.email}
              onChangeText={(email) => setForm({...form, email})}
            />
            <Input 
              placeholder='Password'
              secureTextEntry
              autoCapitalize='none'
              accessoryLeft={<CustomIcon name='lock-outline' />}
              style={{marginBottom: 10, width: width * 0.7}}
              value={form.password}
              onChangeText={(password) => setForm({...form, password})}
            />

            {/* button */}
            <Layout style={[globalStyles.centeredContainer,{marginTop: 30}]}>
                <Button
                  disabled={isPosting}
                  onPress={onRegister}
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