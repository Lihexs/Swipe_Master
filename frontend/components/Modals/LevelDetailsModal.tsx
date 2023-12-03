import React, { forwardRef, useImperativeHandle, useState, useEffect, ReactNode } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import LinearGradientBackground from '../../views/Colors/BackgroundColorComponent';
import StarRating from "../../views/StarRating";

interface LevelDetailsModalProps {
    isVisible: boolean;
    levelNumber: number | null;
    closeModal: () => void;
    navigation: any; // Adjust the type as needed
}

export interface LevelDetailsModalHandle {
    open: () => void;
    close: () => void;
}
const handlePlayButtonPress = (props: LevelDetailsModalProps) => {
    // Assuming "TheGame" is the name of your screen in the navigation stack
    props.navigation.navigate('Trivia');
};

const LevelDetailsModal: React.ForwardRefRenderFunction<LevelDetailsModalHandle, LevelDetailsModalProps> = (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(props.isVisible);
    }, [props.isVisible]);

    useImperativeHandle(ref, () => ({
        open: () => setIsVisible(true),
        close: () => setIsVisible(false),
    }));

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={isVisible}
            onRequestClose={props.closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <LinearGradientBackground>
                        <View style={styles.innerContent}>

                            <Text style={styles.whiteText}>Unlock</Text>
                            <Text style={[styles.whiteText, styles.marginBottom10]}>Level {props.levelNumber}</Text>
                            <Text style={[styles.whiteText, styles.marginBottom10]}>Number of Questions: 10</Text>

                            <View style={styles.starsRectangle}>
                                <StarRating totalStars={10} filledStars={3} />
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    handlePlayButtonPress(props);
                                    props.closeModal();
                                }}
                                style={styles.playButton}
                            >
                                <Text style={styles.whiteText}>Play</Text>
                            </TouchableOpacity>

                            <MaterialIcons
                                name="close"
                                size={24}
                                color="white"
                                style={styles.closeButton}
                                onPress={props.closeModal}
                            />
                        </View>
                    </LinearGradientBackground>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 320,
        height: 320,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    innerContent: {
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    whiteText: {
        color: 'white',
    },
    marginBottom10: {
        marginBottom: 10,
    },
    starsRectangle: {
        width: '80%',
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.24)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    playButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default forwardRef(LevelDetailsModal);
