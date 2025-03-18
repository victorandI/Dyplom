import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, borderRadius, shadows } from './global';

export default StyleSheet.create({
    header: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.small,
    },
    subtitle: {
        fontSize: fontSizes.medium,
        color: colors.textLight,
        textAlign: 'center',
    },
    listContainer: {
        padding: spacing.large,
        paddingBottom: spacing.xxl,
    },
    plantCard: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.medium,
        padding: spacing.medium,
        marginBottom: spacing.large,
        alignItems: 'center',
        ...shadows.small,
    },
    plantImage: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.medium,
        marginRight: spacing.medium,
    },
    plantInfo: {
        flex: 1,
    },
    plantName: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.xs,
    },
    scientificName: {
        fontSize: fontSizes.small,
        fontStyle: 'italic',
        color: colors.textLight,
    },
});