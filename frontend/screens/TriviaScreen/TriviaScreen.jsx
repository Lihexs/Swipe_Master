import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import LinearGradientBackground from "../../views/Colors/BackgroundColorComponent";

const Card = (props) => (
    <View style={styles.card}>
        <Text>{props.text}</Text>
    </View>
);
function StatusCard({ text }) {
    return (
        <View>
            <Text style={styles.cardsText}>{text}</Text>
        </View>
    );
}

const cards = [
    { text: 'Card 1' },
    { text: 'Card 2' },
    { text: 'Card 3' },
    // Add more cards as needed
];
function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
}
function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
}

const TriviaScreen = () => {
    return (
        <LinearGradientBackground>
    {cards ? (

        <SwipeCards
            cards={cards}
            renderCard={(cardData) => <Card {...cardData} />}
            keyExtractor={(cardData) => String(cardData.text)}

            renderNoMoreCards={() => <StatusCard text="No more cards..." />}


            actions={{
                nope: { onAction: handleNope },
                yup: { onAction: handleYup }
            }}

            yupText="True"
            nopeText="False"
            cardRemoved={() => console.log('Card removed')}
            useNativeDriver={true}
        />
    ) : (
        <StatusCard text="Loading..." />
    )}

        </LinearGradientBackground>
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
