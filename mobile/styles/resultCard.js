import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, borderRadius, shadows } from './global';

export default StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.medium,
        padding: spacing.large,
        marginVertical: spacing.small,
        width: '100%',
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.medium,
        paddingBottom: spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    plant: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.textDark,
        textTransform: 'capitalize',
    },
    badge: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.small,
        borderRadius: borderRadius.circle,
    },
    probability: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: fontSizes.small,
    },
    body: {
        paddingTop: spacing.xs,
    },
    condition: {
        fontSize: fontSizes.medium,
        color: colors.textMedium,
        textTransform: 'capitalize',
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