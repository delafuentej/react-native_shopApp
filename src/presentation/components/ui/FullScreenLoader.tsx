/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Layout, Spinner } from '@ui-kitten/components';
import { globalStyles } from '../../../config/theme/globalStyles';

export const FullScreenLoader = () => {
    return(
        <Layout style={globalStyles.centeredContainer}>
            <Spinner size='giant' />
        </Layout>
    );
}