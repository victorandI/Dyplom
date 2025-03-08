import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './global';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.xl,
    },
    title: {
        fontSize: fontSizes.xxlarge,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    section: {
        marginBottom: spacing.xxl,
    },
    sectionTitle: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.medium,
    },
    sectionText: {
        fontSize: fontSizes.medium,
        lineHeight: 24,
        color: colors.textLight,
    },
});