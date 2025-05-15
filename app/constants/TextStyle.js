// TextStyles.js
import {StyleSheet} from 'react-native';
import Colors from "./Colors";

export const TextStyles = StyleSheet.create({
    displayLarge: {
        fontFamily: 'Inter_400Regular',
        fontSize: 57,
        lineHeight: 64,
        letterSpacing: -0.25,
        color: Colors.onBackground
    },
    displayMedium: {
        fontFamily: 'Inter_400Regular',
        fontSize: 45,
        lineHeight: 52,
        color: Colors.onBackground
    },
    displaySmall: {
        fontFamily: 'Inter_400Regular',
        fontSize: 36,
        lineHeight: 44,
        color: Colors.onBackground
    },

    headlineLarge: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 32,
        lineHeight: 40,
        color: Colors.onBackground
    },
    headlineMedium: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 28,
        lineHeight: 36,
        color: Colors.onBackground
    },
    headlineSmall: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 24,
        lineHeight: 32,
        color: Colors.onBackground
    },

    titleLarge: {
        fontFamily: 'Inter_500Medium',
        fontSize: 22,
        lineHeight: 28,
        color: Colors.onBackground
    },
    titleMedium: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.15,
        color: Colors.onBackground
    },
    titleSmall: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
        color: Colors.onBackground
    },

    bodyLarge: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        color: Colors.onBackground
    },
    bodyMedium: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
        color: Colors.onBackground
    },
    bodySmall: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.4,
        color: Colors.onBackground
    },

    labelLarge: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
        color: Colors.onBackground
    },
    labelMedium: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        color: Colors.onBackground
    },
    labelSmall: {
        fontFamily: 'Inter_500Medium',
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0.5,
        color: Colors.onBackground
    },

    thin: {fontFamily: 'Inter_100Thin'},
    extraLight: {fontFamily: 'Inter_200ExtraLight'},
    light: {fontFamily: 'Inter_300Light'},
    regular: {fontFamily: 'Inter_400Regular'},
    medium: {fontFamily: 'Inter_500Medium'},
    semiBold: {fontFamily: 'Inter_600SemiBold'},
    bold: {fontFamily: 'Inter_700Bold'},
    extraBold: {fontFamily: 'Inter_800ExtraBold'},
    black: {fontFamily: 'Inter_900Black'},
});

export default TextStyles