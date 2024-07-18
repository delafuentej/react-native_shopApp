/* eslint-disable eol-last */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { Button, Layout, Text, Icon, IconElement} from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


export const HomeScreen = () => {

  const HomeIcon = (props:any) : IconElement =>(
    <Icon
      style={styles.icon}
      {...props}
      name='home-outline'
      />
  );

  return(
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category = 'h1' >HOME</Text>
    {/* <Icon name='home-outline'/> */}
    <Button
      accessoryLeft={<HomeIcon/>}
    >Close Session</Button>
  </Layout>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});