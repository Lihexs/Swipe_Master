import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import lockSvg from './imgSVG/lockSvg';

interface LevelProps {
    levelNumber: number;
    isOpen: boolean;
    onPress: (levelNumber: number) => void;
}

const Level: React.FC<LevelProps> = ({ levelNumber, isOpen, onPress }) => (
    <TouchableOpacity
        style={styles.circleButton}
        onPress={() => onPress(levelNumber)}
    >
        {isOpen ? (
            <View style={styles.textContainer}>
                <Text style={styles.text}>Level</Text>
                <Text style={[styles.text, styles.boldText]}>{levelNumber}</Text>
            </View>
        ) : (
            <SvgXml
                xml={lockSvg}
                width={30}
                height={30}
            />
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    circleButton: {
        width: 55,
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 45,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    textContainer: {
        alignItems: 'center',
    },
    text: {
        color: '#111c3b',
    } as TextStyle,
    boldText: {
        fontWeight: 'bold',
    } as TextStyle,
});

export default Level;
