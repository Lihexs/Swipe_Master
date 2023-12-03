// LeaderboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardScreen: React.FC = () => {
    // Replace the following with your leaderboard data fetching logic
    const leaderboardData = [
        { rank: 1, username: 'User1', score: 100 },
        { rank: 2, username: 'User2', score: 90 },
        { rank: 3, username: 'User3', score: 80 },
        // Add more data as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Leaderboard</Text>
            <View style={styles.leaderboard}>
                {leaderboardData.map((user, index) => (
                    <View key={index} style={styles.leaderboardItem}>
                        <Text style={styles.rank}>{user.rank}</Text>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.score}>{user.score} points</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    leaderboard: {
        width: '80%',
    },
    leaderboardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    rank: {
        fontWeight: 'bold',
    },
    username: {
        flex: 1,
        marginLeft: 10,
    },
    score: {
        fontWeight: 'bold',
    },
});

export default LeaderboardScreen;
