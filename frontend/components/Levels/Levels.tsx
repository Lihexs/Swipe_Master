import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Level from './Level';
import LevelDetailsModal from '../Modals/LevelDetailsModal';
import LevelsData from "../../models/User/LevelData";

interface LevelsProps {
    navigation: any;
    levelsData: LevelsData;
}

const Levels: React.FC<LevelsProps> = ({ navigation, levelsData }) => {
    const { current_level_index, levels_highscores } = levelsData;

    const openLevels = Array.from({ length: current_level_index }, (_, i) => i + 1);
    const buttonCount = 20;
    const scrollViewRef = useRef<ScrollView>(null);
    const modalRef = useRef<any>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, [scrollViewRef, buttonCount]);

    const handleLevelPress = (levelNumber: number) => {
        setSelectedLevel(levelNumber);
        modalRef.current?.open?.();
    };

    const closeModal = () => {
        setSelectedLevel(null);
        modalRef.current?.close?.();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' , marginTop:30}}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 0.5, justifyContent: 'flex-end', alignItems: 'center' }}
                style={{ flex: 0.8, width: '30%' }}
                onContentSizeChange={() => {
                    scrollViewRef.current?.scrollToEnd({ animated: false });
                }}
            >
                {[...Array(buttonCount).reverse()].map((_, index) => (
                    <Level
                        key={index + 1}
                        levelNumber={buttonCount - index}
                        isOpen={openLevels.includes(buttonCount - index)}
                        onPress={handleLevelPress}
                        filledStars={levels_highscores[index]} // Pass the correct value for each level
                    />
                ))}
            </ScrollView>

            <LevelDetailsModal
                ref={modalRef}
                isVisible={selectedLevel !== null}
                levelNumber={selectedLevel}
                closeModal={closeModal}
                navigation={navigation}
            />
        </View>
    );
};

export default Levels;

