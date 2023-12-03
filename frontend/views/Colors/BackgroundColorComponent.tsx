import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native'; // Import the ViewStyle type from react-native

interface LinearGradientBackgroundProps {
    children: ReactNode;
    style?: ViewStyle; // Add a style prop with ViewStyle type
}

const LinearGradientBackground: React.FC<LinearGradientBackgroundProps> = ({ children }) => {
    return (
        <LinearGradient
            colors={['#6DE5B5', '#0039C0']}
            start={{ x: 1.2, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1 }} // Use an array to merge the styles
        >
            {children}
        </LinearGradient>
    );
};

export default LinearGradientBackground;
