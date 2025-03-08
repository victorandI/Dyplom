import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './global';

export default StyleSheet.create({
    container: {
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: spacing.medium,
        fontSize: fontSizes.medium,
        color: colors.textMedium,
    },
});