import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradientBackground from '../../../assets/Colors/BackgroundColorComponent';
import styles from './LoginScreenView';
import User from '../../../models/User';

type LoginScreenProps = {
    navigation: NavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const user: User = {  username,password };
        // if (!username.trim() || !password.trim()) {
        //     return;
        // }


        // TODO: Convert user => userData  userToUserData()

        const userData = { ID: 'someId', currentLevel: 1, Life: 3 ,levelScores: [3,3,1] };
        navigation.navigate('Stack2', { screen: 'Main', params: { userData } });


    };

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <Text style={{ color: '#fff' }}>Login</Text>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#fff"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={{ color: '#fff' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </LinearGradientBackground>
    );
};

export default LoginScreen;
