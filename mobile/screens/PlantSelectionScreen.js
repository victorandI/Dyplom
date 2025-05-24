import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/plantSelectionScreen';
import { commonStyles } from '../styles/global';

const PLANTS = [
    {
        id: 'apple',
        name: 'Apple',
        scientificName: 'Malus domestica',
        image: require('../assets/icon.png')
    },
    {
        id: 'blueberry',
        name: 'Blueberry',
        scientificName: 'Vaccinium corymbosum',
        image: require('../assets/icon.png')
    },
    {
        id: 'cherry',
        name: 'Cherry',
        scientificName: 'Prunus avium',
        image: require('../assets/icon.png')
    },
    {
        id: 'corn',
        name: 'Corn (Maize)',
        scientificName: 'Zea mays',
        image: require('../assets/icon.png')
    },
    {
        id: 'grape',
        name: 'Grape',
        scientificName: 'Vitis vinifera',
        image: require('../assets/icon.png')
    },
    {
        id: 'orange',
        name: 'Orange',
        scientificName: 'Citrus sinensis',
        image: require('../assets/icon.png')
    },
    {
        id: 'peach',
        name: 'Peach',
        scientificName: 'Prunus persica',
        image: require('../assets/icon.png')
    },
    {
        id: 'pepper',
        name: 'Bell Pepper',
        scientificName: 'Capsicum annuum',
        image: require('../assets/icon.png')
    },
    {
        id: 'potato',
        name: 'Potato',
        scientificName: 'Solanum tuberosum',
        image: require('../assets/icon.png')
    },
    {
        id: 'raspberry',
        name: 'Raspberry',
        scientificName: 'Rubus idaeus',
        image: require('../assets/icon.png')
    },
    {
        id: 'soybean',
        name: 'Soybean',
        scientificName: 'Glycine max',
        image: require('../assets/icon.png')
    },
    {
        id: 'squash',
        name: 'Squash',
        scientificName: 'Cucurbita species',
        image: require('../assets/icon.png')
    },
    {
        id: 'strawberry',
        name: 'Strawberry',
        scientificName: 'Fragaria × ananassa',
        image: require('../assets/icon.png')
    },
    {
        id: 'tomato',
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        image: require('../assets/icon.png')
    }
];

export default function PlantSelectionScreen({ navigation }) {
    const renderPlantItem = ({ item }) => (
        <TouchableOpacity
            style={styles.plantCard}
            onPress={() => navigation.navigate('HomeScreen', { plant: item })}
        >
            <Image
                source={item.image}
                style={styles.plantImage}
            />
            <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{item.name}</Text>
                <Text style={styles.scientificName}>{item.scientificName}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Select a Plant</Text>
                <Text style={styles.subtitle}>Choose the plant you want to analyze</Text>
            </View>

            <FlatList
                data={PLANTS}
                renderItem={renderPlantItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}