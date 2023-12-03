
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from "./components/coordinator/AuthCoordinator";
import MainNav from "./components/coordinator/MainNav";

type RootStackParamList = {
    Auth: undefined;
    MainNav: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="MainNav" component={MainNav} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

