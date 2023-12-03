import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import useFontLoader from "../../components/customHooks/useFontLoader";
import {loadSfPro} from "../FontLoader";

interface AuthButtonProps {
    text: string;
    textColor: string;
    backgroundColor?: string; // Make backgroundColor optional
    textSize: number;
    onPress: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
                                                   text,
                                                   textColor,
                                                   backgroundColor = 'transparent', // Set default value to transparent
                                                   textSize,
                                                   onPress,
                                               }) => {
    const fontLoaded = useFontLoader(loadSfPro);

    if (!fontLoaded) {
        return null;
    }
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor, fontSize: textSize }]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 331.53,
        height: 50.25,
        padding: 12.12,
        paddingHorizontal: 13.3,
        borderRadius: 67.18,
        borderWidth: 1.34,
        borderColor: '#FFFFFF',
        marginBottom: 10,
        gap: 3.36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.01,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'sf-pro-regular'
    } ,
});

export default AuthButton;
