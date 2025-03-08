import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/resultScreen';
import { commonStyles } from '../styles/global';

export default function ResultsScreen({ route, navigation }) {
    const { results, imageUri } = route.params || { results: {}, imageUri: null };

    return (
        <ScrollView style={commonStyles.container}>
            <View style={styles.resultsContainer}>
                {/* Показуємо фото першим */}
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.analysisImage}
                        resizeMode="cover"
                    />
                )}

                <Text style={styles.title}>Plant Analysis</Text>

                {/* Інформація про рослину з повною назвою */}
                <View style={styles.plantInfoContainer}>
                    <Text style={styles.plantName}>
                        {results.plant.common_name}
                        {' '}
                        ({results.plant.scientific_name})
                    </Text>
                    <Text style={styles.plantFamily}>
                        Family: {results.plant.family}
                    </Text>
                    <Text style={styles.plantConfidence}>
                        Identification Confidence: {results.plant.identification_confidence}%
                    </Text>
                </View>

                {/* Захворювання */}
                <Text style={styles.sectionTitle}>Possible Diseases</Text>
                {results.diseases.map((disease, index) => (
                    <View key={index} style={styles.diseaseCard}>
                        <Text style={styles.diseaseName}>{disease.name}</Text>
                        <Text style={styles.diseaseSymptoms}>
                            Symptoms: {disease.symptoms}
                        </Text>
                        <Text style={styles.diseaseConfidence}>
                            Confidence: {disease.confidence}%
                        </Text>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Text style={styles.buttonText}>Analyze Another Image</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}