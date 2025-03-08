// Чат, мені було б лінь заповнювати
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/aboutScreen';
import { commonStyles } from '../styles/global';

export default function AboutScreen() {
    return (
        <ScrollView style={commonStyles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>About Plant Doctor</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Our Mission</Text>
                    <Text style={styles.sectionText}>
                        Plant Doctor aims to help gardeners, farmers, and plant enthusiasts
                        quickly identify plant diseases using advanced artificial intelligence.
                        Early detection leads to faster treatment and healthier plants.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How It Works</Text>
                    <Text style={styles.sectionText}>
                        Our application uses a deep learning model trained on thousands of
                        plant disease images. The model can identify over 38 different types
                        of plant diseases with high accuracy, helping you take prompt action.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Technology</Text>
                    <Text style={styles.sectionText}>
                        We use a Convolutional Neural Network (CNN) built with TensorFlow
                        to analyze plant images. Our model is continuously improved to
                        ensure accurate disease detection and classification.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}