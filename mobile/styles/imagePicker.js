import { StyleSheet } from 'react-native';
import { colors, spacing, shadows, borderRadius } from './global';

export default StyleSheet.create({
    container: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 250,
        marginBottom: spacing.xl,
        borderRadius: borderRadius.medium,
        overflow: 'hidden',
        backgroundColor: colors.backgroundLight,
        borderWidth: 1,
        borderColor: colors.border,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#999',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: spacing.xl,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.medium,
        borderRadius: borderRadius.medium,
        minWidth: '48%',
        alignItems: 'center',
        ...shadows.small,
    },
    analyzeButton: {
        backgroundColor: colors.secondary,
        width: '100%',
    },
    buttonText: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: 14,
    },
});