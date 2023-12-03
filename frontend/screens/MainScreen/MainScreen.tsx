import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import UserData from '../../models/User/UserData';
import { convertUserDataToLevelsData } from '../../models/User/LevelData';
import Levels from '../../components/Levels/Levels';
import MainScreenView from './MainScreenView';
import LinearGradientBackground from '../../views/Colors/BackgroundColorComponent';
import { FontAwesome } from '@expo/vector-icons';
import {DrawerNavigationProp} from "@react-navigation/drawer";
import MainHeader from "../../views/MainHeader"; // Import FontAwesome from Expo

type MainScreenProps = {
    navigation: DrawerNavigationProp<any>;
    route: RouteProp<{ params: { userData: UserData } }>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation, route }) => {
    const { userData } = route.params;
    const levelsData = convertUserDataToLevelsData(userData); // Convert UserData to LevelsData

    useEffect(() => {
        console.log('User Data in MainScreen:', userData);

    }, [userData]);

    const openDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <LinearGradientBackground>

            <SafeAreaView style={MainScreenView.container}>
                <MainHeader navigation={navigation}/>


                {/*<View style={MainScreenView.header}>*/}

                {/*    <View style={MainScreenView.headerItem}>*/}
                {/*        <FontAwesome name="heart" size={24} color="red" />*/}
                {/*        <Text style={MainScreenView.headerText}>{userData.current_hp}</Text>*/}
                {/*    </View>*/}
                {/*    <View style={MainScreenView.headerItem}>*/}
                {/*        <FontAwesome name="star" size={24} color="gold" />*/}
                {/*        <Text style={MainScreenView.headerText}>{userData.total_score}</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}

                <Levels navigation={navigation} levelsData={levelsData}  />

                {/* Footer */}
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
