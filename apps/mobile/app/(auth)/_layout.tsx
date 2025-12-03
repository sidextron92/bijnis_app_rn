import { Stack } from 'expo-router';
import { useTheme } from 'design-system';

export default function AuthLayout() {
  const { theme } = useTheme();
  const colors = theme.colors;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
    </Stack>
  );
}
