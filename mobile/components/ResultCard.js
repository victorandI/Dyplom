import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/resultCard';

export default function ResultCard({ result }) {
    const { disease, probability } = result;
    const percentage = (probability * 100).toFixed(2);

    const parts = disease.replace(/_/g, ' ').split(' ');
    const plantName = parts.slice(0, 2).join(' ');
    const condition = parts.slice(2).join(' ');

    const getColor = () => {
        if (percentage >= 80) return '#4CAF50';
        if (percentage >= 50) return '#FFC107';
        return '#FF5722';
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.plant}>{plantName}</Text>
                <View style={[styles.badge, { backgroundColor: getColor() }]}>
                    <Text style={styles.probability}>{percentage}%</Text>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.condition}>{condition || 'Healthy'}</Text>
            </View>
        </View>
    );
}