import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './WelcomeScreenView';
import LinearGradientBackground from '../../views/Colors/BackgroundColorComponent';
import AuthButton from '../../views/Buttons/AuthButton'; // Import the AuthButton component

type WelcomeScreenProps = {
    navigation: NavigationProp<any>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

    return (
        <LinearGradientBackground>

            <View style={styles.container}>

                <Image source={require('../../assets/Logo.png')} style={styles.logo} />

                <Text style={styles.descriptionText}>
                    By tapping Create Account or Sign In, you agree to our Terms.
                    Learn how we process your data in our Privacy Policy and Cookies Policy.
                </Text>

                <AuthButton
                    text="Login"
                    textColor="#FFFFFF"
                    textSize={18}
                    onPress={() => navigation.navigate('Login')}
                />

                <AuthButton
                    text="Register"
                    textColor="#FFFFFF"
                    textSize={18}
                    onPress={() => navigation.navigate('Register')}
                />

            </View>
        </LinearGradientBackground>
    );
};

export default WelcomeScreen;
