
//
// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from "./components/coordinator/AuthCoordinator";
import Stack2 from "./components/coordinator/Stack2";

type RootStackParamList = {
    Auth: undefined;
    Stack2: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Stack2" component={Stack2} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

