import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes } from './global';

export default StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.large,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        padding: spacing.small,
        marginRight: spacing.small,
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primary,
    },
});