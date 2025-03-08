import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    resultsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    plantInfoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    plantName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    plantConfidence: {
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    diseaseCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    diseaseName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    diseaseSymptoms: {
        color: '#666',
    },
    diseaseConfidence: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    analysisImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20
    },
    plantFamily: {
        color: '#666',
        marginVertical: 5
    }
});