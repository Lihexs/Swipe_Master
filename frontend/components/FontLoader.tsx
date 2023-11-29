// FontLoader.js
import * as Font from 'expo-font';

export const loadSonsieOne = async () => {
    try {
        await Font.loadAsync({
            'SonsieOne': require('../assets/Fonts/SonsieOne-Regular.ttf'),
        });
    } catch (error) {
        console.error('Error loading font:', error);
    }
};

