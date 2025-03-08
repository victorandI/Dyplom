import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/header';

export default function Header({ title, onBackPress }) {
    return (
        <View style={styles.header}>
            {onBackPress && (
                <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}