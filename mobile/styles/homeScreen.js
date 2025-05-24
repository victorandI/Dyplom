import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, shadows, borderRadius } from './global';

export default StyleSheet.create({
    hero: {
        padding: spacing.xl,
        alignItems: 'center',
        marginTop: spacing.medium,
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
        color: colors.primaryDark,
        textAlign: 'center',
        marginBottom: spacing.medium,
    },
    subtitle: {
        fontSize: fontSizes.medium,
        color: colors.textLight,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    selectedPlantContainer: {
        backgroundColor: colors.backgroundLight,
        padding: spacing.large,
        margin: spacing.large,
        marginBottom: 0,
        borderRadius: borderRadius.medium,
        ...shadows.small,
    },
    selectedPlantLabel: {
        fontSize: fontSizes.medium,
        color: colors.textLight,
        marginBottom: spacing.medium,
    },
    selectedPlantDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedPlantImage: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.circle,
        marginRight: spacing.large,
        backgroundColor: colors.primaryLight,
    },
    selectedPlantName: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primaryDark,
    },
    selectedPlantScientific: {
        fontSize: fontSizes.small,
        fontStyle: 'italic',
        color: colors.textLight,
    },
    infoSection: {
        padding: spacing.xl,
    },
    infoCard: {
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.medium,
        padding: spacing.xl,
        marginBottom: spacing.large,
        ...shadows.small,
    },
    infoIcon: {
        fontSize: 32,
        marginBottom: spacing.medium,
        textAlign: 'center',
    },
    infoTitle: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.small,
        textAlign: 'center',
    },
    infoText: {
        fontSize: fontSizes.regular,
        color: colors.textLight,
        textAlign: 'center',
    },
});