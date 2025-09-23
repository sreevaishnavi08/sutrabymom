import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1',
    primaryContainer: '#e0e7ff',
    secondary: '#ec4899',
    secondaryContainer: '#fce7f3',
    tertiary: '#10b981',
    tertiaryContainer: '#d1fae5',
    surface: '#ffffff',
    surfaceVariant: '#f3f4f6',
    background: '#f9fafb',
    error: '#ef4444',
    errorContainer: '#fee2e2',
    onPrimary: '#ffffff',
    onSecondary: '#ffffff',
    onTertiary: '#ffffff',
    onSurface: '#111827',
    onSurfaceVariant: '#6b7280',
    onBackground: '#111827',
    outline: '#d1d5db',
    outlineVariant: '#e5e7eb',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818cf8',
    primaryContainer: '#4338ca',
    secondary: '#f472b6',
    secondaryContainer: '#be185d',
    tertiary: '#34d399',
    tertiaryContainer: '#047857',
    surface: '#1f2937',
    surfaceVariant: '#374151',
    background: '#111827',
    error: '#f87171',
    errorContainer: '#dc2626',
    onPrimary: '#1e1b4b',
    onSecondary: '#831843',
    onTertiary: '#064e3b',
    onSurface: '#f9fafb',
    onSurfaceVariant: '#d1d5db',
    onBackground: '#f9fafb',
    outline: '#6b7280',
    outlineVariant: '#4b5563',
  },
};

export const theme = lightTheme;