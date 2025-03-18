import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { uploadImage } from '../utils/api';
import styles from '../styles/imagePicker';

export default function ImagePicker({ plantId, plantName, onUploadStart, onUploadComplete, onUploadError }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please grant camera roll permissions to use this feature');
            return;
        }

        let result = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Please grant camera permissions to use this feature');
            return;
        }

        let result = await ExpoImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            Alert.alert('No Image', 'Please select an image first');
            return;
        }

        if (!plantName) {
            Alert.alert('Error', 'Please select a plant type first');
            return;
        }

        try {
            onUploadStart && onUploadStart();

            const formData = new FormData();
            const filename = image.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image';

            formData.append('image', {
                uri: image,
                name: filename,
                type,
            });

            formData.append('plant_name', plantName);
            formData.append('plant_id', plantId);

            const response = await uploadImage(formData);

            onUploadComplete && onUploadComplete(response);
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Upload Failed', 'Failed to analyze image. Please try again.');
            onUploadError && onUploadError(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.placeholderText}>No image selected</Text>
                    </View>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Take a Photo</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <TouchableOpacity
                    style={[styles.button, styles.analyzeButton]}
                    onPress={handleUpload}
                >
                    <Text style={styles.buttonText}>Analyze {plantName} Plant</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}