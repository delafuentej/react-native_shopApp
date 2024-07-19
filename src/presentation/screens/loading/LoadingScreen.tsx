/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { Layout, Spinner} from '@ui-kitten/components';
import { globalStyles } from '../../../config/theme/globalStyles';



export const LoadingScreen = () => {
  return (
    <Layout style={globalStyles.centeredContainer}>
      <Spinner status='primary' size='extra-large'/>
    </Layout>
  );
};