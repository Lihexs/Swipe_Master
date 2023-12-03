//ProfileScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the user icon

interface UserProfileProps {

}

const ProfileScreen: React.FC<UserProfileProps> = () => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <Text>10</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Stats</Text>
                <Text>10</Text>
            </View>
            <View style={styles.iconContainer}>
                <Ionicons name="person-circle-outline" size={80} color="blue" />
                <Text style={styles.username}>10</Text>
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
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    iconContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    username: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default ProfileScreen;
