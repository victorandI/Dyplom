import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, borderRadius } from './global';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    resultsContainer: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.large,
        textAlign: 'center',
    },
    plantInfoSection: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
        width: '100%',
        paddingBottom: spacing.large,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    plantName: {
        fontSize: fontSizes.xlarge,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.xs,
    },
    scientificName: {
        fontSize: fontSizes.medium,
        fontStyle: 'italic',
        color: colors.textLight,
        marginBottom: spacing.medium,
    },
    confidenceText: {
        fontSize: fontSizes.small,
        color: colors.textLight,
    },
    diseasesSection: {
        width: '100%',
        marginBottom: spacing.xl,
    },
    healthyPlantSection: {
        width: '100%',
        backgroundColor: colors.primaryLight,
        borderRadius: borderRadius.medium,
        padding: spacing.large,
        marginBottom: spacing.xl,
        alignItems: 'center',
    },
    healthyText: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.success,
        marginBottom: spacing.medium,
    },
    healthyDescription: {
        fontSize: fontSizes.medium,
        color: colors.textMedium,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.medium,
    },
    alternativesSection: {
        width: '100%',
        marginBottom: spacing.xl,
    },
    alternativesDescription: {
        fontSize: fontSizes.medium,
        color: colors.textLight,
        marginBottom: spacing.medium,
    },
    technicalInfo: {
        width: '100%',
        alignItems: 'center',
        marginBottom: spacing.large,
    },
    processingTime: {
        fontSize: fontSizes.small,
        color: colors.textLight,
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.medium,
        marginTop: spacing.large,
        marginBottom: spacing.xl,
    },
    buttonText: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: fontSizes.medium,
    },
});