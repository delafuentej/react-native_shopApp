/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
// import '../gesture-handler';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import {  ApplicationProvider } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
export const App = () => {
  const colorScheme = useColorScheme();
  const theme = (colorScheme === 'dark') ? eva.dark : eva.light;

  return(
    <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
    </ApplicationProvider>
  );
};