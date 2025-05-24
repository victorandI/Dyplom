import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/resultCard';
import { colors } from '../styles/global';

export default function ResultCard({ disease }) {
    const { name, confidence, symptoms } = disease;
    const percentage = confidence.toFixed(1);

    const getColor = () => {
        if (percentage >= 80) return colors.success;  // High confidence
        if (percentage >= 50) return colors.warning;  // Medium confidence
        return colors.danger;  // Low confidence
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.diseaseName}>{name}</Text>
                <View style={[styles.badge, { backgroundColor: getColor() }]}>
                    <Text style={styles.confidence}>{percentage}%</Text>
                </View>
            </View>

            {symptoms && (
                <View style={styles.body}>
                    <Text style={styles.symptomTitle}>Symptoms:</Text>
                    <Text style={styles.symptomText}>{symptoms}</Text>
                </View>
            )}
        </View>
    );
}