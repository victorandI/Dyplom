import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from '../styles/loading';
import { colors } from '../styles/global';

export default function Loading({ message = 'Analyzing image...' }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}