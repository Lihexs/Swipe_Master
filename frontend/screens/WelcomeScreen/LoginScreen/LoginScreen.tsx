import React, { useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradientBackground from '../../../views/Colors/BackgroundColorComponent';
import styles from './LoginScreenView';
import User from '../../../models/User/User';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthInput from "../../../views/TextInput/AuthInput";
import AuthButton from "../../../views/Buttons/AuthButton";
import UserData from "../../../models/User/UserData";

type LoginScreenProps = {
    navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = () => {
        const user: User = { username, password };

        // TODO: Convert user => userData  userToUserData()

        //TEST
        const userData: UserData = {
            user_id: 'user123',
            current_level_index: 3,
            levels_highscores: [1, 2, 2], // Example scores for each level
            total_score: 4000,
            current_hp: 75,
        };


        navigation.navigate('MainNav', { screen: 'Main', params: { userData } });
    };

    return (
        <LinearGradientBackground>
            <SafeAreaView>
                <Ionicons name="md-arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
            </SafeAreaView>

            <View style={styles.container}>

                <AuthInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    accessible={true}
                />
                <AuthInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    accessible={true}
                />
                <View style={{ marginTop: 30 }}>
                <AuthButton
                    text="Login"
                    textColor="#0039C0"
                    backgroundColor="#fff"
                    textSize={18}
                    onPress={handleLogin}
                />
                </View>
            </View>
        </LinearGradientBackground>
    );
};

export default LoginScreen;
