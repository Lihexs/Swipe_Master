import React from 'react';
import { View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface StarRatingProps {
    totalStars: number;
    filledStars: number;
    starSize?: number; // Optional prop for star size
    starColor?: string; // Optional prop for star color
    style?: ViewStyle; // Optional style prop for the container view
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, filledStars,
                                                   starSize = 18, starColor = 'white',
                                                   style }) => {

    const filledStarsArray = Array.from({ length: filledStars }, (_, index) => (
        <MaterialIcons key={index} name="star" size={starSize} color={starColor} />
    ));

    const emptyStarsArray = Array.from({ length: totalStars - filledStars }, (_, index) => (
        <MaterialIcons key={index} name="star-border" size={starSize} color={starColor} />
    ));

    return (
        <View style={[{ flexDirection: 'row' }, style]}>
            {filledStarsArray}
            {emptyStarsArray}
        </View>
    );
};

export default StarRating;
