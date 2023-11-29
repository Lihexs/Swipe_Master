import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native'; // Import the correct type for the navigation prop
import { loadSonsieOne } from '../../components/FontLoader';
import useFontLoader from "../../components/customHooks/useFontLoader";
import styles from './WelcomeScreenView';
import LinearGradientBackground from "../../assets/Colors/BackgroundColorComponent";

type WelcomeScreenProps = {
    navigation: NavigationProp<any>; // Replace 'any' with the correct type for your navigation prop
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {

    const fontLoaded = useFontLoader(loadSonsieOne);

    if (!fontLoaded) {
        return null;
    }

    return (
        <LinearGradientBackground>
            <View style={styles.container}>
                <Text style={[styles.swipeText, { fontFamily: 'SonsieOne' }]}>Swipe</Text>
                <Text style={[styles.masterText, { fontFamily: 'SonsieOne' }]}>Master</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#27ae60' }]}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </LinearGradientBackground>
    );
};

export default WelcomeScreen;
