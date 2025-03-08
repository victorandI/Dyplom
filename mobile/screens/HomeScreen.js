import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImagePicker from '../components/ImagePicker';
import Loading from '../components/Loading';
import styles from '../styles/homeScreen';
import { commonStyles } from '../styles/global';

export default function HomeScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const handleResults = (results) => {
        navigation.navigate('Results', { results });
    };

    return (
        <ScrollView style={commonStyles.container}>
            <View style={styles.hero}>
                <Text style={styles.title}>Identify Plant Diseases Instantly</Text>
                <Text style={styles.subtitle}>
                    Upload a photo of your plant and get immediate diagnosis
                </Text>
            </View>

            <ImagePicker
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
                    <Text style={styles.infoTitle}>Take a Photo</Text>
                    <Text style={styles.infoText}>Capture a clear image of the plant's affected area</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>🔍</Text>
                    <Text style={styles.infoTitle}>Get Analysis</Text>
                    <Text style={styles.infoText}>Our AI identifies the disease and provides a diagnosis</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoIcon}>💡</Text>
                    <Text style={styles.infoTitle}>Take Action</Text>
                    <Text style={styles.infoText}>Receive care recommendations for your plant</Text>
                </View>
            </View>

            <StatusBar style="auto" />
        </ScrollView>
    );
}