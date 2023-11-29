// Stack2.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from "../../screens/MainScreen/MainScreen";
import TriviaScreen from "../../screens/TriviaScreen/TriviaScreen";

type Stack2ParamList = {
    Main: undefined ;
    Trivia: undefined;
};

const Stack = createStackNavigator<Stack2ParamList>();

const Stack2: React.FC = () => {

    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Trivia" component={TriviaScreen} />
        </Stack.Navigator>
    );
};

export default Stack2;
