/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { Button, Layout, Text} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';


export const HomeScreen = () => {

  const { logout } = useAuthStore();
 

  return(
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category = 'h1' >HOME</Text>
    
    <Button
      style= {styles.icon}
      onPress={logout}
      accessoryRight={<CustomIcon name='log-out-outline' white/>}
    >Log out</Button>
  </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});