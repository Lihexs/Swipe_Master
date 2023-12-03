// Stack2.tsx
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "../../screens/MainScreen/MainScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import LeaderboardScreen from "../../screens/Leaderboard/LeaderboardScreen";

type Stack2ParamList = {
    Main: undefined;
    Profile: undefined;
    Leaderboard: undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<Stack2ParamList>();

const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => {
                    // Implement your logout logic here
                    // Navigate to the AuthCoordinator after logout
                    props.navigation.navigate('Auth');
                }}
            />
        </DrawerContentScrollView>
    );
};

const MainNav: React.FC = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Main"
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Main" component={MainScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} />

        </Drawer.Navigator>
    );
};

export default MainNav;
