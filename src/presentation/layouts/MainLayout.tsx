/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomIcon } from "../components/ui/CustomIcon";
import { ScrollView } from "react-native-gesture-handler";


interface Props {
    title: string;
    subTitle?: string;
    rightAction?: () => void;
    rightActionIcon?: () => string;
    children?: React.ReactNode;
}
export const MainLayout = ({title, subTitle, rightAction, rightActionIcon, children}: Props) => {

    const {top} = useSafeAreaInsets();
    const {goBack, canGoBack} = useNavigation();

    const renderBackAction = () => {
        <TopNavigationAction
            icon={<CustomIcon name="arrow-back-outline"/>}
            onPress={goBack}
        />;
    };
    const RenderRightAction = () => {
        if(rightAction === undefined || rightActionIcon === undefined){
            return null;
        }
        return(
            <TopNavigationAction 
                onPress={rightAction}
                icon={<CustomIcon name={rightActionIcon} />}
            />
        );
    };

    return(
        <Layout style={{paddingTop: top}}>
            <TopNavigation
                title={title}
                subtitle={subTitle}
                accessoryLeft={ (canGoBack()) ? renderBackAction : undefined }
                accessoryRight={ () => <RenderRightAction/>}
                alignment='center'
                // accessoryLeft={renderBackAction}
            />
            <Divider />
           <ScrollView>
                {children}
            </ScrollView>
        </Layout>
    );
}