import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, borderRadius, shadows } from './global';

export default StyleSheet.create({
    card: {
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.medium,
        padding: spacing.medium,
        marginVertical: spacing.small,
        width: '100%',
        opacity: 0.85,
        ...shadows.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    diseaseName: {
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
        color: colors.textMedium,
    },
    badge: {
        paddingVertical: 2,
        paddingHorizontal: spacing.small,
        borderRadius: borderRadius.circle,
    },
    confidence: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: fontSizes.small,
    },
});