/* eslint-disable eol-last */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import '../gesture-handler';
// import 'react-native-gesture-handler';

import { NavigationContainer} from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const App = () => {
  return(
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};