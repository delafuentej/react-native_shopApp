/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Button } from '@ui-kitten/components';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CustomIcon } from './CustomIcon';


interface Props {
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
    iconName: string;
}

export const FAB = ({style, iconName, onPress}:Props) => {
    return(
        <Button 
            style={[style, styles.fabButton]}
            accessoryLeft={<CustomIcon name={iconName} white/>}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    fabButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 3,
        borderRadius:13,
    },

})