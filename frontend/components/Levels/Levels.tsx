import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import Level from './Level';
import LevelDetailsModal from '../Modals/LevelDetailsModal';
import UserData from '../../models/UserData'; // Import the UserData type

interface LevelsProps {
    navigation: any; // Update the type as needed
    userData: UserData; // Assuming UserData is a type you've defined
}

const Levels: React.FC<LevelsProps> = ({ navigation, userData }) => {
    const { currentLevel } = userData;

    const openLevels = Array.from({ length: currentLevel }, (_, i) => i + 1);
    const buttonCount = 20;
    const scrollViewRef = useRef<ScrollView>(null);

    const modalRef = useRef<any>(null); // Update the type as needed

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
        <View style={{ flex: 0.9, justifyContent: 'flex-end', alignItems: 'center' }}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                style={{ flex: 0.9, width: '100%' }}
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
