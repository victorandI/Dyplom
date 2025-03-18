import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/alternativeDiseaseCard';
import { colors } from '../styles/global';

export default function AlternativeDiseaseCard({ disease }) {
    const { name, confidence } = disease;
    const percentage = confidence.toFixed(1);

    // Determine color based on confidence level
    const getColor = () => {
        if (percentage >= 30) return colors.warning;
        return colors.textLight;
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.diseaseName}>{name}</Text>
                <View style={[styles.badge, { backgroundColor: getColor() }]}>
                    <Text style={styles.confidence}>{percentage}%</Text>
                </View>
            </View>
        </View>
    );
}