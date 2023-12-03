import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import lockSvg from '../../views/imgSVG/lockSvg';
import StarRating from "../../views/StarRating";

interface LevelProps {
    levelNumber: number;
    isOpen: boolean;
    onPress: (levelNumber: number) => void;
    filledStars : number;
}

const Level: React.FC<LevelProps> = ({ levelNumber, isOpen, onPress, filledStars = 1 }) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={isOpen ? styles.openCircleButton : styles.closedCircleButton}
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

        <View style={styles.starRatingContainer}>
            <StarRating totalStars={3} filledStars={filledStars} starSize={15} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    openCircleButton: {
        width: 55,
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    closedCircleButton: {
        width: 55,
        height: 55,
        backgroundColor: '#f0f0f0',
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        color: '#111c3b',
    },
    boldText: {
        fontWeight: 'bold',
    },
    starRatingContainer: {
        alignItems: 'center'
    },
});

export default Level;
