import { StyleSheet } from 'react-native';

// Кольори
export const colors = {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    primaryLight: '#C8E6C9',
    secondary: '#2196F3',
    textDark: '#333333',
    textMedium: '#555555',
    textLight: '#666666',
    background: '#ffffff',
    backgroundLight: '#f5f5f5',
    border: '#e0e0e0',
    error: '#f44336',
    success: '#4caf50',
    warning: '#FFC107',
    danger: '#FF5722',
};

// Розміри тексту
export const fontSizes = {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    xlarge: 22,
    xxlarge: 24,
};

// Відступи
export const spacing = {
    xs: 4,
    small: 8,
    medium: 12,
    large: 16,
    xl: 20,
    xxl: 30,
};

// Радіуси кутів
export const borderRadius = {
    small: 4,
    medium: 8,
    large: 12,
    circle: 999,
};

// Тіні
export const shadows = {
    small: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
};

// Спільні стилі, які використовуються в різних компонентах
export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    screenPadding: {
        padding: spacing.xl,
    },
    card: {
        backgroundColor: colors.backgroundLight,
        borderRadius: borderRadius.medium,
        padding: spacing.large,
        marginVertical: spacing.medium,
        ...shadows.small,
    },
    title: {
        fontSize: fontSizes.xlarge,
        fontWeight: 'bold',
        color: colors.primaryDark,
        marginBottom: spacing.large,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSizes.medium,
        color: colors.textLight,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.medium,
        paddingHorizontal: spacing.large,
        borderRadius: borderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.background,
        fontWeight: 'bold',
        fontSize: fontSizes.medium,
    },
    sectionTitle: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.medium,
    },
    boxShadow: shadows.small,
});