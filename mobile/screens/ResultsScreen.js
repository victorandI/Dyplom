import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ResultCard from '../components/ResultCard';
import AlternativeDiseaseCard from '../components/AlternativeDiseaseCard';
import styles from '../styles/resultScreen';
import { commonStyles } from '../styles/global';

export default function ResultsScreen({ route, navigation }) {
    const { results, plant } = route.params || {
        results: {
            diseases: [],
            alternative_diseases: [],
            plant: {
                common_name: "Unknown",
                scientific_name: "Unknown"
            },
            overall_analysis_confidence: 0
        },
        plant: {
            name: "Unknown Plant"
        }
    };

    const identifiedPlant = results.plant || {
        common_name: plant?.name || "Unknown",
        scientific_name: plant?.scientificName || "Unknown",
        identification_confidence: results.overall_analysis_confidence || 0
    };

    const mainDiseases = results.diseases || [];

    const alternativeDiseases = results.alternative_diseases || [];

    const processingTime = results.processing_time_ms || 0;

    return (
        <ScrollView style={commonStyles.container}>
            <View style={styles.resultsContainer}>
                <Text style={styles.title}>Analysis Results</Text>

                {/* Plant Information Section */}
                <View style={styles.plantInfoSection}>
                    <Text style={styles.plantName}>{identifiedPlant.common_name}</Text>
                    <Text style={styles.scientificName}>{identifiedPlant.scientific_name}</Text>
                    {identifiedPlant.identification_confidence > 0 && (
                        <Text style={styles.confidenceText}>
                            Identification confidence: {identifiedPlant.identification_confidence.toFixed(1)}%
                        </Text>
                    )}
                </View>

                {/* Main Diseases Section */}
                {mainDiseases.length > 0 ? (
                    <View style={styles.diseasesSection}>
                        <Text style={styles.sectionTitle}>Detected Diseases</Text>
                        {mainDiseases.map((disease, index) => (
                            <ResultCard key={index} disease={disease} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.healthyPlantSection}>
                        <Text style={styles.healthyText}>No diseases detected</Text>
                        <Text style={styles.healthyDescription}>
                            Your {identifiedPlant.common_name.toLowerCase()} plant appears to be healthy!
                        </Text>
                    </View>
                )}

                {/* Alternative Diseases Section */}
                {alternativeDiseases.length > 0 && (
                    <View style={styles.alternativesSection}>
                        <Text style={styles.sectionTitle}>Other Possibilities</Text>
                        <Text style={styles.alternativesDescription}>
                            These conditions have lower confidence but might be worth investigating:
                        </Text>
                        {alternativeDiseases.map((disease, index) => (
                            <AlternativeDiseaseCard key={index} disease={disease} />
                        ))}
                    </View>
                )}

                {/* Technical Info */}
                <View style={styles.technicalInfo}>
                    <Text style={styles.processingTime}>
                        Processing time: {processingTime}ms
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PlantSelection')}
                >
                    <Text style={styles.buttonText}>Analyze Another Plant</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}