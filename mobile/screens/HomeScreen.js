import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImagePicker from '../components/ImagePicker';
import Loading from '../components/Loading';
import styles from '../styles/homeScreen';
import { commonStyles } from '../styles/global';

export default function HomeScreen({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const { plant } = route.params || {
        plant: {
            id: 'unknown',
            name: 'Unknown Plant',
            scientificName: 'Unknown Species'
        }
    };

    useEffect(() => {
        if (!route.params?.plant) {
            navigation.navigate('PlantSelection');
        }
    }, [route.params, navigation]);

    const handleResults = (results) => {
        navigation.navigate('Results', { results, plant });
    };

    return (
        <ScrollView style={commonStyles.container}>
            <View style={styles.selectedPlantContainer}>
                <Text style={styles.selectedPlantLabel}>Selected Plant:</Text>
                <View style={styles.selectedPlantDetails}>
                    {plant.image && (
                        <Image
                            source={plant.image}
                            style={styles.selectedPlantImage}
                            defaultSource={require('../assets/icon.png')}
                        />
                    )}
                    <View>
                        <Text style={styles.selectedPlantName}>{plant.name}</Text>
                        <Text style={styles.selectedPlantScientific}>{plant.scientificName}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.hero}>
                <Text style={styles.title}>Analyze Plant Disease</Text>
                <Text style={styles.subtitle}>
                    Take or upload a photo of your {plant.name.toLowerCase()} plant to identify diseases
                </Text>
            </View>

            <ImagePicker
                plantId={plant.id}
                plantName={plant.name}
                onUploadStart={() => setLoading(true)}
                onUploadComplete={(results) => {
                    setLoading(false);
                    handleResults(results);
                }}
                onUploadError={() => setLoading(false)}
            />

            {loading && <Loading />}

            <View style={styles.infoSection}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>📷</Text>
                    <Text style={styles.infoTitle}>Clear Photo</Text>
                    <Text style={styles.infoText}>Take a well-lit, close-up photo of the affected area</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>🔍</Text>
                    <Text style={styles.infoTitle}>AI Analysis</Text>
                    <Text style={styles.infoText}>Our system will analyze the image and identify potential diseases</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <Text style={styles.infoTitle}>Get Results</Text>
                    <Text style={styles.infoText}>Receive detailed information about detected plant diseases</Text>
                </View>
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}