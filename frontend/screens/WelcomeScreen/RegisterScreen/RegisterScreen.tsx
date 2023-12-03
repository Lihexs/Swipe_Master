import React, { useState } from 'react';
import { View, Text, StatusBar, KeyboardAvoidingView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import LinearGradientBackground from '../../../views/Colors/BackgroundColorComponent';
import styles from './RegisterScreenView';
import User from '../../../models/User/User';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {createNewUser} from "../../../services/ApiClient";
import AuthInput from "../../../views/TextInput/AuthInput";
import AuthButton from "../../../views/Buttons/AuthButton";
import UserData from "../../../models/User/UserData";

type RegisterScreenProps = {
    navigation: NavigationProp<any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {

        // TODO: handleRegister if yes if no

        const user: User = { username, password };





        // TODO: Convert user => userData
        //  userToUserData() {
        //  1.Register
        //  2.Login => UserID
        //  3.UserData
        //  }

      //  console.log(createNewUser(user));

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
                />

                <AuthInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={{ marginTop: 30 }}>


                <AuthButton
                    text="Register"
                    textColor="#0039C0"
                    backgroundColor="#fff"
                    textSize={18}
                    onPress={handleRegister}
                />

                </View>

            </View>
        </LinearGradientBackground>
    );
};

export default RegisterScreen;
