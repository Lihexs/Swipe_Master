import React from 'react';
import { View, ViewStyle } from 'react-native';
import {SvgXml} from "react-native-svg";
import GoldStarSvg from "./imgSVG/GoldStarSvg";
import WhiteStarSvg from "./imgSVG/WhiteStarSvg";

interface StarRatingProps {
    totalStars: number;
    filledStars: number;
    starSize?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, filledStars,
                                                   starSize = 18   }) => {


    const filledStarsArray = Array.from({ length: filledStars }, (_, index) => (
        <SvgXml
            key={index}
            width={starSize}
            height={starSize}
            xml={GoldStarSvg}
        />
    ));

    const emptyStarsArray = Array.from({ length: totalStars - filledStars }, (_, index) => (
        <SvgXml
            key={index}
            width={starSize}
            height={starSize}
            xml={WhiteStarSvg}
        />
    ));

    return (
        <View style={{ flexDirection: 'row' ,marginTop: 3, alignItems: 'center' }}>
            {filledStarsArray.map((star, index) => (
                <View key={index} style={{ marginRight: 2 }}>{star}</View>
            ))}
            {emptyStarsArray.map((star, index) => (
                <View key={index} style={{ marginRight: 2 }}>{star}</View>
            ))}
        </View>
    );

};

export default StarRating;
