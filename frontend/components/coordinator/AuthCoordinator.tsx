// AuthCoordinator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "../../screens/WelcomeScreen/WelcomeScreen";
import LoginScreen from "../../screens/WelcomeScreen/LoginScreen/LoginScreen";
import RegisterScreen from "../../screens/WelcomeScreen/RegisterScreen/RegisterScreen";

type Stack1ParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
};

const Stack = createStackNavigator<Stack1ParamList>();

const AuthCoordinator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthCoordinator;

