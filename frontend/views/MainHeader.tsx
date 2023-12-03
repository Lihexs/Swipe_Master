// HeaderWithIcons.tsx
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import MenuSVG from "./imgSVG/MenuSVG";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {SafeAreaView} from "react-native-safe-area-context";
import {DrawerActions} from "@react-navigation/native"; // Import your hamburger menu SVG

interface HeaderWithIconsProps {
    navigation: DrawerNavigationProp<any>;
}

const MainHeader: React.FC<HeaderWithIconsProps> = ({navigation}) => {

    const handleLeftPress = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const handleRightPress = () => {
        navigation.navigate('Main');
    };

    return (

        <View style={styles.headerContainer}>

            <TouchableOpacity onPress={handleLeftPress} style={styles.rightIcon}>
                <SvgXml
                    xml={MenuSVG}
                    width={40}
                    height={38}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRightPress} style={styles.leftIcon}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={{ width: 114, height: 38, resizeMode: 'contain' }}
                />
            </TouchableOpacity>


        </View>

    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop:8
    },
    leftIcon: {
        marginLeft: 10,
    },
    rightIcon: {
        marginRight: 10,
    },
});

export default MainHeader;
