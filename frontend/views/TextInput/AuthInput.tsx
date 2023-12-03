import React from 'react';
import { TextInput, StyleSheet, TextStyle, TextInputProps } from 'react-native';
import useFontLoader from "../../components/customHooks/useFontLoader";
import {loadSfPro} from "../FontLoader";

interface AuthInputProps extends TextInputProps {}

const AuthInput: React.FC<AuthInputProps> = (props) => {
    const fontLoaded = useFontLoader(loadSfPro);

    if (!fontLoaded) {
        return null;
    }
    return (
        <TextInput
            style={[styles.input, props.style]} // Combine the styles from AuthInput and any additional styles passed through props
            placeholderTextColor="#fff"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: 331.53,
        height: 50.25,
        padding: 12.12,
        paddingHorizontal: 13.3,
        borderRadius: 67.18,
        borderWidth: 1.34,
        borderColor: '#FFFFFF',
        marginBottom: 13,
        gap: 3.36,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.01,
        fontFamily: 'sf-pro-regular',
    },
});

export default AuthInput;
