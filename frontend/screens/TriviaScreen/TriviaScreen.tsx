import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

const Card = (props) => (
    <View style={styles.card}>
        <Text>{props.text}</Text>
    </View>
);

const cards = [
    { text: 'Card 1' },
    { text: 'Card 2' },
    { text: 'Card 3' },
    // Add more cards as needed
];

const TriviaScreen = () => {
    return (
        <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card {...cardData} />}
            renderNoMoreCards={() => <Text>No more cards</Text>}
            handleYup={() => console.log('Yup')}
            handleNope={() => console.log('Nope')}
            yupText="Like"
            nopeText="Nope"
            cardRemoved={() => console.log('Card removed')}
            useNativeDriver={true} // Specify useNativeDriver
        />
    );
};

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
    },
});

export default TriviaScreen;
