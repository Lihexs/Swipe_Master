import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradientBackground from "../../../assets/Colors/BackgroundColorComponent";
import styles from './RegisterScreenView';
import User from "../../../models/User";

type RegisterScreenProps = {
    navigation: NavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        const user: User = {  username,password };

        // TODO: Convert user => userData  userToUserData()

        const userData = { ID: 'someId', currentLevel: 1, Life: 3 ,levelScores: [3,3,1] };
        navigation.navigate('Stack2', { screen: 'Main', params: { userData } });
    };

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <Text style={{ color: '#fff' }}>Register</Text>
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
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                >
                    <Text style={{ color: '#fff' }}>Register</Text>
                </TouchableOpacity>
            </View>
        </LinearGradientBackground>
    );
};

export default RegisterScreen;
