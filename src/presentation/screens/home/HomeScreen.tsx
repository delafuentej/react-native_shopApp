/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { Button, Layout, Text} from '@ui-kitten/components';
import { useWindowDimensions } from 'react-native';
import { CustomIcon } from '../../components/ui/CustomIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsByPage } from '../../../actions/products/get-products-by-page';


export const HomeScreen = () => {

  const{  width } = useWindowDimensions();

  getProductsByPage(2);

  const { logout } = useAuthStore();
 

  return(
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category = 'h1' >HOME</Text>
    
    <Button
      style= {{width: width * 0.5}}
      onPress={logout}
      accessoryRight={<CustomIcon name='log-out-outline' white/>}
    >Log out</Button>
  </Layout>
  );
};

