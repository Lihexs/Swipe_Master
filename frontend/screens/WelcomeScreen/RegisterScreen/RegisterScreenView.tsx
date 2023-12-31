// RegisterScreenView.jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 8,
    },
    registerButton: {
        marginTop: 20,
        backgroundColor: '#3498db',  // Set button background color
        padding: 10,
        borderRadius: 5,
    },
});

export default styles;
