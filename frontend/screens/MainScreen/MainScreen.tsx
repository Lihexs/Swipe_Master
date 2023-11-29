import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Levels from '../../components/Levels/Levels';
import MainScreenView from './MainScreenView';
import LinearGradientBackground from '../../assets/Colors/BackgroundColorComponent';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import UserData from "../../models/UserData";

type MainScreenProps = {
    navigation: NavigationProp<any>;
    route: RouteProp<{ params: { userData: UserData } }>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
    const userData = route.params?.userData;

    useEffect(() => {
        console.log('User Data in MainScreen:', userData);
    }, [userData]);

    return (
        <LinearGradientBackground>
            <SafeAreaView style={MainScreenView.container}>
                <Levels navigation={navigation} userData={userData} />
                <View style={MainScreenView.footer}>
                    <Text style={MainScreenView.footerText}>
                        Please click on the next level you want to play. You can only open a level if you have already passed the previous one.
                    </Text>
                </View>
            </SafeAreaView>
        </LinearGradientBackground>
    );
};

export default MainScreen;
